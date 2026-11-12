const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { Script, createContext } = require("node:vm");
const test = require("node:test");

function load(path) {
  const sandbox = { console, Number, String, Math, Set, Date, Object, Array, JSON };
  sandbox.globalThis = sandbox;
  sandbox.window = sandbox;
  createContext(sandbox);
  new Script(readFileSync(path, "utf8"), { filename: path }).runInContext(sandbox);
  return sandbox;
}

const activity = load("activity.js");
const food = load("food.js");

test("step goal bands", () => {
  assert.equal(activity.BoetsActivity.goalStatus(9999).state, "below");
  assert.equal(activity.BoetsActivity.goalStatus(10000).state, "met");
  assert.equal(activity.BoetsActivity.goalStatus(14999).state, "met");
  assert.equal(activity.BoetsActivity.goalStatus(15000).state, "top");
});

test("workout day matching", () => {
  const { matchingAction } = activity.BoetsActivity;
  const strength = [{ type: "strength", durationMin: 40 }];
  const shortLift = [{ type: "weightlifting", durationMin: 10 }];
  const walk = [{ type: "walking", durationMin: 50 }];
  const tennis = [{ type: "tennis", durationMin: 45 }];
  const yoga = [{ type: "yoga", durationMin: 12 }];

  assert.equal(matchingAction("gym", strength, 2000).markWorkout, true);
  assert.equal(matchingAction("gym", strength, 2000).reason, "strength");
  assert.equal(matchingAction("office", strength, 0).markWorkout, true);
  assert.equal(matchingAction("gym", shortLift, 12000).markWorkout, false);
  assert.equal(matchingAction("gym", walk, 12000).markWorkout, false);
  assert.equal(matchingAction("tennis", tennis, 0).reason, "tennis");
  assert.equal(matchingAction("tennis", [{ type: "strength", durationMin: 20 }], 0).markWorkout, true);
  assert.equal(matchingAction("tennis", walk, 0).markWorkout, false);
  assert.equal(matchingAction("rest", [], 10000).onlyIds.join(","), "walk");
  assert.equal(matchingAction("rest", [], 9999).markWorkout, false);
  assert.equal(matchingAction("gym", yoga, 0).markZaryadka, true);
  assert.equal(matchingAction("gym", [{ type: "stretching", durationMin: 5 }], 0).markZaryadka, false);
  assert.equal(activity.BoetsActivity.exerciseLabel("strength"), "Силовая тренировка");
});

test("menu ranges and weekday index", () => {
  const { parseRange, rangeStatus, menuIndexFromDate, shopKey } = food.BoetsFood;
  const kcal = parseRange("2000–2200");
  assert.equal(kcal.low, 2000);
  assert.equal(kcal.high, 2200);
  const protein = parseRange("160–180 каждый день");
  assert.equal(protein.low, 160);
  assert.equal(protein.high, 180);
  assert.equal(rangeStatus(2034, { low: 2000, high: 2200 }), "in");
  assert.equal(rangeStatus(1790, { low: 1800, high: 2000 }), "under");
  assert.equal(rangeStatus(70.4, { low: 50, high: 70 }), "over");
  assert.equal(menuIndexFromDate(new Date(2026, 10, 12)), 3);
  assert.equal(menuIndexFromDate(new Date(2026, 10, 15)), 6);
  assert.equal(shopKey("Молочные продукты", "творог 5%"), "Молочные продукты\nтворог 5%");
});

test("weekly json stays wired together", () => {
  const recipes = JSON.parse(readFileSync("data/recipes.json", "utf8"));
  const menu = JSON.parse(readFileSync("data/menu-week.json", "utf8"));
  const shopping = JSON.parse(readFileSync("data/shopping-week.json", "utf8"));
  assert.equal(recipes.length, 12);
  assert.equal(menu.days.length, 7);
  assert.ok(shopping.sections.length >= 5);
  const ids = new Set(recipes.map((recipe) => recipe.id));
  recipes.forEach((recipe) => {
    assert.match(recipe.source_url, /^https:\/\/www\.instagram\.com\/reel\//);
    assert.ok(recipe.steps.length > 0);
    assert.ok(recipe.ingredients.length > 0);
  });
  const gymDays = new Set(["понедельник", "среда", "пятница"]);
  menu.days.forEach((day) => {
    const expected = gymDays.has(day.day) ? "2000–2200" : "1800–2000";
    assert.equal(day.target_kcal, expected, day.day);
    assert.equal(day.target_kcal.includes("3800"), false);
    assert.match(day.target_kcal, /^\d+–\d+$/);
    const sum = day.meals.reduce((acc, meal) => ({
      kcal: acc.kcal + meal.kcal,
      protein: acc.protein + meal.protein,
      fat: acc.fat + meal.fat,
      carbs: acc.carbs + meal.carbs
    }), { kcal: 0, protein: 0, fat: 0, carbs: 0 });
    assert.ok(Math.abs(sum.kcal - day.totals.kcal) < 1.01, day.day + " kcal");
    assert.ok(Math.abs(sum.protein - day.totals.protein) < 0.2, day.day + " protein");
    assert.ok(Math.abs(sum.fat - day.totals.fat) < 0.2, day.day + " fat");
    assert.ok(Math.abs(sum.carbs - day.totals.carbs) < 0.2, day.day + " carbs");
    day.meals.forEach((meal) => {
      if (meal.recipe_id) assert.ok(ids.has(meal.recipe_id), meal.recipe_id);
    });
  });
  const app = readFileSync("app.js", "utf8");
  const css = readFileSync("styles.css", "utf8");
  assert.equal(app.includes("/ ${escapeHtml(day.target_kcal)}"), false);
  assert.match(app, /цель \$\{escapeHtml\(day\.target_kcal\)\}/);
  assert.deepEqual([...app.matchAll(/hero: "([^"]+)"/g)].map((match) => match[1]), [
    "img/days/day-press-shoulders.webp",
    "img/days/day-pullups.webp",
    "img/days/day-home-mobility.webp",
    "img/days/day-tennis.webp",
    "img/days/day-shoulders-legs.webp",
    "img/days/day-pullups.webp",
    "img/days/day-sunday-rest-prep.webp"
  ]);
  assert.match(css, /\.day-hero[\s\S]*object-fit:\s*cover;/);
  assert.match(css, /\.day-hero[\s\S]*object-position:\s*center 25%;/);
  const sw = readFileSync("sw.js", "utf8");
  assert.match(sw, /boets-v8/);
  assert.equal(sw.includes("./img/ex/"), false);
  assert.match(sw, /img\/ex\//);
  const { existsSync } = require("node:fs");
  const anim = [...app.matchAll(/"([a-z0-9-]+)": "([a-z0-9.-]+\.(?:mp4|webp))"/g)];
  const exIds = new Set([...app.matchAll(/id: "([^"]+)", name:/g)].map((match) => match[1]));
  const mapped = new Set();
  for (const match of anim) {
    if (!exIds.has(match[1])) continue;
    mapped.add(match[1]);
    assert.equal(existsSync("img/ex/" + match[2]), true, match[2]);
    if (match[2].endsWith(".mp4")) assert.equal(existsSync("img/ex/" + match[2].replace(/\.mp4$/, ".jpg")), true, match[2]);
  }
  const missing = [...exIds].filter((id) => !mapped.has(id)).sort();
  assert.deepEqual(missing, ["mob-thu", "z-follow"]);
  for (const file of [
    "img/days/day-tennis.webp",
    "img/days/day-press-shoulders.webp",
    "img/days/day-shoulders-legs.webp",
    "img/days/day-pullups.webp",
    "img/days/day-home-mobility.webp",
    "img/days/day-sunday-rest-prep.webp"
  ]) {
    assert.match(sw, new RegExp(file.replaceAll(".", "\\.")));
  }
});
