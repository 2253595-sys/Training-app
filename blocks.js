/* Day assembled from blocks. Exercises are suggested; the user can swap the variant or remove the block. */

function move(id, name, sets, reps, rest, notes, logWeight) {
  return { id: id, name: name, sets: sets, reps: reps, rest: rest || 0, logWeight: !!logWeight, notes: notes || "" };
}

function knownMove(id, patch) {
  const pools = [];
  [ZARYADKA_A, ZARYADKA_B, ZARYADKA_SHORT].forEach((plan) => pools.push.apply(pools, plan.exercises));
  pools.push.apply(pools, OFFICE_WARMUP);
  pools.push(CARDIO_FINISHER);
  DAYS.forEach((day) => pools.push.apply(pools, day.exercises));
  const found = pools.filter((item) => item.id === id)[0];
  return Object.assign({}, found || { id: id, name: id, sets: 3, reps: "10", rest: 60, logWeight: false, notes: "" }, patch || {});
}

const GYM_MON = [
  knownMove("bench", { sets: 4, reps: "6–8", rest: 150 }),
  knownMove("inc-db", { sets: 3, reps: "10", rest: 90 }),
  move("gym-ohp-machine", "Жим вверх в тренажёре Life Fitness", 3, "10", 90, "Сидя, спина к спинке, без прогиба в пояснице.", true),
  knownMove("lat-raise", { sets: 4, reps: "12–15", rest: 60 }),
  move("gym-hack", "Гак-присед Primal", 3, "10", 120, "Спина к подушке, колени в сторону носков.", true),
  move("gym-abs", "Пресс в тренажёре Life Fitness", 3, "15", 45, "Поясницу не отрывай. Короче амплитуда, если тянет шею.", true)
];

const GYM_WED = [
  move("gym-gravitron-pull", "Подтягивания в гравитроне", 4, "6–10", 90, "Грудь к перекладине, помощь тренажёра, без рывка.", true),
  knownMove("pulldown", { sets: 3, reps: "10", rest: 90 }),
  knownMove("db-row-sat", { sets: 3, reps: "10", rest: 75, name: "Тяга гантели одной рукой" }),
  knownMove("rear-delt", { sets: 3, reps: "15", rest: 60 }),
  move("gym-biceps-machine", "Бицепс в тренажёре", 3, "12", 60, "Локти на подушке, не откидывайся назад.", true),
  move("gym-gravitron-dip", "Брусья в гравитроне", 3, "10", 75, "Плечи опущены, не проваливайся внизу.", true)
];

const GYM_FRI = [
  knownMove("squat", { sets: 4, reps: "6–8", rest: 150 }),
  knownMove("leg-ext", { sets: 3, reps: "12", rest: 75 }),
  knownMove("db-ohp", { sets: 3, reps: "10", rest: 90 }),
  knownMove("lat-fri", { sets: 3, reps: "15", rest: 60 }),
  move("gym-ropes", "Канаты Synrgy360", 6, "30 сек", 30, "Волны руками, корпус стабильный."),
  move("gym-ellipse", "Эллипс", 1, "10 мин", 0, "Разговорный темп.")
];

const HOME_DB = [
  move("home-db-squat", "Приседания с гантелями", 3, "10", 75, "Гантели у плеч или по бокам. Пятки на полу.", true),
  move("home-db-floor", "Жим гантелей лёжа на полу", 3, "10", 75, "Лопатки на полу, локти около 45°.", true),
  move("home-db-row", "Тяга гантели в наклоне", 3, "10", 60, "Спина ровная, тяни локтем.", true),
  move("home-db-lat", "Махи гантелями в стороны", 3, "12", 45, "Лёгкий вес, локти чуть мягкие.", true),
  move("home-db-plank", "Планка", 2, "30 сек", 30, "Таз не проваливать.")
];

const DESK_NECK = [
  move("desk-neck", "Наклоны и повороты шеи", 1, "6 кругов", 0, "Медленно, без боли. Подбородок не вдавливай."),
  move("desk-shoulders", "Круги плечами и лопатками", 1, "10", 0, "Вверх-назад-вниз, сидя прямо."),
  move("desk-chest-open", "Раскрытие груди у стула", 1, "30 сек", 0, "Кисти на пояснице, грудь вперёд, дыхание спокойное.")
];

const DESK_BACK = [
  move("desk-cat", "Кошка сидя на краю стула", 1, "8", 0, "На выдохе округли спину, на вдохе раскрой грудь."),
  move("desk-hip", "Растяжка сгибателя бедра стоя", 1, "30 сек на сторону", 0, "Таз подкрути, не прогибай поясницу."),
  move("desk-figure4", "Четвёрка сидя", 1, "30 сек на сторону", 0, "Голень на колене, спина длинная.")
];

const DESK_EYES = [
  move("desk-eyes", "Глаза: даль и близко", 1, "10 циклов", 0, "20 секунд вдаль, потом мягко поморгай."),
  move("desk-wrists", "Круги кистями", 1, "10", 0, "Плечи опущены."),
  move("desk-stand", "Встать и пройтись", 1, "2 мин", 0, "До кулера и обратно, без телефона.")
];

const TENNIS_BEFORE = [
  knownMove("band-thu", { sets: 2, reps: "легко", rest: 45 }),
  knownMove("scap-thu", { sets: 2, reps: "8", rest: 30 }),
  move("tennis-arm", "Круги прямой рукой", 1, "8 на сторону", 0, "Разогрей плечо, которым бьёшь."),
  move("tennis-split", "Выпады в сторону", 1, "6 на сторону", 0, "Коротко, без прыжка.")
];

const TENNIS_AFTER = [
  move("tennis-chest", "Растяжка груди у стены", 1, "30 сек на сторону", 0, "После игры, без боли в плече."),
  move("tennis-hip", "Складка к прямой ноге", 1, "30 сек на сторону", 0, "Колено опорной мягкое."),
  move("tennis-breath", "Дыхание лёжа", 1, "2 мин", 0, "Ноги на стуле, вдох в живот.")
];

const SLEEP_HIPS = [
  move("sleep-90", "Перекат 90/90 лёжа", 1, "6 на сторону", 0, "Медленно, перед сном."),
  move("sleep-knee", "Колено к груди", 1, "30 сек на сторону", 0, "Поясница на полу."),
  move("sleep-twist", "Скручивание лёжа", 1, "30 сек на сторону", 0, "Плечи на полу.")
];

const SLEEP_SHOULDERS = [
  move("sleep-door", "Грудь в дверном проёме", 1, "30 сек на сторону", 0, "Мягко, без рывка."),
  move("sleep-thread", "Игольное ушко на кровати", 1, "6 на сторону", 0, "На коленях или стоя на четвереньках на полу."),
  move("sleep-child", "Поза ребёнка", 1, "40 сек", 0, "Лоб к полу.")
];

const SLEEP_BREATH = [
  move("sleep-neck", "Мягкие повороты шеи лёжа", 1, "4 на сторону", 0, "Подушка низкая."),
  move("sleep-box", "Дыхание 4–6", 1, "6 циклов", 0, "Вдох на 4, выдох на 6.")
];

const BLOCK_CATALOG = [
  {
    type: "zaryadka",
    label: "Утренняя зарядка",
    hint: "Дома. Гантели можно.",
    variants: [
      { id: "a", title: "Таз и мобильность", minutes: "12–15 мин", exercises: function () { return ZARYADKA_A.exercises; } },
      { id: "b", title: "Спина и осанка", minutes: "12–15 мин", exercises: function () { return ZARYADKA_B.exercises; } },
      { id: "db", title: "С гантелями дома", minutes: "12–15 мин", exercises: function () { return HOME_DB; } }
    ]
  },
  {
    type: "gym",
    label: "Я в зале",
    hint: "Скамьи, гантели до 40 кг, рама, гак-присед Primal, жимы Life Fitness, Hammer Strength, бабочка, гравитрон, тяга DRAX, бицепс, разгибание ног, пресс, сведение ног, Synrgy360, дорожка, эллипс, велосипед.",
    variants: [
      { id: "mon", title: "Грудь и плечи", minutes: "65–75 мин", exercises: function () { return GYM_MON; } },
      { id: "wed", title: "Спина и руки", minutes: "60–70 мин", exercises: function () { return GYM_WED; } },
      { id: "fri", title: "Ноги и функционал", minutes: "60–70 мин", exercises: function () { return GYM_FRI; } }
    ]
  },
  {
    type: "desk",
    label: "Долго сижу",
    hint: "Без оборудования, 3–7 минут.",
    variants: [
      { id: "neck", title: "Шея и плечи", minutes: "5 мин", exercises: function () { return DESK_NECK; } },
      { id: "back", title: "Спина и бёдра", minutes: "6 мин", exercises: function () { return DESK_BACK; } },
      { id: "eyes", title: "Глаза и кисти", minutes: "3 мин", exercises: function () { return DESK_EYES; } }
    ]
  },
  {
    type: "office",
    label: "Офис",
    hint: "Дорожка, скамья, гантели 8 кг, турник с эспандером.",
    variants: [
      { id: "full", title: "Полный офисный объём", minutes: "35–45 мин", exercises: function () { return DAYS.filter((day) => day.key === 2)[0].exercises; } },
      { id: "bar", title: "Турник и гантели", minutes: "20–25 мин", exercises: function () { return [knownMove("band-pullup"), knownMove("scap-sat"), knownMove("lat-8-tue", { sets: 3 }), knownMove("db-curl-tue", { sets: 3 })]; } },
      { id: "tread", title: "Дорожка и короткая связка", minutes: "15 мин", exercises: function () { return [knownMove("tm-tue", { reps: "8 мин" }), knownMove("lat-8-sat", { sets: 2, reps: "12" }), move("office-plank", "Планка у скамьи", 2, "20 сек", 20, "Руки на скамью, если тяжело.")]; } }
    ]
  },
  {
    type: "tennis",
    label: "Теннис",
    hint: "Разминка до игры и заминка после.",
    variants: [
      { id: "before", title: "До игры", minutes: "12 мин", exercises: function () { return TENNIS_BEFORE; } },
      { id: "after", title: "После игры", minutes: "8 мин", exercises: function () { return TENNIS_AFTER; } }
    ]
  },
  {
    type: "walk",
    label: "Прогулка",
    hint: "Шаги. Кардио-финишер не заменяет прогулку.",
    variants: [
      { id: "steps", title: "10–15 тысяч шагов", minutes: "день", exercises: function () { return [knownMove("walk")]; } },
      { id: "plus", title: "Шаги и финишер", minutes: "день", exercises: function () { return [knownMove("walk"), knownMove("cardio-finisher")]; } }
    ]
  },
  {
    type: "sleep",
    label: "Растяжка перед сном",
    hint: "На полу или на кровати, без оборудования.",
    variants: [
      { id: "hips", title: "Бёдра и поясница", minutes: "6 мин", exercises: function () { return SLEEP_HIPS; } },
      { id: "shoulders", title: "Плечи и грудной отдел", minutes: "5 мин", exercises: function () { return SLEEP_SHOULDERS; } },
      { id: "breath", title: "Шея и дыхание", minutes: "4 мин", exercises: function () { return SLEEP_BREATH; } }
    ]
  }
];

function catalogBlock(type) {
  return BLOCK_CATALOG.filter((item) => item.type === type)[0];
}

function defaultVariant(type, date) {
  const dow = date.getDay();
  if (type === "zaryadka") return (dow === 2 || dow === 4 || dow === 6) ? "b" : "a";
  if (type === "gym") {
    if (dow === 3) return "wed";
    if (dow === 5) return "fri";
    return "mon";
  }
  const block = catalogBlock(type);
  return block.variants[0].id;
}

function variantOf(block) {
  const catalog = catalogBlock(block.type);
  return catalog.variants.filter((item) => item.id === block.variant)[0] || catalog.variants[0];
}

function exercisesForBlock(block) {
  return variantOf(block).exercises();
}

function blockPlanForScope(scope) {
  const id = String(scope || "").replace(/^blk-/, "");
  const iso = typeof ui !== "undefined" ? ui.date : "";
  const blocks = (getState().blocks && getState().blocks[iso]) || [];
  const block = blocks.filter((item) => item.id === id)[0];
  if (!block) return { exercises: [] };
  return { exercises: exercisesForBlock(block) };
}

function blockProgress(iso) {
  const blocks = (getState().blocks && getState().blocks[iso]) || [];
  let done = 0;
  let total = 0;
  blocks.forEach((block) => {
    const stats = completedCount(iso, { exercises: exercisesForBlock(block) }, "blk-" + block.id);
    done += stats.done;
    total += stats.total;
  });
  return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
}

function renderDayComposer(date) {
  const iso = isoDate(date);
  const blocks = (getState().blocks && getState().blocks[iso]) || [];
  const cards = blocks.map((block) => renderDayBlock(iso, block)).join("");
  const add = BLOCK_CATALOG.filter((item) => !blocks.some((block) => block.type === item.type)).map((item) => {
    return `<button type="button" data-add-block="${item.type}">${escapeHtml(item.label)}</button>`;
  }).join("");
  return `
    <p class="section-title">Блоки дня</p>
    ${cards || `<p class="notes">День пока пустой. Добавь утреннюю зарядку — появятся 2–3 готовых варианта. «Я в зале» подставит тренировку под тренажёры.</p>`}
    <div class="add-blocks">${add}</div>`;
}

function renderDayBlock(iso, block) {
  const catalog = catalogBlock(block.type);
  const variant = variantOf(block);
  const exercises = variant.exercises();
  const stats = completedCount(iso, { exercises: exercises }, "blk-" + block.id);
  const chips = catalog.variants.map((item) => {
    const on = item.id === variant.id ? " on" : "";
    return `<button type="button" class="${on}" data-block-variant="${item.id}" data-block-id="${block.id}">${escapeHtml(item.title)}</button>`;
  }).join("");
  return `
    <section class="card day-block" data-block-scope="blk-${block.id}">
      <div class="block-head">
        <div>
          <div class="card-title">${escapeHtml(catalog.label)}</div>
          <h3>${escapeHtml(variant.title)}</h3>
          <p class="notes">${escapeHtml(variant.minutes)} · ${escapeHtml(catalog.hint)}</p>
        </div>
        <button type="button" class="btn ghost" data-remove-block="${block.id}">Убрать</button>
      </div>
      <div class="progress-line">
        <div class="bar"><span style="width:${stats.pct}%"></span></div>
        <b>${stats.done}/${stats.total}</b>
      </div>
      <div class="block-tools">${chips}</div>
      ${exercises.map((ex, index) => renderExercise(iso, "blk-" + block.id, ex, index)).join("")}
    </section>`;
}

function bindDayBlocks() {
  document.querySelectorAll("[data-add-block]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.addBlock;
      const date = parseIso(ui.date);
      const iso = isoDate(date);
      updateState((state) => {
        if (!state.blocks[iso]) state.blocks[iso] = [];
        if (state.blocks[iso].some((item) => item.type === type)) return;
        state.blocks[iso].push({
          id: Math.random().toString(36).slice(2, 8),
          type: type,
          variant: defaultVariant(type, date)
        });
      });
      render({ scroll: "keep" });
    });
  });
  document.querySelectorAll("[data-block-variant]").forEach((button) => {
    button.addEventListener("click", () => {
      const iso = ui.date;
      updateState((state) => {
        const list = state.blocks[iso] || [];
        const block = list.filter((item) => item.id === button.dataset.blockId)[0];
        if (block) block.variant = button.dataset.blockVariant;
      });
      render({ scroll: "keep" });
    });
  });
  document.querySelectorAll("[data-remove-block]").forEach((button) => {
    button.addEventListener("click", () => {
      const iso = ui.date;
      updateState((state) => {
        state.blocks[iso] = (state.blocks[iso] || []).filter((item) => item.id !== button.dataset.removeBlock);
      });
      render({ scroll: "keep" });
    });
  });
}

globalThis.BLOCK_CATALOG = BLOCK_CATALOG;
globalThis.GYM_MON = GYM_MON;
globalThis.GYM_WED = GYM_WED;
globalThis.GYM_FRI = GYM_FRI;
