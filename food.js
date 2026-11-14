/* Nutrition: menu, recipes and shopping list loaded from data/*.json */

function parseRange(text) {
  const match = String(text || "").match(/(\d+(?:[.,]\d+)?)\s*[–-]\s*(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  return {
    low: Number(match[1].replace(",", ".")),
    high: Number(match[2].replace(",", "."))
  };
}

function rangeStatus(value, range) {
  if (!range) return "unknown";
  const n = Number(value);
  if (!Number.isFinite(n)) return "unknown";
  if (n < range.low) return "under";
  if (n > range.high) return "over";
  return "in";
}

function menuIndexFromDate(date) {
  const dow = date.getDay();
  return dow === 0 ? 6 : dow - 1;
}

function formatMacro(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "0";
  const rounded = Math.round(n * 10) / 10;
  if (Math.abs(rounded - Math.round(rounded)) < 0.05) return String(Math.round(rounded));
  return rounded.toLocaleString("ru-RU");
}

function formatKbju(kcal, protein, fat, carbs) {
  return `${formatMacro(kcal)} ккал · Б ${formatMacro(protein)} · Ж ${formatMacro(fat)} · У ${formatMacro(carbs)}`;
}

function formatGrams(value) {
  if (value == null || value === "") return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  const rounded = Math.abs(n - Math.round(n)) < 0.05 ? Math.round(n) : Math.round(n * 10) / 10;
  return rounded.toLocaleString("ru-RU") + " г";
}

function carbRemainder(kcalRange, protein, fat) {
  if (!kcalRange) return null;
  const mid = (Number(kcalRange.low) + Number(kcalRange.high)) / 2;
  const grams = (mid - Number(protein) * 4 - Number(fat) * 9) / 4;
  return Math.max(0, Math.round(grams));
}
function shopKey(section, name) {
  return section + "\n" + name;
}

async function loadFood() {
  async function read(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(url);
    return res.json();
  }
  const [recipes, menu, shopping] = await Promise.all([
    read("./data/recipes.json"),
    read("./data/menu-week.json"),
    read("./data/shopping-week.json")
  ]);
  const byId = {};
  recipes.forEach((recipe) => {
    byId[recipe.id] = recipe;
  });
  globalThis.FOOD = { recipes: recipes, menu: menu, shopping: shopping, byId: byId };
}

function selectedMenuDay() {
  if (!globalThis.FOOD) return null;
  const days = FOOD.menu.days || [];
  if (ui.menuDayIndex != null && days[ui.menuDayIndex]) return days[ui.menuDayIndex];
  return days[menuIndexFromDate(parseIso(todayDate()))] || days[0];
}

function macroCell(label, value, color, goal, range) {
  const width = range ? Math.min(100, Math.round((Number(value) / (range.high * 1.15)) * 100)) : Math.min(100, 70);
  return `<div class="macro" style="--m:${color}"><div class="lbl">${label}</div><b>${formatMacro(value)}<small> г</small></b><div class="bar"><span style="width:${width}%;background:${color}"></span></div><div class="goal">${goal}</div></div>`;
}
function macroLine(label, value, range, unit) {
  const status = rangeStatus(value, range);
  const scaleMax = Math.max(range ? range.high * 1.25 : 1, Number(value) || 0, 1);
  const left = range ? Math.round((range.low / scaleMax) * 1000) / 10 : 0;
  const width = range ? Math.max(2, Math.round(((range.high - range.low) / scaleMax) * 1000) / 10) : 0;
  const mark = Math.min(100, Math.round((Number(value) / scaleMax) * 1000) / 10);
  const word = status === "in" ? "в коридоре" : status === "under" ? "ниже" : status === "over" ? "выше" : "";
  return `
    <div class="macro">
      <div class="macro-top">
        <span>${label}</span>
        <b>${formatMacro(value)}${unit ? " " + unit : ""}</b>
      </div>
      <div class="range-bar" aria-hidden="true">
        <div class="range-zone" style="left:${left}%;width:${width}%"></div>
        <div class="range-mark ${status}" style="left:${mark}%"></div>
      </div>
      <small>${range ? formatMacro(range.low) + "–" + formatMacro(range.high) : ""} ${word}</small>
    </div>`;
}

function renderFood() {
  if (globalThis.FOOD_ERROR) {
    return `<section class="hero"><h2>Питание</h2><p>Не удалось загрузить меню. Проверьте файлы в папке data.</p></section>`;
  }
  if (!globalThis.FOOD) {
    return `<p class="section-title">Питание</p><p class="notes">Загружаем меню…</p>`;
  }
  const view = ui.foodView || "today";
  return `
    <div class="subnav">
      <button type="button" data-food="today" class="${view === "today" ? "on" : ""}">День</button>
      <button type="button" data-food="week" class="${view === "week" ? "on" : ""}">Неделя</button>
      <button type="button" data-food="recipes" class="${view === "recipes" ? "on" : ""}">Рецепты</button>
      <button type="button" data-food="shop" class="${view === "shop" ? "on" : ""}">Покупки</button>
    </div>
    ${view === "today" ? renderFoodToday() : ""}
    ${view === "week" ? renderFoodWeek() : ""}
    ${view === "recipes" ? renderRecipes() : ""}
    ${view === "shop" ? renderShopping() : ""}`;
}

function renderFoodToday() {
  const day = selectedMenuDay();
  if (!day) return `<p class="notes">В меню нет дней.</p>`;
  const menu = FOOD.menu;
  const kcalRange = parseRange(day.target_kcal);
  const proteinRange = parseRange(menu.targets && menu.targets.protein_g);
  const fatRange = parseRange(menu.targets && menu.targets.fat_g);
  const totals = day.totals || {};
  const meals = (day.meals || []).map(renderMeal).join("");
  return `
    <section class="hero">
      <div class="place-row">
        <span class="pill">${escapeHtml(day.type || "")}</span>
        <span class="meta">${escapeHtml(day.target_kcal || "")} ккал</span>
      </div>
      <h2>${escapeHtml(capitalize(day.day))}</h2>
      <p>${escapeHtml((menu.targets && menu.targets.gi) || "")}</p>
    </section>
    <section class="guide-card macros">
      <h3>Итого за день</h3>
      <div class="kcal-hero">${formatMacro(totals.kcal)}<small>ккал</small></div>
      <p class="notes">цель ${escapeHtml(day.target_kcal || "")}</p>
      <div class="macro-grid">
        ${macroCell("Белки", totals.protein, "var(--c-protein)", proteinRange ? "цель " + formatMacro(proteinRange.low) + "–" + formatMacro(proteinRange.high) : "", proteinRange)}
        ${macroCell("Жиры", totals.fat, "var(--c-fat)", fatRange ? "цель " + formatMacro(fatRange.low) + "–" + formatMacro(fatRange.high) : "", fatRange)}
        ${macroCell("Углеводы", totals.carbs, "var(--c-carbs)", "по остатку " + formatMacro(carbRemainder(kcalRange, totals.protein, totals.fat)) + " г", null)}
      </div>
    </section>
    ${meals}`;
}

function eatenKey(index) {
  const today = parseIso(todayDate());
  const idx = ui.menuDayIndex == null ? menuIndexFromDate(today) : ui.menuDayIndex;
  const iso = isoDate(addDays(today, idx - menuIndexFromDate(today)));
  return iso + "#" + index;
}
const FOOD_SLUGS = {
  "Стандартный завтрак: творог 5% 250 г, банан 120 г, мёд 15 г": "tvorog-banan-med",
  "Кремовая курица с рисом и карамелизированным луком": "kremovaya-kuritsa",
  "ПП пирожки с яйцом и творогом": "pirozhki-yaitso-tvorog",
  "Белковый салат «Биг Тейсти»": "big-tasty",
  "Гречка с тушёным кабачком": "grechka-kabachok",
  "Греческий йогурт 2%": "grecheskiy-yogurt",
  "Салат с тунцом, яйцом и йогуртом": "salat-tunets",
  "Рис отварной": "ris-otvarnoy",
  "Запеканка-чизкейк с голубикой": "chizkeyk-golubika",
  "Запечённая куриная грудка с гречкой и тушёными овощами": "kuritsa-grechka-ovoshchi",
  "Творог 5%": "tvorog",
  "Домашняя шаурма с индейкой": "shaurma-indeyka",
  "Белковый чизкейк со смородиной": "chizkeyk-smorodina",
  "Запечённый минтай с рисом и тушёными овощами": "mintay-ris",
  "Белковый желатиновый десерт с какао": "desert-kakao",
  "Запечённые шампиньоны в йогурте": "shampinony-yogurt",
  "Куриная грудка и рис": "kuritsa-ris",
  "Морковный салат с яблоком и йогуртом": "salat-morkov-yabloko",
  "Хычины с творогом и лёгким сыром, 2 порц.": "hychiny",
  "Хычины с творогом и лёгким сыром": "hychiny",
  "Оливковое масло к овощам / хычинам": "olivkovoe-maslo",
  "Йогурт и яблоко": "yogurt-yabloko",
  "Огурец": "ogurets",
  "Яблоко": "yabloko",
  "Творожные хачапури-лодочки с сулугуни": "hachapuri-lodochki"
};

function foodSlug(title) {
  if (FOOD_SLUGS[title]) return FOOD_SLUGS[title];
  const map = { а:"a", б:"b", в:"v", г:"g", д:"d", е:"e", ё:"e", ж:"zh", з:"z", и:"i", й:"y", к:"k", л:"l", м:"m", н:"n", о:"o", п:"p", р:"r", с:"s", т:"t", у:"u", ф:"f", х:"h", ц:"ts", ч:"ch", ш:"sh", щ:"sch", ъ:"", ы:"y", ь:"", э:"e", ю:"yu", я:"ya" };
  return String(title || "dish").toLowerCase().split("").map((ch) => (map[ch] != null ? map[ch] : ch)).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72) || "dish";
}

function foodPhotoHtml(title) {
  const slug = foodSlug(title);
  return `<div class="food-frame" data-food-slug="${escapeAttr(slug)}"><img class="food-photo" alt="" src="img/food/${escapeAttr(slug)}.webp" onerror="this.remove()"></div>`;
}

function renderMeal(meal, index) {
  const recipe = meal.recipe_id && FOOD.byId[meal.recipe_id];
  const on = !!(getState().eaten && getState().eaten[eatenKey(index)]);
  return `
    <article class="ex meal">
      <div class="meal-row">
        <button type="button" class="ate${on ? " on" : ""}" data-ate="${index}" aria-pressed="${on ? "true" : "false"}">${on ? icon("check") : ""}</button>
        <div style="flex:1;min-width:0">
          ${foodPhotoHtml(recipe ? recipe.title : meal.dish)}
          <div class="card-title">${escapeHtml(meal.name)}</div>
          <h3>${escapeHtml(meal.dish)}</h3>
          <p class="kbju"><span class="p">Б ${formatMacro(meal.protein)}</span> <span class="f">Ж ${formatMacro(meal.fat)}</span> <span class="c">У ${formatMacro(meal.carbs)}</span></p>
          ${meal.note ? `<p class="notes">${escapeHtml(meal.note)}</p>` : ""}
          ${recipe ? `<div class="ig-links"><button type="button" class="ig-btn" data-recipe="${escapeAttr(recipe.id)}">Рецепт</button><a class="ig-btn" href="${escapeAttr(recipe.source_url)}" target="_blank" rel="noopener noreferrer">Смотреть в Instagram</a></div>` : ""}
        </div>
        <div class="meal-side">${formatMacro(meal.kcal)}<small>ккал</small></div>
      </div>
    </article>`;
}

function renderFoodWeek() {
  const menu = FOOD.menu;
  const cards = (menu.days || []).map((day, index) => {
    const kcalRange = parseRange(day.target_kcal);
    const status = rangeStatus(day.totals.kcal, kcalRange);
    const word = status === "in" ? "в коридоре" : status === "under" ? "ниже цели" : "выше потолка";
    return `
      <button type="button" class="week-card" data-menu-day="${index}">
        <div class="wd"><b>${escapeHtml(day.day.slice(0, 2))}</b><span>${escapeHtml(day.type)}</span></div>
        <div style="flex:1;min-width:0;text-align:left">
          <h3>${escapeHtml(capitalize(day.day))}</h3>
          <p>${formatKbju(day.totals.kcal, day.totals.protein, day.totals.fat, day.totals.carbs)}</p>
        </div>
        <span class="status-pill ${status}">${word}</span>
      </button>`;
  }).join("");
  const leftovers = menu.leftovers
    ? `<ul>${Object.keys(menu.leftovers).map((key) => `<li><b>${escapeHtml(key)}.</b> ${escapeHtml(menu.leftovers[key])}</li>`).join("")}</ul>`
    : "";
  return `
    <p class="section-title">${escapeHtml(menu.title || "Неделя")}</p>
    ${cards}
    ${menu.sunday_meal_prep ? `<section class="guide-card"><h3>Заготовка в воскресенье</h3><p class="notes" style="margin:0">${escapeHtml(menu.sunday_meal_prep)}</p></section>` : ""}
    ${leftovers ? `<section class="guide-card"><h3>Что останется</h3>${leftovers}</section>` : ""}`;
}

function renderRecipes() {
  const all = FOOD.recipes || [];
  const list = ui.recipeId ? all.filter((recipe) => recipe.id === ui.recipeId) : all;
  const back = ui.recipeId ? `<button type="button" class="btn ghost" data-food="recipes" data-recipes-all="1" style="margin-bottom:12px">Все рецепты</button>` : "";
  if (!list.length) return `${back}<p class="notes">Рецепт не найден.</p>`;
  return back + list.map(renderRecipeCard).join("");
}

function renderRecipeCard(recipe) {
  const ingredients = (recipe.ingredients || []).map((item) => `<li>${escapeHtml(item.name)} — ${formatGrams(item.grams)}</li>`).join("");
  const steps = (recipe.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  return `
    <article class="guide-card recipe" id="recipe-${escapeAttr(recipe.id)}">
      ${foodPhotoHtml(recipe.title)}
      <div class="place-row">
        <span class="pill">${escapeHtml(recipe.category || "рецепт")}</span>
        <span class="meta">${recipe.servings} порц.</span>
        <span class="meta">КБЖУ: ${escapeHtml(recipe.kbju_source || "")}</span>
      </div>
      <h3>${escapeHtml(recipe.title)}</h3>
      <p class="notes" style="margin-top:0">${escapeHtml(recipe.author || "")}</p>
      <p class="kbju">${formatKbju(recipe.kcal, recipe.protein, recipe.fat, recipe.carbs)} на порцию</p>
      <h4>Ингредиенты</h4>
      <ul>${ingredients}</ul>
      <h4>Шаги</h4>
      <ol>${steps}</ol>
      ${recipe.notes ? `<p class="notes">${escapeHtml(recipe.notes)}</p>` : ""}
      <div class="ig-links">
        <a class="ig-btn" href="${escapeAttr(recipe.source_url)}" target="_blank" rel="noopener noreferrer">Смотреть в Instagram</a>
      </div>
    </article>`;
}

function renderShopping() {
  const data = FOOD.shopping;
  const saved = getState().shopping || {};
  let done = 0;
  let total = 0;
  const sections = (data.sections || []).map((section) => {
    const items = (section.items || []).map((item) => {
      total += 1;
      const key = shopKey(section.section, item.name);
      const on = !!saved[key];
      if (on) done += 1;
      const qty = item.quantity || formatGrams(item.grams);
      return `
        <label class="shop-item${on ? " is-on" : ""}">
          <input type="checkbox" data-shop="${escapeAttr(key)}" ${on ? "checked" : ""}>
          <span>
            <b>${escapeHtml(item.name)}</b>
            <small>${escapeHtml(qty || "")}${item.note ? " · " + escapeHtml(item.note) : ""}</small>
          </span>
        </label>`;
    }).join("");
    return `<section class="guide-card"><h3>${escapeHtml(section.section)}</h3>${items}</section>`;
  }).join("");
  return `
    <section class="hero">
      <div class="place-row">
        <span class="pill">Покупки</span>
        <span class="meta">${done}/${total}</span>
      </div>
      <h2>${escapeHtml(data.title || "Список покупок")}</h2>
      <p>${escapeHtml(data.note || "")}</p>
      <div class="progress-line">
        <div class="bar"><span style="width:${total ? Math.round((done / total) * 100) : 0}%"></span></div>
        <b>${done}/${total}</b>
      </div>
    </section>
    ${sections}
    <div class="day-actions one">
      <button class="btn ghost" type="button" id="shop-reset">Сбросить отметки</button>
    </div>`;
}

function capitalize(value) {
  const text = String(value || "");
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function bindFood() {
  document.querySelectorAll("[data-food]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.foodView = button.dataset.food;
      ui.recipeId = null;
      if (button.dataset.food === "today") ui.menuDayIndex = null;
      render({ scroll: "top" });
    });
  });
  document.querySelectorAll("[data-recipe]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.foodView = "recipes";
      ui.recipeId = button.dataset.recipe;
      render({ scroll: "top" });
    });
  });
  document.querySelectorAll("[data-menu-day]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.menuDayIndex = Number(button.dataset.menuDay);
      ui.foodView = "today";
      render({ scroll: "top" });
    });
  });
  document.querySelectorAll("[data-shop]").forEach((input) => {
    input.addEventListener("change", () => {
      const key = input.dataset.shop;
      updateState((s) => {
        if (!s.shopping) s.shopping = {};
        if (input.checked) s.shopping[key] = true;
        else delete s.shopping[key];
      });
      const label = input.closest(".shop-item");
      if (label) label.classList.toggle("is-on", input.checked);
      const meta = document.querySelector(".hero .meta");
      const progress = document.querySelector(".hero .progress-line b");
      const bar = document.querySelector(".hero .bar > span");
      const boxes = document.querySelectorAll("[data-shop]");
      let done = 0;
      boxes.forEach((box) => {
        if (box.checked) done += 1;
      });
      if (meta) meta.textContent = done + "/" + boxes.length;
      if (progress) progress.textContent = done + "/" + boxes.length;
      if (bar) bar.style.width = (boxes.length ? Math.round((done / boxes.length) * 100) : 0) + "%";
    });
  });
  document.querySelectorAll("[data-ate]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = eatenKey(Number(button.dataset.ate));
      updateState((s) => {
        if (!s.eaten) s.eaten = {};
        if (s.eaten[key]) delete s.eaten[key];
        else s.eaten[key] = true;
      });
      render({ scroll: "keep" });
    });
  });
  const reset = document.getElementById("shop-reset");
  if (reset) {
    reset.addEventListener("click", () => {
      updateState((s) => {
        s.shopping = {};
      });
      render({ scroll: "keep" });
    });
  }
}

async function bootApp() {
  try {
    await loadFood();
  } catch (e) {
    globalThis.FOOD_ERROR = true;
  }
  if (!isNativeApp()) {
    applyActivityMarks(stepsRowsFromState(), []);
  }
  render();
  const splash = document.getElementById("splash");
  if (splash) splash.classList.add("hide");
}

if (typeof document !== "undefined") {
  bootApp();
}

globalThis.BoetsFood = {
  parseRange: parseRange,
  rangeStatus: rangeStatus,
  menuIndexFromDate: menuIndexFromDate,
  formatKbju: formatKbju,
  formatGrams: formatGrams,
  shopKey: shopKey,
  carbRemainder: carbRemainder,
  foodSlug: foodSlug
};
