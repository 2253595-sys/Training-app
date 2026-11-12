/* Activity: Health Connect on Android, manual steps in the browser. */

const STEP_GOAL_LOW = 10000;
const STEP_GOAL_HIGH = 15000;

const STRENGTH_TYPES = new Set([
  "strength",
  "weightlifting",
  "calisthenics",
  "boot_camp",
  "hiit",
  "exercise_class",
  "gymnastics",
  "boxing",
  "martial_arts"
]);
const RACKET_TYPES = new Set(["tennis", "table_tennis", "badminton", "squash", "racquetball"]);
const MOBILITY_TYPES = new Set(["yoga", "stretching", "pilates", "guided_breathing"]);

const EXERCISE_LABELS = {
  other: "Тренировка",
  badminton: "Бадминтон",
  baseball: "Бейсбол",
  basketball: "Баскетбол",
  biking: "Велосипед",
  biking_stationary: "Велотренажёр",
  boot_camp: "Буткемп",
  boxing: "Бокс",
  calisthenics: "Калистеника",
  cricket: "Крикет",
  dancing: "Танцы",
  elliptical: "Эллипс",
  exercise_class: "Групповая тренировка",
  fencing: "Фехтование",
  football_american: "Американский футбол",
  football_australian: "Австралийский футбол",
  frisbee_disc: "Фрисби",
  golf: "Гольф",
  guided_breathing: "Дыхание",
  gymnastics: "Гимнастика",
  handball: "Гандбол",
  hiit: "Интервальная тренировка",
  hiking: "Хайкинг",
  ice_hockey: "Хоккей",
  ice_skating: "Коньки",
  martial_arts: "Единоборства",
  paddling: "Гребля на байдарке",
  paragliding: "Параплан",
  pilates: "Пилатес",
  racquetball: "Ракетбол",
  rock_climbing: "Скалолазание",
  roller_hockey: "Хоккей на роликах",
  rowing: "Гребля",
  rowing_machine: "Гребной тренажёр",
  rugby: "Регби",
  running: "Бег",
  running_treadmill: "Бег на дорожке",
  sailing: "Парус",
  scuba_diving: "Дайвинг",
  skating: "Катание",
  skiing: "Лыжи",
  snowboarding: "Сноуборд",
  snowshoeing: "Снегоступы",
  soccer: "Футбол",
  softball: "Софтбол",
  squash: "Сквош",
  stair_climbing: "Лестница",
  stair_climbing_machine: "Степпер",
  strength: "Силовая тренировка",
  stretching: "Растяжка",
  surfing: "Сёрфинг",
  swimming_open_water: "Плавание на открытой воде",
  swimming_pool: "Плавание в бассейне",
  table_tennis: "Настольный теннис",
  tennis: "Теннис",
  volleyball: "Волейбол",
  walking: "Ходьба",
  water_polo: "Водное поло",
  weightlifting: "Тяжёлая атлетика",
  wheelchair: "Тренировка на коляске",
  yoga: "Йога"
};

function isNativeApp() {
  try {
    return !!(window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform());
  } catch (e) {
    return false;
  }
}

function healthPlugin() {
  const cap = typeof window !== "undefined" ? window.Capacitor : null;
  return cap && cap.Plugins && cap.Plugins.HealthConnect ? cap.Plugins.HealthConnect : null;
}

function exerciseLabel(type) {
  return EXERCISE_LABELS[type] || EXERCISE_LABELS.other;
}

function stepGoalFor(date) {
  const day = date instanceof Date ? date : parseIso(String(date));
  if (day.getDay() === 0) return { low: 10000, high: 15000, sunday: true };
  return { low: 10000, high: 10000, sunday: false };
}
function goalStatus(steps, date) {
  const n = Math.max(0, Math.round(Number(steps) || 0));
  const goal = date ? stepGoalFor(date) : { low: STEP_GOAL_LOW, high: STEP_GOAL_HIGH, sunday: true };
  let state = "below";
  if (goal.sunday && n >= goal.high) state = "top";
  else if (n >= goal.low) state = "met";
  return { steps: n, state: state, goalLow: goal.low, goalHigh: goal.high, sunday: !!goal.sunday };
}

function formatSteps(n) {
  return Math.max(0, Math.round(Number(n) || 0)).toLocaleString("ru-RU");
}

function durationOk(sessions, types, minMinutes) {
  return (sessions || []).some((session) => types.has(session.type) && Number(session.durationMin) >= minMinutes);
}

function matchingAction(tag, sessions, steps) {
  const list = sessions || [];
  let markWorkout = false;
  let onlyIds = null;
  let reason = null;
  if ((tag === "gym" || tag === "office") && durationOk(list, STRENGTH_TYPES, 20)) {
    markWorkout = true;
    reason = "strength";
  } else if (tag === "tennis" && (durationOk(list, RACKET_TYPES, 15) || durationOk(list, STRENGTH_TYPES, 15))) {
    markWorkout = true;
    reason = "tennis";
  } else if (tag === "rest" && Number(steps) >= STEP_GOAL_LOW) {
    markWorkout = true;
    onlyIds = ["walk"];
    reason = "steps";
  }
  const markZaryadka = durationOk(list, MOBILITY_TYPES, 8);
  return { markWorkout: markWorkout, markZaryadka: markZaryadka, onlyIds: onlyIds, reason: reason };
}

function healthReasonText(reason) {
  if (reason === "strength") return "День отмечен: в Health Connect есть силовая тренировка.";
  if (reason === "tennis") return "День отмечен: в Health Connect есть теннис или тренировка.";
  if (reason === "steps") return "Прогулка отмечена: за день набралось от 10 000 шагов.";
  return "Отмечено по данным Health Connect.";
}

function last7Dates() {
  const today = parseIso(todayDate());
  const dates = [];
  for (let i = 6; i >= 0; i--) dates.push(isoDate(addDays(today, -i)));
  return dates;
}

function ensureDay(s, iso) {
  if (!s.days[iso]) s.days[iso] = { workout: {}, zaryadka: {} };
  if (!s.days[iso].workout) s.days[iso].workout = {};
  if (!s.days[iso].zaryadka) s.days[iso].zaryadka = {};
  if (!s.days[iso].manualIds) s.days[iso].manualIds = {};
  return s.days[iso];
}

function isManualExercise(day, scope, exId) {
  return !!(day.manualIds && day.manualIds[scope] && day.manualIds[scope][exId]);
}

function fillExercise(log, ex) {
  if (!log[ex.id]) log[ex.id] = { weight: "", sets: [] };
  log[ex.id].sets = Array(ex.sets).fill(true);
}

function clearFilled(log, ids, manualScope, day) {
  (ids || []).forEach((id) => {
    if (isManualExercise(day, manualScope, id)) return;
    if (log[id]) log[id].sets = [];
  });
}

function applyAction(s, iso, plan, action) {
  const day = ensureDay(s, iso);
  const workoutTargets = action.onlyIds
    ? plan.exercises.filter((ex) => action.onlyIds.indexOf(ex.id) !== -1)
    : plan.exercises.filter((ex) => isExerciseUnlocked(ex, s));

  if (action.markWorkout) {
    const filled = [];
    workoutTargets.forEach((ex) => {
      if (isManualExercise(day, "workout", ex.id)) return;
      fillExercise(day.workout, ex);
      filled.push(ex.id);
    });
    day.healthFilled = filled;
    day.workoutHealth = filled.length > 0;
    day.workoutHealthReason = filled.length ? action.reason : "";
  } else if (day.healthFilled && day.healthFilled.length) {
    clearFilled(day.workout, day.healthFilled, "workout", day);
    day.healthFilled = [];
    day.workoutHealth = false;
    day.workoutHealthReason = "";
  }

  const zPlan = zaryadkaAuto(parseIso(iso));
  if (action.markZaryadka) {
    const filledZ = [];
    zPlan.exercises.forEach((ex) => {
      if (isManualExercise(day, "zaryadka", ex.id)) return;
      fillExercise(day.zaryadka, ex);
      filledZ.push(ex.id);
    });
    day.healthFilledZ = filledZ;
    day.zaryadkaHealth = filledZ.length > 0;
  } else if (day.healthFilledZ && day.healthFilledZ.length) {
    clearFilled(day.zaryadka, day.healthFilledZ, "zaryadka", day);
    day.healthFilledZ = [];
    day.zaryadkaHealth = false;
  }
}

function applyActivityMarks(dayRows, sessions) {
  updateState((s) => {
    (dayRows || []).forEach((row) => {
      const plan = dayPlan(parseIso(row.date));
      const daySessions = (sessions || []).filter((session) => session.date === row.date);
      applyAction(s, row.date, plan, matchingAction(plan.tag, daySessions, row.steps));
    });
  });
}

function stepsRowsFromState() {
  const saved = getState().steps || {};
  return last7Dates().map((date) => ({ date: date, steps: Math.max(0, Math.round(Number(saved[date]) || 0)) }));
}

function chartRows() {
  if (isNativeApp() && ui.activity && ui.activity.days && ui.activity.days.length) {
    const byDate = {};
    ui.activity.days.forEach((row) => {
      byDate[row.date] = Math.max(0, Math.round(Number(row.steps) || 0));
    });
    return last7Dates().map((date) => ({ date: date, steps: byDate[date] || 0 }));
  }
  return stepsRowsFromState();
}

function goalPhrase(status, isToday) {
  if (status.sunday && status.state === "top") return "Верхняя граница цели достигнута";
  if (status.state === "met" || status.state === "top") return isToday ? "Цель на сегодня выполнена" : "Цель за этот день выполнена";
  const left = status.goalLow - status.steps;
  return "До цели ещё " + formatSteps(left) + " шагов";
}

function sessionWhen(session) {
  const today = todayDate();
  const yesterday = isoDate(addDays(parseIso(today), -1));
  let day = ruDateShort(parseIso(session.date));
  if (session.date === today) day = "сегодня";
  else if (session.date === yesterday) day = "вчера";
  const start = session.start ? new Date(session.start) : null;
  const end = session.end ? new Date(session.end) : null;
  const clock = start && !Number.isNaN(start.getTime())
    ? start.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : "";
  const clockEnd = end && !Number.isNaN(end.getTime())
    ? end.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : "";
  return [day, clock && clockEnd ? clock + "–" + clockEnd : clock].filter(Boolean).join(" · ");
}

function formatDuration(min) {
  const n = Math.max(0, Math.round(Number(min) || 0));
  if (n < 60) return n + " мин";
  const h = Math.floor(n / 60);
  const m = n % 60;
  return m ? h + " ч " + m + " мин" : h + " ч";
}

function sessionKcal(session) {
  if (session.activeKcal != null && Number(session.activeKcal) > 0) {
    return { value: Math.round(Number(session.activeKcal)), kind: "активные" };
  }
  if (session.totalKcal != null && Number(session.totalKcal) > 0) {
    return { value: Math.round(Number(session.totalKcal)), kind: "всего" };
  }
  return null;
}

function renderGoalCard(steps, manual, date) {
  const when = date || ((ui.activity && ui.activity.editDate) ? parseIso(ui.activity.editDate) : parseIso(todayDate()));
  const status = goalStatus(steps, when);
  const scale = Math.max(status.goalHigh, status.steps, 1);
  const fill = Math.min(100, Math.round((status.steps / scale) * 100));
  const zoneLeft = Math.round((STEP_GOAL_LOW / scale) * 100);
  const cls = status.state === "below" ? "" : " is-met";
  const edit = manual ? ((ui.activity && ui.activity.editDate) || todayDate()) : todayDate();
  const pill = edit === todayDate() ? "Сегодня" : ruDateShort(parseIso(edit));
  return `
    <section class="hero activity-hero">
      <div class="place-row">
        <span class="pill">${escapeHtml(pill)}</span>
        <span class="meta">цель ${status.sunday ? formatSteps(status.goalLow) + "–" + formatSteps(status.goalHigh) : formatSteps(status.goalLow)}</span>
      </div>
      <div class="steps-num${cls}">${formatSteps(status.steps)}</div>
      <p class="steps-caption">шагов</p>
      <div class="goal-track" aria-hidden="true">
        <div class="goal-zone" style="left:${zoneLeft}%"></div>
        <div class="goal-fill${cls}" style="width:${fill}%"></div>
      </div>
      <p class="goal-phrase">${goalPhrase(status, edit === todayDate())}</p>
      ${manual ? renderStepsForm() : ""}
    </section>`;
}

function renderStepsForm() {
  const edit = (ui.activity && ui.activity.editDate) || todayDate();
  const saved = getState().steps || {};
  const value = saved[edit] != null && saved[edit] !== "" ? saved[edit] : "";
  const labelDate = edit === todayDate() ? "сегодня" : ruDateShort(parseIso(edit));
  return `
    <form class="steps-form" id="steps-form">
      <label for="steps-input">Шаги ${escapeHtml(labelDate)}</label>
      <input id="steps-input" type="number" inputmode="numeric" min="0" max="200000" step="1" placeholder="0" value="${escapeAttr(value)}">
      <button class="btn" type="submit">Сохранить</button>
    </form>`;
}

function renderStepsChart(rows) {
  const scale = Math.max(STEP_GOAL_HIGH, ...rows.map((row) => row.steps), 1);
  const goalBottom = Math.round((STEP_GOAL_LOW / scale) * 100);
  const manual = !isNativeApp() || !(ui.activity && ui.activity.days && ui.activity.days.length);
  const edit = (ui.activity && ui.activity.editDate) || todayDate();
  const cols = rows.map((row) => {
    const status = goalStatus(row.steps);
    const h = row.steps ? Math.max(4, Math.round((row.steps / scale) * 100)) : 0;
    const cls = status.state === "top" ? "hit-high" : status.state === "met" ? "hit" : "";
    const plan = dayPlan(parseIso(row.date));
    const active = manual && edit === row.date ? " is-active" : "";
    return `
      <button type="button" class="bar-col${active}" data-steps-date="${row.date}">
        <span class="bar-val">${row.steps ? formatSteps(row.steps) : ""}</span>
        <span class="bar-track">
          <span class="goal-mark" style="bottom:${goalBottom}%"></span>
          <span class="bar-fill ${cls}" style="height:${h}%"></span>
        </span>
        <span class="bar-dow">${plan.short}</span>
      </button>`;
  }).join("");
  return `
    <p class="section-title">7 дней</p>
    <div class="chart" role="img" aria-label="Шаги за семь дней. Пунктир — 10 000.">${cols}</div>
    <p class="notes chart-note">Пунктир на столбцах — 10 000 шагов. Коридор цели — до 15 000.</p>`;
}

function renderSessions(sessions) {
  const list = (sessions || []).slice().sort((a, b) => String(b.start).localeCompare(String(a.start)));
  if (!list.length) {
    return `
      <p class="section-title">Тренировки</p>
      <p class="notes">За 7 дней в Health Connect нет тренировок.</p>`;
  }
  const cards = list.map((session) => {
    const kcal = sessionKcal(session);
    const title = session.title ? escapeHtml(session.title) : exerciseLabel(session.type);
    return `
      <article class="session">
        <div>
          <h3>${title}</h3>
          <p>${escapeHtml(sessionWhen(session))}${session.title ? " · " + escapeHtml(exerciseLabel(session.type)) : ""}</p>
        </div>
        <div class="session-side">
          <b>${formatDuration(session.durationMin)}</b>
          ${kcal ? `<span>${formatSteps(kcal.value)} ккал</span><small>${kcal.kind}</small>` : ""}
        </div>
      </article>`;
  }).join("");
  return `<p class="section-title">Тренировки</p>${cards}`;
}

function renderActivity() {
  const activity = ui.activity || {};
  if (!isNativeApp()) return renderBrowserActivity();
  if (activity.loading && !activity.days) {
    return `<p class="section-title">Активность</p><p class="notes">Читаем Health Connect…</p>`;
  }
  if (activity.availability === "update_required") {
    return `
      <section class="hero">
        <h2>Health Connect</h2>
        <p>Установите или обновите Health Connect, чтобы подтянуть шаги и тренировки.</p>
        <div class="day-actions one">
          <button class="btn" type="button" id="hc-install">Открыть в Google Play</button>
        </div>
      </section>
      ${renderManualFallback("Пока Health Connect недоступен, шаги можно вписать вручную.")}`;
  }
  if (activity.availability === "unavailable") {
    return `
      <section class="hero">
        <h2>Health Connect</h2>
        <p>На этом телефоне Health Connect недоступен. Шаги можно вписать вручную.</p>
      </section>
      ${renderManualFallback("")}`;
  }
  const perms = activity.permissions || {};
  const needsSteps = !perms.steps;
  const needsExercise = !perms.exercise;
  let permissionBlock = "";
  if (needsSteps || needsExercise || activity.error) {
    permissionBlock = `
      <section class="hint-box">
        <b>Доступ к Health Connect.</b>
        Боец читает шаги, тренировки и калории за сегодня и 7 дней. Данные остаются на телефоне.
        ${needsSteps ? " Нужны шаги." : ""}
        ${needsExercise ? " Нужны тренировки." : ""}
        ${activity.error ? " " + escapeHtml(activity.error) : ""}
        <div class="install row" style="margin-top:10px">
          <button class="btn" type="button" id="hc-request">Разрешить доступ</button>
          <button class="btn ghost" type="button" id="hc-settings">Открыть Health Connect</button>
        </div>
      </section>`;
  } else if (!perms.totalCalories && !perms.activeCalories) {
    permissionBlock = `<p class="notes">Калории тренировок скрыты: доступ к калориям не выдан. Шаги и сессии читаются.</p>`;
  }
  const rows = chartRows();
  const todayRow = rows.filter((row) => row.date === todayDate())[0] || { steps: 0 };
  const showManual = needsSteps;
  return `
    ${permissionBlock}
    ${renderGoalCard(todayRow.steps, false)}
    ${renderStepsChart(rows)}
    ${needsExercise ? "" : renderSessions(activity.sessions || [])}
    ${showManual ? renderManualFallback("Шаги без доступа к Health Connect можно вписать вручную.") : ""}
    <div class="day-actions one">
      <button class="btn ghost" type="button" id="hc-refresh">Обновить</button>
    </div>`;
}

function renderBrowserActivity() {
  const rows = chartRows();
  const edit = (ui.activity && ui.activity.editDate) || todayDate();
  const focus = rows.filter((row) => row.date === edit)[0] || rows[rows.length - 1] || { steps: 0 };
  return `
    <p class="notes activity-note">Автосинхронизация шагов и тренировок работает в приложении для Android. Здесь шаги можно вписать вручную.</p>
    ${renderGoalCard(focus.steps, true)}
    ${renderStepsChart(rows)}
    <p class="section-title">Тренировки</p>
    <p class="notes">Список тренировок из Health Connect появится в приложении для Android.</p>`;
}

function renderManualFallback(text) {
  const rows = stepsRowsFromState();
  ui.activity._manualFallback = true;
  return `
    ${text ? `<p class="notes">${escapeHtml(text)}</p>` : ""}
    ${renderStepsForm()}
    <div class="chart chart-compact">${rows.map((row) => {
      const plan = dayPlan(parseIso(row.date));
      return `<button type="button" class="bar-col${ui.activity.editDate === row.date ? " is-active" : ""}" data-steps-date="${row.date}"><span class="bar-dow">${plan.short}</span><span class="bar-val">${row.steps ? formatSteps(row.steps) : "—"}</span></button>`;
    }).join("")}</div>`;
}

let activityReq = 0;

async function refreshActivity() {
  const token = ++activityReq;
  if (!ui.activity) ui.activity = {};
  if (!isNativeApp()) {
    ui.activity.availability = "browser";
    ui.activity.loading = false;
    ui.activity.days = null;
    ui.activity.sessions = null;
    applyActivityMarks(stepsRowsFromState(), []);
    if (ui.tab === "today" || ui.tab === "progress" || ui.tab === "activity") render({ scroll: ui.activity.booted ? "keep" : "top" });
    ui.activity.booted = true;
    return;
  }
  const plugin = healthPlugin();
  if (!plugin) {
    ui.activity.availability = "unavailable";
    ui.activity.error = "Мост Health Connect не найден.";
    if (ui.tab === "today" || ui.tab === "progress" || ui.tab === "activity") render({ scroll: "top" });
    return;
  }
  ui.activity.loading = true;
  ui.activity.error = "";
  if (ui.tab === "today" || ui.tab === "progress" || ui.tab === "activity") render({ scroll: "keep" });
  try {
    const status = await plugin.getStatus();
    if (token !== activityReq) return;
    ui.activity.availability = status.availability || "unavailable";
    if (ui.activity.availability !== "available") {
      ui.activity.loading = false;
      ui.activity.days = null;
      ui.activity.sessions = null;
      if (ui.tab === "today" || ui.tab === "progress" || ui.tab === "activity") render({ scroll: "keep" });
      return;
    }
    const perms = await plugin.getPermissions();
    if (token !== activityReq) return;
    ui.activity.permissions = perms;
    if (!perms.steps && !perms.exercise) {
      ui.activity.loading = false;
      ui.activity.days = null;
      ui.activity.sessions = null;
      if (ui.tab === "today" || ui.tab === "progress" || ui.tab === "activity") render({ scroll: "keep" });
      return;
    }
    const data = await plugin.readActivity();
    if (token !== activityReq) return;
    ui.activity.days = data.days || [];
    ui.activity.sessions = data.sessions || [];
    if (data.permissions) ui.activity.permissions = data.permissions;
    ui.activity.loading = false;
    applyActivityMarks(ui.activity.days, ui.activity.sessions);
  } catch (e) {
    if (token !== activityReq) return;
    ui.activity.loading = false;
    ui.activity.error = "Не удалось прочитать Health Connect. Запросите доступ ещё раз.";
  }
  if (token === activityReq && (ui.tab === "today" || ui.tab === "progress" || ui.tab === "activity")) render({ scroll: "keep" });
}

function saveManualSteps(date, raw) {
  const trimmed = String(raw == null ? "" : raw).trim();
  const steps = trimmed === "" ? 0 : Math.max(0, Math.min(200000, Math.round(Number(trimmed))));
  if (trimmed !== "" && !Number.isFinite(Number(trimmed))) return;
  updateState((s) => {
    if (!s.steps) s.steps = {};
    if (trimmed === "") delete s.steps[date];
    else s.steps[date] = steps;
    const plan = dayPlan(parseIso(date));
    const sessions = (ui.activity && ui.activity.sessions) || [];
    applyAction(s, date, plan, matchingAction(plan.tag, sessions.filter((item) => item.date === date), steps));
  });
  render({ scroll: "keep" });
}

function bindActivity() {
  const form = document.getElementById("steps-form");
  if (form && !form.dataset.stepsFor) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("steps-input");
      const date = (ui.activity && ui.activity.editDate) || todayDate();
      saveManualSteps(date, input ? input.value : "");
    });
  }
  document.querySelectorAll("[data-steps-date]").forEach((button) => {
    button.addEventListener("click", () => {
      const hasHealth = isNativeApp() && ui.activity && ui.activity.days && ui.activity.days.length && !document.getElementById("steps-form");
      if (hasHealth) return;
      if (!ui.activity) ui.activity = {};
      ui.activity.editDate = button.dataset.stepsDate;
      render({ scroll: "keep" });
    });
  });
  const request = document.getElementById("hc-request");
  if (request) {
    request.addEventListener("click", async () => {
      const plugin = healthPlugin();
      if (!plugin) return;
      request.disabled = true;
      try {
        const perms = await plugin.requestAccess();
        ui.activity.permissions = perms;
      } catch (e) {
        ui.activity.error = "Запрос доступа закрыт без разрешений.";
      }
      refreshActivity();
    });
  }
  const install = document.getElementById("hc-install");
  if (install) install.addEventListener("click", () => {
    const plugin = healthPlugin();
    if (plugin) plugin.openHealthConnectInstall();
  });
  const settings = document.getElementById("hc-settings");
  if (settings) settings.addEventListener("click", () => {
    const plugin = healthPlugin();
    if (plugin) plugin.openHealthConnectSettings();
  });
  const refresh = document.getElementById("hc-refresh");
  if (refresh) refresh.addEventListener("click", () => refreshActivity());
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && ui.tab === "activity") refreshActivity();
  });
}

globalThis.BoetsActivity = {
  matchingAction: matchingAction,
  goalStatus: goalStatus,
  stepGoalFor: stepGoalFor,
  exerciseLabel: exerciseLabel,
  STEP_GOAL_LOW: STEP_GOAL_LOW,
  STEP_GOAL_HIGH: STEP_GOAL_HIGH
};
