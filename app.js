const STORAGE_KEY = "boets-v1";
/* Portrait on the splash and the Progress screen. Swap to "img/arseniy-mma-cap.webp" for the cap. */
const HERO_IMAGE = "img/arseniy-mma.webp";
document.documentElement.style.setProperty("--hero-image", 'url("' + HERO_IMAGE + '")');

const VIDEOS = {
  zaryadkaFollow: { id: "umuRFbcJa8A", title: "Суставная гимнастика, 10 минут — Татьяна Метельская" },
  catCow: { id: "g7BCihplOUo", title: "Как правильно делать упражнение кошка-корова" },
  bwSquat: { id: "gml-R27ufas", title: "Как приседать правильно: техника приседаний" },
  pushup: { id: "PiG-gkXvIV8", title: "Отжимания от пола. Правильная техника — Михаил Смалько" },
  plank: { id: "OKp_sdOD8P4", title: "Правильная планка. Техника выполнения" },
  latRaise: { id: "Q3j7XYxrJtk", title: "Махи гантелей в стороны. Техника выполнения" },
  chestStretch: { id: "KvtvlwvXWxA", title: "Как правильно растягивать грудные мышцы — Джефф Кавальер" },
  bench: { id: "cMNEuBHPWtc", title: "Жим штанги лёжа — полная техника выполнения" },
  incDb: { id: "ZixeFw_iHVY", title: "Жим гантелей лёжа на наклонной скамье — Михаил Смалько" },
  ohp: { id: "rLTulc8Gbe8", title: "Жим штанги стоя / армейский жим — Михаил Смалько" },
  pressdown: { id: "nlzM-uW9U1U", title: "Разгибания рук на блоке — Михаил Смалько" },
  squat: { id: "G15a4siwL1w", title: "Приседания со штангой. Правильная техника — Михаил Смалько" },
  legExt: { id: "1n1iyWDb7ds", title: "Разгибание ног в тренажёре — как не угробить колени" },
  bandPullup: { id: "VJWie8iidrQ", title: "Подтягивания с резинкой — как научиться, Алексей Кольцов" },
  negPullup: { id: "8EW49NcKbgI", title: "Негативные подтягивания" },
  frontRaise: { id: "-RvIJ-h5xNE", title: "Махи гантелей перед собой. Техника выполнения" },
  dbCurl: { id: "H_JMAU1NKB8", title: "Сгибание на бицепс с гантелями стоя. Техника" },
  dbBench: { id: "EDEYzHWbn8c", title: "Жим гантелей лёжа. Правильная техника — Михаил Смалько" },
  french: { id: "WOOcjC2y-e4", title: "Французский жим с гантелей стоя и сидя" },
  pulldown: { id: "GTs3xqB_ZgQ", title: "Тяга вертикального блока к груди. Техника" },
  barRow: { id: "D3E6BEuROfM", title: "Тяга штанги в наклоне. Техника выполнения" },
  cableRow: { id: "hUV6XDtNTLU", title: "Тяга горизонтального блока к поясу. Техника" },
  facePull: { id: "0Po47vvj9g4", title: "How To Do Cable Face Pulls — PureGym" },
  rearDelt: { id: "8aidwLVg_IE", title: "Махи гантелями в наклоне на заднюю дельту. Техника" },
  barCurl: { id: "bvwwC2Qt93k", title: "Сгибание рук со штангой стоя: техника и нюансы" },
  hammer: { id: "k6VRiS8AY2o", title: "Молотковые сгибания рук с гантелями. Техника" },
  rdl: { id: "z2SeYAR0NVo", title: "Румынская тяга. Техника выполнения" },
  scapPull: { id: "F9ISpZp-bns", title: "Лопаточные подтягивания" },
  activeHang: { id: "zRJjCXxxoZk", title: "Активный вис на перекладине — техника строгих подтягиваний" },
  mobility: { id: "vN-b5DHzF14", title: "Тренировка на мобильность 10 минут — грудной отдел и таз" },
  dbOhp: { id: "ZOL3i0kxrzo", title: "Жим гантелей сидя — техника выполнения" },
  chestMachine: { id: "QJU4r965EuU", title: "Жим сидя в грудном тренажёре: техника и нюансы" },
  legPress: { id: "yc99T5MwqXM", title: "Жим платформы. Правильная техника — Михаил Смалько" },
  legCurl: { id: "BXXaYSW2Ozw", title: "Сгибание ног лёжа в тренажёре — Михаил Смалько" },
  calf: { id: "mPHkSKKpDvo", title: "Подъём на носки в тренажёре стоя" },
  dbRow: { id: "e3CERNfBCdI", title: "Тяга гантели в наклоне. Техника выполнения" },
  benchDip: { id: "bmWukN0ZCkc", title: "Отжимания от скамьи на трицепс. Правильная техника" }
};

const ZARYADKA_SHORT = {
  id: "zaryadka-short",
  title: "Короткая зарядка",
  place: "Дом",
  duration: "10–15 мин",
  block: "short",
  intro: "Если совсем мало времени: видео суставной гимнастики и короткая связка с гантелями. Техника на YouTube.",
  exercises: [
    { id: "z-follow", name: "Суставная гимнастика", sets: 1, reps: "8–10 мин", rest: 0, logWeight: false, video: "zaryadkaFollow", notes: "Можно просто повторять за видео." },
    { id: "z-cat", name: "Кошка-корова", sets: 1, reps: "8–10", rest: 0, logWeight: false, video: "catCow", notes: "Медленно, дыхание в такт движению. Без боли в шее." },
    { id: "z-squat", name: "Приседания без веса", sets: 2, reps: "12–15", rest: 45, logWeight: false, video: "bwSquat", notes: "Пятки на полу, колени в сторону носков." },
    { id: "z-push", name: "Отжимания", sets: 2, reps: "8–12", rest: 45, logWeight: false, video: "pushup", notes: "Если тяжело — руки на возвышении (стол, диван)." },
    { id: "z-plank", name: "Планка", sets: 2, reps: "20–40 сек", rest: 30, logWeight: false, video: "plank", notes: "Таз не проваливать, смотреть в пол." },
    { id: "z-lat", name: "Махи гантелями в стороны", sets: 2, reps: "12–15", rest: 45, logWeight: true, video: "latRaise", notes: "Лёгкий вес, это активация средних дельт, не отказ." },
    { id: "z-stretch", name: "Растяжка грудных", sets: 1, reps: "30–40 сек на сторону", rest: 0, logWeight: false, video: "chestStretch", notes: "В дверном проёме или у стены. Без боли в плече." }
  ]
};

const ZARYADKA_A = {
  id: "zaryadka-a",
  title: "Зарядка · блок A",
  place: "Дом",
  duration: "12–15 мин",
  block: "a",
  intro: "Пн, ср, пт и вс: таз, мобильность, мужское здоровье. Блок B — во вт, чт и сб.",
  exercises: [
    { id: "z-butterfly", name: "Бабочка с движением коленей", sets: 1, reps: "1–2 мин", rest: 0, logWeight: false, instagram: ["https://www.instagram.com/reel/DfhrI5zM2rP/"], notes: "Спокойная амплитуда, без боли в паху." },
    { id: "z-bridge-kegel", name: "Ягодичный мост с Кегелем", sets: 2, reps: "20", rest: 30, logWeight: false, instagram: ["https://www.instagram.com/reel/DfhrI5zM2rP/"], notes: "Вверху сожми ягодицы и мышцы тазового дна на 2 секунды." },
    { id: "z-legs-apart", name: "Ноги в стороны лёжа", sets: 1, reps: "20", rest: 0, logWeight: false, instagram: ["https://www.instagram.com/reel/DZWsJouJ3bm/"], notes: "Ноги вверх под 90°, разведи на вдохе, сведи на выдохе." },
    { id: "z-butterfly-bridge", name: "Мост «бабочка» с задержкой дыхания", sets: 3, reps: "10–20 сек", rest: 20, logWeight: false, instagram: ["https://www.instagram.com/reel/DZWsJouJ3bm/"], notes: "Удерживай положение и мягко сожми тазовое дно." },
    { id: "z-malasana", name: "Глубокий присед-гирлянда", sets: 1, reps: "2–3 мин", rest: 0, logWeight: false, instagram: ["https://www.instagram.com/reel/DfD_wa4scMI/"], notes: "Маласана с перекатами на четвереньки. Пятки можно подложить." },
    { id: "z-child", name: "Поза ребёнка", sets: 1, reps: "30–60 сек", rest: 0, logWeight: false, instagram: ["https://www.instagram.com/reel/DfhrI5zM2rP/"], notes: "Лоб к полу, дыхание спокойное." }
  ]
};

const ZARYADKA_B = {
  id: "zaryadka-b",
  title: "Зарядка · блок B",
  place: "Дом",
  duration: "12–15 мин",
  block: "b",
  intro: "Вт, чт и сб: спина, плечи, осанка. Блок A — в пн, ср, пт и вс.",
  exercises: [
    { id: "z-rev-plank", name: "Подъём таза из обратной планки", sets: 1, reps: "20", rest: 0, logWeight: false, instagram: ["https://www.instagram.com/reel/De8nFa3qgCa/", "https://www.instagram.com/reel/DfF0PUHsAoF/"], notes: "Подкрути таз в верхней точке. Два ролика — одна и та же идея с разных ракурсов." },
    { id: "z-wide-fold", name: "Наклон с широко расставленными ногами", sets: 1, reps: "60 сек", rest: 0, logWeight: false, instagram: ["https://www.instagram.com/reel/De8nFa3qgCa/"], notes: "Колени мягкие, спина длинная." },
    { id: "z-9090", name: "Перекаты 90/90", sets: 1, reps: "20", rest: 0, logWeight: false, instagram: ["https://www.instagram.com/reel/De8nFa3qgCa/"], notes: "Колени около 90°, перекат без рывка." },
    { id: "z-thoracic", name: "Скручивания грудного отдела на четвереньках", sets: 2, reps: "10 на сторону", rest: 20, logWeight: false, instagram: ["https://www.instagram.com/reel/De8nFa3qgCa/"], notes: "Таз спокойный, вращается грудной отдел." },
    { id: "z-needle", name: "Скольжение рукой «игольное ушко»", sets: 2, reps: "10 на сторону", rest: 20, logWeight: false, instagram: ["https://www.instagram.com/reel/De8nFa3qgCa/"], notes: "Продень руку под корпусом и раскрой грудной отдел на возврате." }
  ]
};

const OFFICE_WARMUP = [
  { id: "hindu-push", name: "Индусские отжимания", sets: 3, reps: "6–10", rest: 60, logWeight: false, instagram: ["https://www.instagram.com/reel/De7Pl9wogKw/"], notes: "Отжимания волной для плеч и груди. Грудь к полу, таз вверх, без провала в пояснице." },
  { id: "chair-flow", name: "Комплекс со стулом", sets: 3, reps: "5 циклов", rest: 60, logWeight: false, instagram: ["https://www.instagram.com/reel/DfVM_J9Kl_t/"], notes: "Пайк-удержание, затем группировка, затем отжимание с ногами на стуле." },
  { id: "handstand-wall", name: "Стойка на руках у стены", sets: 3, reps: "20–30 сек", rest: 45, logWeight: false, unlock: "handstand", instagram: ["https://www.instagram.com/reel/DfboC8uoutH/"], notes: "Вход в стойку у стены. Полная стойка — цель на 3–6 месяцев." }
];

const CARDIO_FINISHER = {
  id: "cardio-finisher",
  name: "Кардио-финишер: упор лёжа — прыжок в присед",
  sets: 5,
  reps: "10",
  rest: 40,
  logWeight: false,
  instagram: ["https://www.instagram.com/reel/De95shmtnJM/"],
  notes: "5×10 = 50 повторов. Это добивка к дню, она не заменяет цель 10–15 тысяч шагов."
};

const DAYS = [
  {
    key: 1, short: "Пн", name: "Понедельник",
    hero: "img/days/day-press-shoulders.webp",
    title: "Жим и плечи",
    place: "Зал", tag: "gym", duration: "65–75 мин",
    focus: "Грудь · плечи · трицепс · квадрицепс",
    intro: "База на грудь и ширину плеч. В первую неделю оставляй 2–3 повтора в запасе. Приседания можно заменить жимом ногами.",
    exercises: [
      { id: "bench", name: "Жим штанги лёжа", sets: 4, reps: "6–8", rest: 150, logWeight: true, video: "bench", notes: "Лопатки сведены, грудь вверх, стопы в пол. Можно заменить жимом в тренажёре." },
      { id: "inc-db", name: "Жим гантелей на наклонной 30°", sets: 3, reps: "8–10", rest: 105, logWeight: true, video: "incDb", notes: "Не стукай гантели вверху, контроль вниз." },
      { id: "ohp", name: "Армейский жим стоя", sets: 4, reps: "6–8", rest: 120, logWeight: true, video: "ohp", notes: "Штанга или гантели. Не прогибай поясницу, пресс в тонусе." },
      { id: "lat-raise", name: "Махи гантелями в стороны", sets: 4, reps: "12–15", rest: 70, logWeight: true, video: "latRaise", notes: "Приоритет. Локти чуть мягкие, не выше линии плеч, медленно вниз." },
      { id: "pressdown", name: "Разгибания на верхнем блоке", sets: 3, reps: "10–12", rest: 60, logWeight: true, video: "pressdown", notes: "Локти прижаты к корпусу, только предплечье работает." },
      { id: "squat", name: "Приседания со штангой", sets: 3, reps: "8–10", rest: 120, logWeight: true, video: "squat", notes: "Альтернатива — жим ногами, если техника приседа ещё не уверенная." },
      { id: "leg-ext", name: "Разгибания ног в тренажёре", sets: 2, reps: "12–15", rest: 60, logWeight: true, video: "legExt", notes: "Без боли в коленях, не щёлкай суставом вверху." }
    ]
  },
  {
    key: 2, short: "Вт", name: "Вторник",
    hero: "img/days/day-pullups.webp",
    title: "Подтягивания и руки",
    place: "Офис", tag: "office", duration: "35–45 мин",
    focus: "Турник · плечи · руки · 8 кг",
    intro: "Сначала индусские отжимания и комплекс со стулом, затем практика подтягиваний и многоповторная работа с гантелями 8 кг. Темп медленный, пауза в пике сокращения.",
    exercises: [
      ...OFFICE_WARMUP,
      { id: "tm-tue", name: "Беговая дорожка, разминка", sets: 1, reps: "5 мин", rest: 0, logWeight: false, notes: "Лёгкий шаг, разогрей плечи круговыми движениями." },
      { id: "band-pullup", name: "Подтягивания с эспандером", sets: 5, reps: "макс (цель 5–8)", rest: 90, logWeight: false, video: "bandPullup", notes: "Резина помогает, грудь к перекладине, без рывка. Оставь 1 повтор в запасе." },
      { id: "neg-pullup", name: "Негативные подтягивания", sets: 3, reps: "3–5", rest: 90, logWeight: false, video: "negPullup", notes: "Подбородок над турником (можно с опоры), спуск 3–5 секунд." },
      { id: "lat-8-tue", name: "Махи в стороны, 8 кг", sets: 4, reps: "15–20", rest: 50, logWeight: true, defaultWeight: "8", video: "latRaise", notes: "Если 20 легко — опускай 3 секунды и держи паузу вверху." },
      { id: "front-raise", name: "Подъём гантелей перед собой", sets: 3, reps: "12–15", rest: 45, logWeight: true, defaultWeight: "8", video: "frontRaise", notes: "Не раскачивайся, поднимай до уровня плеч." },
      { id: "db-curl-tue", name: "Сгибания на бицепс, 8 кг", sets: 4, reps: "15–20", rest: 45, logWeight: true, defaultWeight: "8", video: "dbCurl", notes: "Локти на месте, внизу не расслабляй руки полностью." },
      { id: "db-bench-tue", name: "Жим гантелей лёжа, 8 кг", sets: 3, reps: "15–20", rest: 60, logWeight: true, defaultWeight: "8", video: "dbBench", notes: "Многоповторно, полная амплитуда, лопатки на скамье." },
      { id: "french-tue", name: "Французский жим с гантелью", sets: 3, reps: "12–15", rest: 45, logWeight: true, defaultWeight: "8", video: "french", notes: "Сидя или стоя. Локти смотрят вперёд, не разъезжаются." }
    ]
  },
  {
    key: 3, short: "Ср", name: "Среда",
    hero: "img/days/day-home-mobility.webp",
    title: "Ширина спины",
    place: "Зал", tag: "gym", duration: "65–75 мин",
    focus: "Спина · задние дельты · бицепс · бицепс бедра",
    intro: "День ширины спины. Тяни локтями, не руками. Румынская тяга — аккуратно, спина ровная.",
    exercises: [
      { id: "pulldown", name: "Тяга верхнего блока широким хватом", sets: 4, reps: "8–10", rest: 105, logWeight: true, video: "pulldown", notes: "Можно гравитон или подтягивания с помощью. Тяни к груди, не за голову." },
      { id: "bar-row", name: "Тяга штанги в наклоне", sets: 4, reps: "8–10", rest: 105, logWeight: true, video: "barRow", notes: "Альтернатива — тяга гантели одной рукой. Корпус стабильный." },
      { id: "cable-row", name: "Горизонтальная тяга на блоке", sets: 3, reps: "10–12", rest: 75, logWeight: true, video: "cableRow", notes: "Грудь чуть вперёд, в конце сведи лопатки, не округляй поясницу." },
      { id: "face-pull", name: "Тяга каната к лицу (face pull)", sets: 3, reps: "15–20", rest: 60, logWeight: true, video: "facePull", notes: "Канат на уровне лица или чуть выше. Тяни к переносице, разведи концы, локти высоко. Это не тяга к подбородку." },
      { id: "rear-delt", name: "Разведения в наклоне на задние дельты", sets: 3, reps: "12–15", rest: 60, logWeight: true, video: "rearDelt", notes: "Мезинец чуть выше большого пальца, не срывай вес спиной." },
      { id: "bar-curl", name: "Сгибания штанги на бицепс", sets: 3, reps: "8–12", rest: 75, logWeight: true, video: "barCurl", notes: "Без читинга корпусом. Можно EZ-гриф, если запястьям так комфортнее." },
      { id: "hammer", name: "Молотковые сгибания", sets: 2, reps: "10–12", rest: 60, logWeight: true, video: "hammer", notes: "Нейтральный хват, работают плечо и предплечье." },
      { id: "rdl", name: "Румынская тяга", sets: 3, reps: "8–10", rest: 120, logWeight: true, video: "rdl", notes: "Мягкие колени, гриф близко к ногам, таз назад. Можно с гантелями." }
    ]
  },
  {
    key: 4, short: "Чт", name: "Четверг",
    hero: "img/days/day-tennis.webp",
    title: "Лёгкий день · теннис",
    place: "Офис", tag: "tennis", duration: "20–25 мин",
    focus: "Подтягивания и мобилити",
    intro: "Сегодня теннис — не выжигай руки до игры. Подтягивания не до отказа. В конце короткий кардио-финишер: он не заменяет шаги.",
    exercises: [
      { id: "band-thu", name: "Подтягивания с эспандером", sets: 4, reps: "макс, не в отказ", rest: 90, logWeight: false, video: "bandPullup", notes: "Оставь 2 повтора в запасе. Сегодня восстановление важнее рекорда." },
      { id: "scap-thu", name: "Лопаточные подтягивания", sets: 3, reps: "8–10", rest: 60, logWeight: false, video: "scapPull", notes: "Вис, плечи от ушей, сведи лопатки вниз-назад, локти прямые." },
      { id: "hang-thu", name: "Активный вис на турнике", sets: 3, reps: "20–40 сек", rest: 60, logWeight: false, video: "activeHang", notes: "Плечи опущены, корпус чуть в тонусе. Если хват слабый — короче время." },
      { id: "mob-thu", name: "Мобилити плеч и грудного отдела", sets: 1, reps: "8–10 мин", rest: 0, logWeight: false, video: "mobility", notes: "Повторяй за видео. Без боли, дыхание спокойное." },
      { id: "tm-thu", name: "Дорожка по желанию", sets: 1, reps: "10–15 мин", rest: 0, logWeight: false, notes: "Лёгкий шаг, не гонка. Можно после тенниса." },
      CARDIO_FINISHER
    ]
  },
  {
    key: 5, short: "Пт", name: "Пятница",
    hero: "img/days/day-shoulders-legs.webp",
    title: "Плечи и ноги",
    place: "Зал", tag: "gym", duration: "70–80 мин",
    focus: "Средние дельты · ноги · руки · грудь",
    intro: "Главный день плеч плюс вторые ноги. Если мало времени — убери икры и сократи суперсет до 2 кругов.",
    exercises: [
      { id: "db-ohp", name: "Жим гантелей сидя вверх", sets: 4, reps: "8–10", rest: 120, logWeight: true, video: "dbOhp", notes: "Спинка почти вертикальная. Не выгибай поясницу." },
      { id: "lat-fri", name: "Махи в стороны", sets: 4, reps: "12–15", rest: 60, logWeight: true, video: "latRaise", notes: "В последнем подходе — дроп-сет: до утомления, скинь вес, ещё 8–12." },
      { id: "rear-fri", name: "Махи в наклоне, задние дельты", sets: 3, reps: "12–15", rest: 60, logWeight: true, video: "rearDelt", notes: "Корпус почти параллелен полу, только плечо работает." },
      { id: "chest-mach", name: "Жим в тренажёре на грудь", sets: 3, reps: "10–12", rest: 75, logWeight: true, video: "chestMachine", notes: "Добивка груди. Можно заменить разведениями гантелей." },
      { id: "leg-press", name: "Жим ногами", sets: 3, reps: "8–12", rest: 105, logWeight: true, video: "legPress", notes: "Альтернатива — выпады. Поясницу не отрывай от спинки." },
      { id: "leg-curl", name: "Сгибания ног лёжа", sets: 2, reps: "10–12", rest: 75, logWeight: true, video: "legCurl", notes: "Таз прижат, без рывка внизу." },
      { id: "calf", name: "Подъём на носки стоя", sets: 3, reps: "12–15", rest: 50, logWeight: true, video: "calf", notes: "Пауза вверху, полная растяжка внизу." },
      { id: "ss-curl", name: "Суперсет: сгибания на бицепс", sets: 3, reps: "10–12", rest: 0, logWeight: true, video: "barCurl", superset: "сразу трицепс", notes: "Сделал подход — сразу разгибания на блоке, без паузы." },
      { id: "ss-tri", name: "Суперсет: разгибания на блоке", sets: 3, reps: "10–12", rest: 60, logWeight: true, video: "pressdown", superset: "отдых после пары", notes: "После этого подхода отдых 60 секунд и снова бицепс." }
    ]
  },
  {
    key: 6, short: "Сб", name: "Суббота",
    hero: "img/days/day-pullups.webp",
    title: "Подтягивания и плечи",
    place: "Офис", tag: "office", duration: "35–45 мин",
    focus: "Турник · плечи · руки · 8 кг",
    intro: "Второй офисный объём. Сначала индусские отжимания и стул, затем подтягивания и многоповторка с 8 кг.",
    exercises: [
      ...OFFICE_WARMUP,
      { id: "tm-sat", name: "Беговая дорожка, разминка", sets: 1, reps: "5–8 мин", rest: 0, logWeight: false, notes: "Лёгкий шаг." },
      { id: "band-sat", name: "Подтягивания с эспандером", sets: 5, reps: "макс (цель 5–8)", rest: 90, logWeight: false, video: "bandPullup", notes: "Тот же критерий прогресса: 3 тренировки подряд 5×8 — бери резину тоньше." },
      { id: "scap-sat", name: "Лопаточные подтягивания", sets: 3, reps: "8–10", rest: 60, logWeight: false, video: "scapPull", notes: "Учись включать спину до обычных подтягиваний." },
      { id: "lat-8-sat", name: "Махи в стороны, 8 кг", sets: 4, reps: "15–20", rest: 50, logWeight: true, defaultWeight: "8", video: "latRaise", notes: "Медленный негатив, если вес кажется лёгким." },
      { id: "db-row-sat", name: "Тяга гантели в наклоне, 8 кг", sets: 3, reps: "15–20", rest: 60, logWeight: true, defaultWeight: "8", video: "dbRow", notes: "8 кг легко — пауза вверху, лопатка к позвоночнику, без рывка." },
      { id: "curl-sat", name: "Сгибания на бицепс, 8 кг", sets: 3, reps: "15–20", rest: 45, logWeight: true, defaultWeight: "8", video: "dbCurl" },
      { id: "dip-sat", name: "Отжимания от скамьи на трицепс", sets: 3, reps: "10–15", rest: 60, logWeight: false, video: "benchDip", notes: "Ноги согнуты. Не опускайся слишком глубоко, если есть дискомфорт в плечах." },
      { id: "db-bench-sat", name: "Жим гантелей лёжа, 8 кг", sets: 3, reps: "15–20", rest: 60, logWeight: true, defaultWeight: "8", video: "dbBench" }
    ]
  },
  {
    key: 0, short: "Вс", name: "Воскресенье",
    hero: "img/days/day-sunday-rest-prep.webp",
    title: "Отдых",
    place: "Дом", tag: "rest", duration: "прогулка",
    focus: "Восстановление",
    intro: "Силовых нет. 10–15 тысяч шагов, сон, белок 160–180 г. Кардио-финишер в конце — добавка, не замена прогулке.",
    exercises: [
      { id: "walk", name: "Прогулка 10–15 тысяч шагов", sets: 1, reps: "день", rest: 0, logWeight: false, notes: "Можно разбить на несколько выходов. Это не день дивана." },
      CARDIO_FINISHER
    ]
  }
];

const PULL_LEVELS = [
  { n: 1, title: "Уровень 1 — толстая резина", text: "Подтягивания с самым толстым эспандером, 5×5–8. Цель — чистые повторы, грудь к перекладине." },
  { n: 2, title: "Уровень 2 — резина потоньше", text: "Та же схема 5×5–8, но с более тонкой петлёй." },
  { n: 3, title: "Уровень 3 — негативы + тонкая резина", text: "Негативы по 5 секунд, 4×4–6, плюс рабочие подходы с тонким эспандером." },
  { n: 4, title: "Уровень 4 — смешанные", text: "2–3 своих подтягивания, остальное добираешь с резиной до 5–8 в подходе." },
  { n: 5, title: "Уровень 5 — свои", text: "5 чистых подтягиваний без резины. Дальше расти до 8–10, потом добавляй вес." }
];

const WEEK_RULES = [
  { n: 1, title: "Неделя 1 — знакомство", text: "Учи технику, веса комфортные. В каждом подходе оставляй 2–3 повтора в запасе (RIR 2–3). Не гонись за рекордом." },
  { n: 2, title: "Неделя 2 — рабочие веса", text: "Где техника стабильная, добавь 2.5–5 кг. Запас 1–2 повтора. Записывай вес в приложении." },
  { n: 3, title: "Неделя 3 — пик", text: "Последние подходы изоляции ближе к отказу. База (жим, тяги, присед, жим стоя) — всё ещё с запасом около 1 повтора." },
  { n: 4, title: "Неделя 4 — разгрузка", text: "Убери по одному подходу в каждом упражнении (объём примерно −30%). Веса те же или чуть легче. Восстановление, потом новый цикл чуть выше недель 2–3." }
];

/* ------------ state ------------ */
function todayDate() {
  const d = new Date();
  return isoDate(d);
}
function isoDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function parseIso(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function startOfWeek(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = x.getDay(); // 0 sun
  const diff = dow === 0 ? -6 : 1 - dow;
  x.setDate(x.getDate() + diff);
  return x;
}
function addDays(d, n) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + n);
  return x;
}
function ruDate(d) {
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}
function ruDateShort(d) {
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}
function weekdayOf(d) {
  return d.getDay(); // 0 sun ... matches DAYS[].key
}
function dayPlan(d) {
  const key = weekdayOf(d);
  return DAYS.find((x) => x.key === key);
}
function zaryadkaAuto(date) {
  const dow = date.getDay();
  if (dow === 2 || dow === 4 || dow === 6) return ZARYADKA_B;
  return ZARYADKA_A;
}
function zaryadkaDisplayed(date) {
  if (ui.zBlock === "a") return ZARYADKA_A;
  if (ui.zBlock === "b") return ZARYADKA_B;
  if (ui.zBlock === "short") return ZARYADKA_SHORT;
  return zaryadkaAuto(date);
}
function isExerciseUnlocked(ex, state) {
  if (!ex || ex.unlock !== "handstand") return true;
  return !!(state && (state.handstandUnlocked || state.cycleWeek >= 4));
}
function planExercises(plan) {
  const state = getState();
  return plan.exercises.filter((ex) => isExerciseUnlocked(ex, state));
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveState(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}
function getState() {
  const s = loadState();
  if (!s.days) s.days = {};
  if (!s.lastWeights) s.lastWeights = {};
  if (!s.cycleWeek) s.cycleWeek = 1;
  if (!s.pullLevel) s.pullLevel = 1;
  if (!s.steps) s.steps = {};
  if (!s.shopping) s.shopping = {};
  if (!s.blocks) s.blocks = {};
  return s;
}
function updateState(mut) {
  const s = getState();
  mut(s);
  saveState(s);
  return s;
}

function dayLog(dateStr, scope) {
  const s = getState();
  if (!s.days[dateStr]) s.days[dateStr] = { workout: {}, zaryadka: {} };
  if (!s.days[dateStr][scope]) s.days[dateStr][scope] = {};
  return s.days[dateStr][scope];
}

function exLog(dateStr, scope, exId) {
  const scopeLog = dayLog(dateStr, scope);
  if (!scopeLog[exId]) scopeLog[exId] = { weight: "", sets: [] };
  return scopeLog[exId];
}

function completedCount(dateStr, plan, scope) {
  const log = dayLog(dateStr, scope);
  let done = 0, total = 0;
  planExercises(plan).forEach((ex) => {
    total += ex.sets;
    const st = (log[ex.id] && log[ex.id].sets) || [];
    done += st.filter(Boolean).length;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}
function bestZaryadkaStats(date) {
  const iso = isoDate(date);
  const plans = [zaryadkaAuto(date), ZARYADKA_A, ZARYADKA_B, ZARYADKA_SHORT];
  let best = completedCount(iso, plans[0], "zaryadka");
  plans.forEach((plan) => {
    const stats = completedCount(iso, plan, "zaryadka");
    if (stats.done > best.done) best = stats;
  });
  return best;
}

/* ------------ timer ------------ */
let timer = { endsAt: 0, total: 0, running: false, label: "", interval: null, done: false };

function formatSec(s) {
  s = Math.max(0, Math.ceil(s));
  const m = Math.floor(s / 60);
  const r = String(s % 60).padStart(2, "0");
  return `${m}:${r}`;
}
function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    o.start();
    o.stop(ctx.currentTime + 0.55);
  } catch (e) {}
  if (navigator.vibrate) navigator.vibrate([180, 80, 180, 80, 240]);
}
function startTimer(sec, label) {
  timer.total = sec;
  timer.endsAt = Date.now() + sec * 1000;
  timer.running = true;
  timer.done = false;
  timer.label = label || "Отдых";
  if (timer.interval) clearInterval(timer.interval);
  timer.interval = setInterval(tickTimer, 200);
  renderTimer();
}
function stopTimer() {
  timer.running = false;
  timer.done = false;
  timer.endsAt = 0;
  if (timer.interval) clearInterval(timer.interval);
  renderTimer();
}
function tickTimer() {
  if (!timer.running) return;
  if (Date.now() >= timer.endsAt) {
    timer.running = false;
    timer.done = true;
    clearInterval(timer.interval);
    beep();
  }
  renderTimer();
}
function renderTimer() {
  const root = document.getElementById("timer-root");
  if (!timer.running && !timer.done) {
    root.innerHTML = "";
    return;
  }
  const left = timer.running ? Math.max(0, (timer.endsAt - Date.now()) / 1000) : 0;
  const pct = timer.total ? Math.max(0, Math.min(1, left / timer.total)) : 0;
  const radius = 86;
  const circ = 2 * Math.PI * radius;
  const dash = (circ * pct).toFixed(1);
  const urgent = timer.running && left <= 5 && left > 0;
  root.innerHTML = `
    <div class="ring-timer emo${timer.done ? " done" : ""}${urgent ? " urgent" : ""}">
      <div class="emo-bg" aria-hidden="true"></div>
      <div class="ring-wrap">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle class="ring-bg" cx="100" cy="100" r="${radius}"></circle>
          <circle class="ring-fg" cx="100" cy="100" r="${radius}" stroke-dasharray="${dash} ${circ.toFixed(1)}"></circle>
        </svg>
        <div class="ring-time">${timer.done ? "0:00" : formatSec(left)}</div>
      </div>
      <div class="ring-label">${timer.done ? "Отдых закончен" : escapeHtml(timer.label || "Отдых")}</div>
      <div class="ring-actions">
        <button type="button" data-timer="-15">−15</button>
        <button type="button" class="primary" data-timer="skip">${timer.done ? "Дальше" : "Пропустить"}</button>
        <button type="button" data-timer="15">+15</button>
      </div>
    </div>`;
  root.querySelectorAll("[data-timer]").forEach((button) => {
    button.addEventListener("click", () => {
      const act = button.dataset.timer;
      if (act === "skip") stopTimer();
      else if (timer.running) {
        const delta = Number(act) * 1000;
        timer.endsAt += delta;
        timer.total = Math.max(1, timer.total + Number(act));
        renderTimer();
      }
    });
  });
}

/* ------------ render ------------ */
const ui = {
  tab: "today",
  date: todayDate(),
  installEvent: null,
  hideInstall: false,
  zBlock: "auto",
  foodView: "today",
  recipeId: null,
  menuDayIndex: null,
  panel: null,
  exId: null,
  showList: false,
  activity: {
    loading: false,
    error: "",
    availability: "",
    permissions: null,
    days: null,
    sessions: null,
    editDate: null
  }
};

function setTab(tab) {
  ui.tab = tab;
  ui.panel = null;
  render({ scroll: "top" });
  if ((tab === "today" || tab === "progress") && typeof refreshActivity === "function") refreshActivity();
}

function refreshProgress() {
  const { iso, plan, scope } = currentPlanAndScope();
  const stats = completedCount(iso, plan, scope);
  const bar = document.querySelector(".hero .bar > span");
  const label = document.querySelector(".progress-line b");
  if (bar) bar.style.width = stats.pct + "%";
  if (label) label.textContent = stats.done + "/" + stats.total + " подходов";
}

function render(opts) {
  opts = opts || {};
  const y = window.scrollY;
  const app = document.getElementById("app");
  const d = parseIso(ui.date);
  const plan = dayPlan(d);
  const s = getState();
  const immersive = ui.panel === "done" || ui.panel === "record" || (!ui.panel && ui.tab === "progress");
  app.innerHTML = `
    ${immersive ? "" : renderHeader(d, s)}
    ${ui.panel === "warmup" ? renderZaryadka(d) : ""}
    ${ui.panel === "exercise" ? renderExerciseFocus(d, plan) : ""}
    ${ui.panel === "done" ? renderDone(d, plan) : ""}
    ${ui.panel === "record" ? renderRecord() : ""}
    ${!ui.panel && ui.tab === "today" ? renderTodayHome(d, plan) : ""}
    ${!ui.panel && ui.tab === "week" ? renderWeek(d) : ""}
    ${!ui.panel && ui.tab === "guide" ? renderGuide(s) : ""}
    ${!ui.panel && ui.tab === "progress" ? renderProgress(d, s) : ""}
    ${!ui.panel && ui.tab === "food" && typeof renderFood === "function" ? renderFood() : ""}
  `;
  bind(d, plan);
  renderNav();
  renderTimer();
  if (opts.scroll === "top") window.scrollTo(0, 0);
  else if (opts.scroll === "keep") window.scrollTo(0, y);
}

function screenTitle() {
  if (ui.panel === "warmup") return "Зарядка";
  if (ui.panel === "exercise") return "Упражнение";
  return { today: "Сегодня", week: "Неделя", food: "Питание", progress: "Прогресс", guide: "План" }[ui.tab] || "Сегодня";
}
function renderHeader(d, s) {
  const rule = WEEK_RULES[s.cycleWeek - 1];
  const shown = ui.tab === "food" ? parseIso(todayDate()) : d;
  const food = ui.tab === "food";
  const foodDay = food && globalThis.FOOD ? FOOD.menu.days[menuIndexFromDate(shown)] : null;
  return `
    <header class="top${food ? " food-hero" : ""}">
      ${food ? `<div class="emo-img" aria-hidden="true"></div>` : ""}
      <img class="brand-logo" src="brand/logo-horizontal-tight.svg" alt="АРСДРОЙД — ЯРОСТЬ" height="20">
      <h1 class="h1">${screenTitle()}</h1>
      <div class="kicker">${shown.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}${foodDay ? " · " + escapeHtml(foodDay.type) : ""} · цикл ${s.cycleWeek}/4</div>
      <div class="sub">${food ? "Белок 160–180 г каждый день" : (rule ? rule.title : "")}</div>
    </header>`;
}

function renderInstall() {
  if ((typeof isNativeApp === "function" && isNativeApp()) || ui.hideInstall || window.matchMedia("(display-mode: standalone)").matches) return "";
  const canPrompt = !!ui.installEvent;
  return `
    <div class="install" id="install-box">
      <div>
        <p><b>Поставь на рабочий стол.</b> В Chrome: меню ⋮ → «Установить приложение» или «Добавить на главный экран». Откроется как обычное приложение, без адресной строки.</p>
        <div class="row">
          ${canPrompt ? `<button class="btn" type="button" id="btn-install">Установить</button>` : ""}
          <button class="btn ghost" type="button" id="btn-install-hide">Скрыть</button>
        </div>
      </div>
    </div>`;
}

function renderWeekStrip(selected) {
  const mon = startOfWeek(selected);
  const today = todayDate();
  const cells = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays(mon, i);
    const iso = isoDate(d);
    const plan = dayPlan(d);
    const stats = completedCount(iso, plan, "workout");
    const cls = [
      "dow",
      iso === isoDate(selected) ? "is-active" : "",
      iso === today ? "is-today" : "",
      stats.done > 0 && stats.done >= stats.total ? "is-done" : ""
    ].join(" ");
    cells.push(`<button type="button" class="${cls}" data-date="${iso}" style="--tag:${tagColor(plan.tag)}"><span class="d">${plan.short}</span><span class="n">${d.getDate()}</span><span class="tick"></span></button>`);
  }
  return `<div class="week-strip">${cells.join("")}</div>`;
}

function pillClass(tag) {
  if (tag === "office") return "office";
  if (tag === "tennis") return "tennis";
  if (tag === "rest") return "rest";
  if (tag === "home") return "home";
  return "";
}

const PLACES = {
  home: { type: "Дома утром", location: "Радужная", pill: "home" },
  rest: { type: "Дом", location: "Радужная", pill: "rest" },
  office: { type: "Офис", location: "Оболдино", pill: "office" },
  gym: { type: "Фитнес утром", location: "Варежки", pill: "" },
  tennis: { type: "Теннис", location: "Игра в зале", pill: "tennis" }
};
function placeMeta(plan) {
  if (plan && (plan.block || plan.id === "zaryadka-a" || plan.id === "zaryadka-b" || plan.id === "zaryadka-short")) return PLACES.home;
  if (plan && plan.tag === "rest") return PLACES.rest;
  if (plan && PLACES[plan.tag]) return PLACES[plan.tag];
  return { type: (plan && plan.place) || "", location: "", pill: "home" };
}
function nextOpen(iso, plan, scope) {
  const state = getState();
  const exercises = planExercises(plan);
  for (let n = 0; n < exercises.length; n++) {
    const ex = exercises[n];
    const sets = (state.days[iso] && state.days[iso][scope] && state.days[iso][scope][ex.id] && state.days[iso][scope][ex.id].sets) || [];
    for (let i = 0; i < ex.sets; i++) if (!sets[i]) return { ex: ex, index: i, number: plan.exercises.indexOf(ex) + 1 };
  }
  return null;
}
function stepsOn(iso) {
  if (typeof isNativeApp === "function" && isNativeApp() && ui.activity && ui.activity.days && ui.activity.days.length) {
    const row = ui.activity.days.filter((item) => item.date === iso)[0];
    if (row) return Math.max(0, Math.round(Number(row.steps) || 0));
  }
  const saved = getState().steps || {};
  return Math.max(0, Math.round(Number(saved[iso]) || 0));
}
function renderTodayHome(d, plan) {
  const iso = isoDate(d);
  const stats = typeof blockProgress === "function" ? blockProgress(iso) : completedCount(iso, plan, "workout");
  const info = placeMeta(plan);
  const steps = stepsOn(iso);
  const goal = typeof goalStatus === "function" ? goalStatus(steps, d) : { steps: steps, state: "below", goalLow: 10000, goalHigh: 10000, sunday: false };
  const manual = !(typeof isNativeApp === "function" && isNativeApp() && ui.activity && ui.activity.days && ui.activity.days.length);
  const foodCard = renderFoodTeaser(d);
  return `
    ${renderInstall()}
    ${renderWeekStrip(d)}
    <section class="hero emo" style="--tag:${tagColor(plan.tag)}">
      <img class="day-hero" src="${plan.hero || HERO_IMAGE}" alt="" onerror="if(this.dataset.fb)return;this.dataset.fb='1';this.src='${HERO_IMAGE}'">
      <div class="place-row">
        <span class="pill ${info.pill}">${escapeHtml(info.type)}</span>
        ${info.location ? `<span class="loc" data-field="day.location">${icon("map-pin")} ${escapeHtml(info.location)}</span>` : ""}
      </div>
      <h2>${escapeHtml(plan.name)}</h2>
      <p>Собери день из блоков: зарядка, зал, стол, офис, теннис, шаги или растяжка.</p>
      <div class="progress-line">
        <div class="bar"><span style="width:${stats.pct}%"></span></div>
        <b>${stats.done}/${stats.total}</b>
        <small>подходов</small>
      </div>
    </section>
    <div class="dash-grid" style="grid-template-columns:1fr">
      <div class="mini-card">
        <div class="card-title">${icon("footprints")} Шаги</div>
        <strong>${formatSteps(steps)}</strong>
        <div class="goal-track"><div class="goal-fill${goal.state === "below" ? "" : " is-met"}" style="width:${Math.min(100, Math.round((steps / Math.max(goal.goalHigh, steps, 1)) * 100))}%"></div></div>
        <span>${goal.sunday ? "из " + formatSteps(goal.goalLow) + "–" + formatSteps(goal.goalHigh) : "из " + formatSteps(goal.goalLow)}</span>
        ${manual ? `<form class="steps-form" id="steps-form" data-steps-for="${iso}"><input id="steps-input" type="number" inputmode="numeric" min="0" max="200000" step="1" value="${steps || ""}" aria-label="Шаги"><button class="btn" type="submit">Ок</button></form>` : `<span class="loc">${icon("heart-pulse")} Health Connect</span>`}
      </div>
    </div>
    ${foodCard}
    ${typeof renderDayComposer === "function" ? renderDayComposer(d) : ""}`;
}
function renderFoodTeaser(date) {
  if (!globalThis.FOOD || !FOOD.menu) return "";
  const shown = date || parseIso(todayDate());
  const day = FOOD.menu.days[menuIndexFromDate(shown)];
  if (!day) return "";
  const kcalRange = typeof parseRange === "function" ? parseRange(day.target_kcal) : null;
  const remainder = typeof carbRemainder === "function" ? carbRemainder(kcalRange, day.totals.protein, day.totals.fat) : null;
  const isToday = isoDate(shown) === todayDate();
  const title = isToday ? "Питание сегодня" : "Питание · " + shown.toLocaleDateString("ru-RU", { weekday: "short" });
  return `
    <button type="button" class="card" data-open-food style="width:100%;text-align:left;color:inherit">
      <div class="card-title">${icon("utensils")} ${escapeHtml(title)}</div>
      <div class="kcal-hero">${formatMacro(day.totals.kcal)}<small>ккал</small></div>
      <p class="food-target">цель ${escapeHtml(day.target_kcal)}</p>
      <p class="kbju"><span class="p">Б ${formatMacro(day.totals.protein)}</span> <span class="f">Ж ${formatMacro(day.totals.fat)}</span> <span class="c">У ${formatMacro(day.totals.carbs)}</span>${remainder != null ? ` · остаток ${formatMacro(remainder)} г` : ""}</p>
    </button>`;
}
function renderDone(d, plan) {
  const iso = isoDate(d);
  const stats = completedCount(iso, plan, "workout");
  const info = placeMeta(plan);
  return `
    <section class="scene done">
      <img class="brand-logo" src="brand/logo-horizontal-tight.svg" alt="АРСДРОЙД — ЯРОСТЬ">
      <div class="es-img" aria-hidden="true"></div>
      <div class="es-shade" aria-hidden="true"></div>
      <div class="es-bottom">
        <p class="kicker">${escapeHtml(plan.title)} · ${escapeHtml(info.location)}</p>
        <h2 class="h2">Тренировка завершена</h2>
        <p>Отдыхай. Белок 160–180 г за день.</p>
        <div class="wstat">
          <div><b>${stats.done}/${stats.total}</b><span>подходов</span></div>
          <div><b>${escapeHtml(plan.duration)}</b><span>по плану</span></div>
        </div>
        <button class="btn primary" type="button" data-log-weight>${icon("scale")} Записать вес</button>
        <button class="linkish" type="button" data-back>На главную</button>
      </div>
    </section>`;
}
function renderRecord() {
  const rec = ui.record || {};
  const shareText = rec.name ? rec.name + ": " + rec.weight + " кг, было " + rec.prev + " кг" : "";
  return `
    <section class="scene record">
      <img class="brand-logo" src="brand/logo-horizontal-tight.svg" alt="АРСДРОЙД — ЯРОСТЬ">
      <div class="es-img" aria-hidden="true"></div>
      <div class="es-shade" aria-hidden="true"></div>
      <div class="es-bottom">
        <p class="kicker">Новый рекорд</p>
        <h2 class="h2">${escapeHtml(rec.name || "")}</h2>
        <p>${escapeHtml(rec.note || "Рабочий вес выше прошлой отметки.")}</p>
        <div class="wstat">
          <div><b>${escapeHtml(rec.weight || "")}</b><span>кг</span></div>
          <div><b>${escapeHtml(rec.prev || "")}</b><span>было, кг</span></div>
        </div>
        <button class="btn primary" type="button" data-record-next>Дальше</button>
        ${shareText ? `<button class="linkish" type="button" data-share="${escapeAttr(shareText)}">Поделиться</button>` : ""}
      </div>
    </section>`;
}
function maybeFinishDay(iso, plan, scope) {
  if (scope !== "workout") return;
  const stats = completedCount(iso, plan, "workout");
  if (stats.total && stats.done >= stats.total) ui.panel = "done";
}
function renderExerciseFocus(d, plan) {
  const iso = isoDate(d);
  const ex = plan.exercises.filter((item) => item.id === ui.exId)[0] || plan.exercises[0];
  if (!ex) return "";
  const idx = plan.exercises.indexOf(ex);
  return `
    <button type="button" class="back-btn" data-back aria-label="Назад">${icon("chevron-right")}</button>
    <p class="kicker">${escapeHtml(plan.title)} · ${String(idx + 1).padStart(2, "0")} / ${String(plan.exercises.length).padStart(2, "0")}</p>
    <h2 class="h2">${escapeHtml(ex.name)}</h2>
    ${renderExercise(iso, "workout", ex, idx)}`;
}
function renderProgress(d, s) {
  const weights = s.bodyWeight || {};
  const iso = todayDate();
  const todayWeight = weights[iso];
  const nums = Object.keys(weights).sort().map((key) => ({ date: key, kg: Number(weights[key]) })).filter((row) => Number.isFinite(row.kg));
  const last = nums.length ? nums[nums.length - 1].kg : null;
  const delta = last != null ? Math.round((last - 100) * 10) / 10 : null;
  const rows = typeof chartRows === "function" ? chartRows() : [];
  return `
    <section class="goal-hero">
      <img class="hero-photo" src="${HERO_IMAGE}" alt="">
      <img class="brand-logo" src="brand/logo-horizontal-tight.svg" alt="АРСДРОЙД — ЯРОСТЬ">
      <h1 class="h1">Прогресс</h1>
      <div class="gh-text">
        <div class="kicker">Цель</div>
        <div class="gh-goal">90<small>кг</small></div>
        <p>Широкие плечи, руки, торс. Старт программы — 100 кг.</p>
      </div>
    </section>
    <section class="card">
      <div class="card-title">${icon("scale")} Вес</div>
      <div class="kcal-hero">${todayWeight ? escapeHtml(String(todayWeight).replace(".", ",")) : "—" }<small>кг</small></div>
      <p>${delta == null ? "Запишите вес — график строится только по вашим отметкам." : "От старта 100 кг: " + (delta > 0 ? "+" : "") + String(delta).replace(".", ",") + " кг"}</p>
      <form class="steps-form" id="weight-form">
        <input id="weight-input" type="number" inputmode="decimal" min="40" max="200" step="0.1" value="${todayWeight || ""}" aria-label="Вес сегодня, кг">
        <button class="btn primary" type="submit" style="width:auto">${icon("scale")} Записать</button>
      </form>
      ${nums.length ? `<div class="chart" style="margin-top:12px">${nums.slice(-7).map((row) => {
        const max = Math.max(...nums.map((item) => item.kg), 100);
        const min = Math.min(...nums.map((item) => item.kg), 90);
        const h = Math.max(8, Math.round(((row.kg - min) / Math.max(max - min, 1)) * 100));
        return `<div class="bar-col"><span class="bar-val">${String(row.kg).replace(".", ",")}</span><span class="bar-track"><span class="bar-fill" style="height:${h}%"></span></span><span class="bar-dow">${row.date.slice(8)}</span></div>`;
      }).join("")}</div>` : ""}
    </section>
    <p class="section-title">${icon("footprints")} Шаги · 7 дней</p>
    ${typeof renderStepsChart === "function" ? renderStepsChart(rows) : ""}
    <section class="guide-card">
      <h3>Неделя цикла</h3>
      <div class="cycle">${WEEK_RULES.map((w) => `<button type="button" class="${s.cycleWeek === w.n ? "on" : ""}" data-cycle="${w.n}">${w.n}</button>`).join("")}</div>
      <p class="notes">${WEEK_RULES[s.cycleWeek - 1].text}</p>
    </section>
    <section class="guide-card">
      <h3>Подтягивания</h3>
      <div class="levels">${PULL_LEVELS.map((lv) => `<button type="button" class="level${s.pullLevel === lv.n ? " on" : ""}" data-level="${lv.n}"><b>${escapeHtml(lv.title)}</b><small>${escapeHtml(lv.text)}</small></button>`).join("")}</div>
    </section>`;
}
function renderDay(d, plan, scope) {
  const iso = isoDate(d);
  const stats = completedCount(iso, plan, scope);
  return `
    <section class="hero" style="--tag:${tagColor(plan.tag)}">
      <div class="place-row">
        <span class="pill ${pillClass(plan.tag)}">${plan.place}</span>
        <span class="meta">${plan.duration}</span>
        <span class="meta">${plan.focus}</span>
      </div>
      <h2>${plan.title}</h2>
      <p>${plan.intro}</p>
      ${healthNote(iso, "workout")}
      <div class="progress-line">
        <div class="bar"><span style="width:${stats.pct}%"></span></div>
        <b>${stats.done}/${stats.total} подходов</b>
      </div>
    </section>
    ${plan.exercises.map((ex, i) => renderExercise(iso, scope, ex, i)).join("")}
    <div class="day-actions">
      <button class="btn" type="button" data-act="complete-all">Отметить всё</button>
      <button class="btn ghost" type="button" data-act="reset-day">Сбросить день</button>
    </div>
  `;
}

function tagColor(tag) {
  return { gym: "var(--gym)", office: "var(--office)", tennis: "var(--tennis)", rest: "var(--rest)", home: "var(--text)" }[tag] || "var(--accent)";
}

function healthNote(iso, scope) {
  const day = getState().days[iso];
  if (!day) return "";
  if (scope === "workout" && day.workoutHealth) {
    return `<p class="health-note">${escapeHtml(healthReasonText(day.workoutHealthReason))}</p>`;
  }
  if (scope === "zaryadka" && day.zaryadkaHealth) {
    return `<p class="health-note">Зарядка отмечена по сессии мобилити в Health Connect.</p>`;
  }
  return "";
}
function zaryadkaSwitch(plan) {
  const items = [
    { id: "auto", label: "Сегодня" },
    { id: "a", label: "Блок A" },
    { id: "b", label: "Блок B" },
    { id: "short", label: "Коротко" }
  ];
  return `<div class="subnav">${items.map((item) => {
    const on = (ui.zBlock || "auto") === item.id;
    return `<button type="button" data-zblock="${item.id}" class="${on ? "on" : ""}">${item.label}</button>`;
  }).join("")}</div>`;
}
function renderZaryadka(d) {
  const plan = zaryadkaDisplayed(d);
  const iso = isoDate(d);
  const stats = completedCount(iso, plan, "zaryadka");
  return `
    ${zaryadkaSwitch(plan)}
    <section class="hero" style="--tag:var(--text)">
      <div class="place-row">
        <span class="pill home">Дом</span>
        <span class="meta">${plan.duration}</span>
        <span class="meta">${plan.block === "short" ? "YouTube" : "блок " + plan.block.toUpperCase()}</span>
      </div>
      <h2>${plan.title}</h2>
      <p>${plan.intro}</p>
      ${healthNote(iso, "zaryadka")}
      <div class="progress-line">
        <div class="bar"><span style="width:${stats.pct}%"></span></div>
        <b>${stats.done}/${stats.total} подходов</b>
      </div>
    </section>
    ${plan.exercises.map((ex, i) => renderExercise(iso, "zaryadka", ex, i)).join("")}
    <div class="day-actions">
      <button class="btn" type="button" data-act="complete-all">Отметить всё</button>
      <button class="btn ghost" type="button" data-act="reset-day">Сбросить</button>
    </div>
  `;
}

const EX_ANIM = {
  "z-cat": "cat-stretch.mp4",
  "z-squat": "bw-squat.mp4",
  "z-push": "pushup.mp4",
  "z-plank": "plank.mp4",
  "z-lat": "side-lateral.mp4",
  "z-stretch": "chest-stretch.mp4",
  "z-butterfly": "z-butterfly.mp4",
  "z-bridge-kegel": "z-bridge-kegel.mp4",
  "z-legs-apart": "z-legs-apart.mp4",
  "z-butterfly-bridge": "z-butterfly-bridge.mp4",
  "z-malasana": "z-malasana.mp4",
  "z-child": "z-child.mp4",
  "z-rev-plank": "z-rev-plank.mp4",
  "z-wide-fold": "z-wide-fold.mp4",
  "z-9090": "z-9090.mp4",
  "z-thoracic": "z-thoracic.mp4",
  "z-needle": "z-needle.mp4",
  "hindu-push": "hindu-push.mp4",
  "chair-flow": "chair-flow.mp4",
  "handstand-wall": "handstand-wall.mp4",
  "cardio-finisher": "cardio-finisher.mp4",
  "bench": "bench.mp4",
  "inc-db": "incline-db.mp4",
  "ohp": "ohp.mp4",
  "lat-raise": "side-lateral.mp4",
  "pressdown": "tricep-pushdown.mp4",
  "squat": "barbell-squat.mp4",
  "leg-ext": "leg-ext.mp4",
  "tm-tue": "treadmill.mp4",
  "band-pullup": "band-pullup.mp4",
  "neg-pullup": "pullup.mp4",
  "lat-8-tue": "side-lateral.mp4",
  "front-raise": "front-raise.mp4",
  "db-curl-tue": "db-curl.mp4",
  "db-bench-tue": "db-bench.mp4",
  "french-tue": "french.mp4",
  "pulldown": "pulldown.mp4",
  "bar-row": "bar-row.mp4",
  "cable-row": "cable-row.mp4",
  "face-pull": "face-pull.mp4",
  "rear-delt": "rear-delt.mp4",
  "bar-curl": "bar-curl.mp4",
  "hammer": "hammer.mp4",
  "rdl": "rdl.mp4",
  "band-thu": "band-pullup.mp4",
  "scap-thu": "scap-pull.mp4",
  "hang-thu": "hang.mp4",
  "tm-thu": "treadmill.mp4",
  "db-ohp": "db-ohp.mp4",
  "lat-fri": "side-lateral.mp4",
  "rear-fri": "rear-delt.mp4",
  "chest-mach": "chest-machine.mp4",
  "leg-press": "leg-press.mp4",
  "leg-curl": "leg-curl.mp4",
  "calf": "calf.mp4",
  "ss-curl": "bar-curl.mp4",
  "ss-tri": "tricep-pushdown.mp4",
  "tm-sat": "treadmill.mp4",
  "band-sat": "band-pullup.mp4",
  "scap-sat": "scap-pull.mp4",
  "lat-8-sat": "side-lateral.mp4",
  "db-row-sat": "db-row.mp4",
  "curl-sat": "db-curl.mp4",
  "dip-sat": "bench-dip.mp4",
  "db-bench-sat": "db-bench.mp4",
  "walk": "walk.mp4",
};

function renderAnim(ex) {
  const file = EX_ANIM[ex.id];
  if (!file) return `<div class="ex-anim ph" aria-hidden="true"><span>${escapeHtml(ex.name)}</span></div>`;
  const src = "img/ex/" + file;
  if (file.endsWith(".mp4")) {
    const poster = src.replace(/\.mp4$/, ".jpg");
    return `<video class="ex-anim" autoplay muted loop playsinline preload="metadata" poster="${escapeAttr(poster)}" data-src="${escapeAttr(src)}" data-ex-anim></video>`;
  }
  return `<img class="ex-anim still" alt="" data-src="${escapeAttr(src)}" data-ex-anim>`;
}

function renderInstagramLinks(ex) {
  const links = [...new Set(ex.instagram || [])];
  if (!links.length) return "";
  return `<div class="ig-links">${links.map((url) => `<a class="ig-btn" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">Смотреть в Instagram</a>`).join("")}</div>`;
}
function renderExercise(iso, scope, ex, idx) {
  const s = getState();
  if (!isExerciseUnlocked(ex, s)) {
    return `
      <article class="ex locked">
        <div class="ex-top">
          <div class="ex-num">${String(idx + 1).padStart(2, "0")}</div>
          <div style="flex:1;min-width:0">
            <div class="superset-flag">С 4-й недели</div>
            <h3>${escapeHtml(ex.name)}</h3>
            ${renderAnim(ex)}
            <p class="notes">${escapeHtml(ex.notes || "")} Откроется, когда в «Плане» отмечена 4-я неделя, и останется в следующем цикле.</p>
            ${renderInstagramLinks(ex)}
          </div>
        </div>
      </article>`;
  }
  const log = exLog(iso, scope, ex.id);
  const weight = log.weight || ex.defaultWeight || s.lastWeights[ex.id] || "";
  const last = s.lastWeights[ex.id] && s.lastWeights[ex.id] !== log.weight ? `прошлое: ${s.lastWeights[ex.id]} кг` : "";
  let openIndex = -1;
  const sets = Array.from({ length: ex.sets }, (_, i) => {
    const on = !!(log.sets && log.sets[i]);
    if (!on && openIndex < 0) openIndex = i;
    const mark = on ? icon("check") : String(i + 1);
    return `<button type="button" class="set${on ? " on" : ""}${i === openIndex ? " next" : ""}" data-set="${i}" data-ex="${ex.id}" aria-pressed="${on}">${mark}</button>`;
  }).join("");
  const video = ex.video ? VIDEOS[ex.video] : null;
  return `
    <article class="ex" data-ex-card="${ex.id}" data-scope="${escapeAttr(scope)}">
      <div class="ex-top">
        <div class="ex-num">${String(idx + 1).padStart(2, "0")}</div>
        <div style="flex:1;min-width:0">
          ${ex.superset ? `<div class="superset-flag">Суперсет · ${escapeHtml(ex.superset)}</div>` : ""}
          <h3>${escapeHtml(ex.name)}</h3>
          <div class="ex-stats">
            <span class="chip">${ex.sets} × ${escapeHtml(ex.reps)}</span>
            ${ex.rest ? `<span class="chip rest">отдых ${formatRest(ex.rest)}</span>` : ""}
          </div>
          ${renderAnim(ex)}
          ${ex.notes ? `<p class="notes">${escapeHtml(ex.notes)}</p>` : ""}
          ${ex.logWeight !== false ? `
            <div class="stepper">
              <button type="button" data-wstep="-1" data-ex="${ex.id}" aria-label="Меньше вес">${icon("minus")}</button>
              <input inputmode="decimal" type="number" step="0.5" min="0" value="${escapeAttr(weight)}" data-weight="${ex.id}" aria-label="Вес, кг">
              <button type="button" data-wstep="1" data-ex="${ex.id}" aria-label="Больше вес">${icon("plus")}</button>
              ${last ? `<span class="last-w">${last}</span>` : `<span class="last-w">кг, шаг 2,5</span>`}
            </div>` : ""}
          <div class="sets">
            ${sets}
            ${ex.rest ? `<button type="button" class="rest-btn" data-rest="${ex.rest}" data-rest-name="${escapeAttr(ex.name)}">Отдых ${formatRest(ex.rest)}</button>` : ""}
          </div>
          ${renderInstagramLinks(ex)}
          ${video ? renderVideo(video, ex.name) : ""}
        </div>
      </div>
    </article>`;
}

function formatRest(sec) {
  if (sec >= 60 && sec % 60 === 0) return `${sec / 60} мин`;
  if (sec >= 60) {
    const m = Math.floor(sec / 60);
    const r = sec % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  }
  return `${sec} сек`;
}

function renderVideo(video, name) {
  const q = encodeURIComponent(name + " техника выполнения");
  return `
    <div class="video" data-yt="${video.id}">
      <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${escapeAttr(video.title)}" loading="lazy">
      <button type="button" class="play" data-play="${video.id}">
        <span class="play-ico"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
        Смотреть технику
      </button>
    </div>
    <div class="video-links">
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener">Открыть на YouTube</a>
      <a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">Ещё видео</a>
    </div>`;
}

function renderWeek(selected) {
  const mon = startOfWeek(selected);
  const end = addDays(mon, 6);
  const cards = [];
  for (let i = 0; i < 7; i++) {
    const d = addDays(mon, i);
    const iso = isoDate(d);
    const plan = dayPlan(d);
    const stats = completedCount(iso, plan, "workout");
    const info = placeMeta(plan);
    const menuDay = globalThis.FOOD && FOOD.menu && FOOD.menu.days[menuIndexFromDate(d)];
    const kcal = menuDay && menuDay.target_kcal ? " · " + menuDay.target_kcal + " ккал" : "";
    cards.push(`
      <button type="button" class="week-card" data-open-date="${iso}" style="--tag:${tagColor(plan.tag)}">
        <div class="wd"><b>${d.getDate()}</b><span>${plan.short}</span></div>
        <div style="flex:1;min-width:0;text-align:left">
          <h3>${escapeHtml(plan.title)}</h3>
          <p class="loc">${icon("map-pin")} ${escapeHtml(info.location)}</p>
          <p>${escapeHtml(plan.duration)}${escapeHtml(kcal)}</p>
          <div class="mini-bar"><span style="width:${stats.pct}%"></span></div>
        </div>
        <b>${stats.pct ? stats.pct + "%" : ""}</b>
      </button>`);
  }
  const state = getState();
  return `
    <p class="section-title">${ruDate(mon)} — ${ruDate(end)}</p>
    <div class="cycle">${WEEK_RULES.map((w) => `<button type="button" class="${state.cycleWeek === w.n ? "on" : ""}" data-cycle="${w.n}">${w.n}</button>`).join("")}</div>
    <p class="notes"><b>${WEEK_RULES[state.cycleWeek - 1].title}.</b> ${WEEK_RULES[state.cycleWeek - 1].text}</p>
    ${cards.join("")}
    <p class="notes" style="padding:4px 4px 0">Нажми день, чтобы открыть тренировку. Прогресс сохраняется на телефоне.</p>`;
}

function renderGuide(s) {
  return `
    <div class="guide">
      <h2>Как прогрессировать</h2>
      <div class="hint-box">Цель: 90 кг, широкий торс и плечи, как у бойца. Дефицит умеренный, белок 160–180 г. Не убивайся в отказ каждую тренировку — из-за глубокого дефицита уже проседали энергия и эрекция.</div>

      <div class="guide-card">
        <h3>Неделя цикла</h3>
        <p class="notes" style="margin-top:0">Отмечай, какая сейчас неделя. После 4-й начни заново с весами чуть выше 2–3 недели.</p>
        <div class="cycle" id="cycle-btns">
          ${WEEK_RULES.map((w) => `<button type="button" class="${s.cycleWeek === w.n ? "on" : ""}" data-cycle="${w.n}">${w.n}</button>`).join("")}
        </div>
        <p class="notes" style="margin:12px 0 0"><b>${WEEK_RULES[s.cycleWeek - 1].title}.</b> ${WEEK_RULES[s.cycleWeek - 1].text}</p>
      </div>

      <div class="guide-card">
        <h3>Недели 1–4</h3>
        <ol>
          ${WEEK_RULES.map((w) => `<li><b>${w.title}.</b> ${w.text}</li>`).join("")}
        </ol>
      </div>

      <div class="guide-card">
        <h3>Прогрессия подтягиваний</h3>
        <p class="notes" style="margin-top:0">Критерий перехода: <b>3 тренировки подряд 5×8</b> с текущей резиной. Отметь свой уровень:</p>
        <div class="levels" id="pull-levels">
          ${PULL_LEVELS.map((lv) => `
            <button type="button" class="level${s.pullLevel === lv.n ? " on" : ""}" data-level="${lv.n}">
              <b>${lv.title}</b>
              <small>${lv.text}</small>
            </button>`).join("")}
        </div>
      </div>

      <div class="guide-card">
        <h3>Неделя целиком</h3>
        <ul>
          <li><b>Каждое утро</b> — зарядка 12–15 мин. Блок A (таз и мобильность) в пн/ср/пт/вс, блок B (спина и осанка) во вт/чт/сб. Короткая версия с YouTube тоже в «Зарядке».</li>
          <li><b>Пн / Ср / Пт</b> — зал, база и прогрессия весов. Ноги в пн и пт (плюс румынская в среду).</li>
          <li><b>Вт / Сб</b> — офис: индусские отжимания и комплекс со стулом, затем подтягивания и руки с 8 кг. Стойка у стены открывается с 4-й недели.</li>
          <li><b>Чт</b> — теннис, подтягивания, вис, мобилити и короткий кардио-финишер. Шаги он не заменяет.</li>
          <li><b>Вс</b> — ходьба 10–15 тыс. шагов и тот же кардио-финишер. Меню на день — во вкладке «Питание».</li>
        </ul>
      </div>

      <div class="guide-card">
        <h3>Правила, чтобы расти, а не сдуться</h3>
        <ul>
          <li>Силовые в зале — основа. Пиши рабочий вес, на следующей неделе по возможности чуть больше.</li>
          <li>Средние дельты (махи) и ширина спины (вертикальные тяги + подтягивания) — приоритет.</li>
          <li>Упражнения в зале можно менять на тренажёры с той же мышцей, когда пришлёшь фото зала.</li>
          <li>Если сильно упали сон, настроение или эрекция — не режь калории сильнее и не добавляй подходы.</li>
        </ul>
      </div>
    </div>`;
}

function renderNav() {
  let nav = document.querySelector(".nav");
  if (!nav) {
    nav = document.createElement("nav");
    nav.className = "nav";
    document.body.appendChild(nav);
  }
  const items = [
    { id: "today", label: "Сегодня", icon: "flame" },
    { id: "week", label: "Неделя", icon: "calendar-days" },
    { id: "food", label: "Питание", icon: "utensils" },
    { id: "progress", label: "Прогресс", icon: "chart-line" },
    { id: "guide", label: "План", icon: "list-checks" }
  ];
  nav.innerHTML = `<div class="nav-inner">${items.map((it) => `
    <button type="button" class="${ui.tab === it.id && !ui.panel ? "on" : ""}" data-tab="${it.id}">
      ${icon(it.icon)}
      ${it.label}
    </button>`).join("")}</div>`;
  nav.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
}

function currentPlanAndScope() {
  const d = parseIso(ui.date);
  if (ui.panel === "warmup") return { iso: isoDate(d), plan: zaryadkaDisplayed(d), scope: "zaryadka" };
  return { iso: isoDate(d), plan: dayPlan(d), scope: "workout" };
}
function markManual(s, iso, scope, exId) {
  if (!s.days[iso].manualIds) s.days[iso].manualIds = {};
  if (!s.days[iso].manualIds[scope]) s.days[iso].manualIds[scope] = {};
  s.days[iso].manualIds[scope][exId] = true;
  if (scope === "workout") s.days[iso].workoutHealth = false;
  else s.days[iso].zaryadkaHealth = false;
}

function bind(d, plan) {
  document.querySelectorAll(".dow[data-date]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.date = b.dataset.date;
      ui.tab = "today";
      ui.panel = null;
      render();
    });
  });
  document.querySelectorAll("[data-open-date]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.date = b.dataset.openDate;
      ui.tab = "today";
      ui.panel = null;
      render();
    });
  });
  document.querySelectorAll("[data-set]").forEach((b) => {
    b.addEventListener("click", () => {
      const current = currentPlanAndScope();
      const card = b.closest("[data-scope]");
      const scope = card && card.dataset.scope ? card.dataset.scope : current.scope;
      const iso = current.iso;
      const p = scope.indexOf("blk-") === 0 && typeof blockPlanForScope === "function" ? blockPlanForScope(scope) : current.plan;
      const exId = b.dataset.ex;
      const i = Number(b.dataset.set);
      let started = false;
      updateState((s) => {
        if (!s.days[iso]) s.days[iso] = { workout: {}, zaryadka: {} };
        if (!s.days[iso][scope]) s.days[iso][scope] = {};
        if (!s.days[iso][scope][exId]) s.days[iso][scope][exId] = { weight: "", sets: [] };
        const log = s.days[iso][scope][exId];
        log.sets[i] = !log.sets[i];
        started = !!log.sets[i];
        markManual(s, iso, scope, exId);
      });
      const ex = p.exercises.find((x) => x.id === exId);
      if (started) maybeFinishDay(iso, p, scope);
      b.classList.toggle("on", started);
      b.setAttribute("aria-pressed", started ? "true" : "false");
      refreshProgress();
      if (started && ex && ex.rest) startTimer(ex.rest, "Отдых · " + ex.name);
    });
  });
  document.querySelectorAll("[data-weight]").forEach((inp) => {
    inp.addEventListener("change", () => {
      const current = currentPlanAndScope();
      const card = inp.closest("[data-scope]");
      const scope = card && card.dataset.scope ? card.dataset.scope : current.scope;
      const iso = current.iso;
      const exId = inp.dataset.weight;
      const val = inp.value;
      const prev = getState().lastWeights[exId] || "";
      const prevNum = parseFloat(String(prev).replace(",", "."));
      const nextNum = parseFloat(String(val).replace(",", "."));
      updateState((s) => {
        if (!s.days[iso]) s.days[iso] = { workout: {}, zaryadka: {} };
        if (!s.days[iso][scope]) s.days[iso][scope] = {};
        if (!s.days[iso][scope][exId]) s.days[iso][scope][exId] = { weight: "", sets: [] };
        s.days[iso][scope][exId].weight = val;
        if (val) s.lastWeights[exId] = val;
      });
      const ex = (ui.panel === "warmup" ? zaryadkaDisplayed(parseIso(ui.date)) : dayPlan(parseIso(ui.date))).exercises.find((item) => item.id === exId);
      if (val && Number.isFinite(prevNum) && Number.isFinite(nextNum) && nextNum > prevNum && ex) {
        ui.record = { name: ex.name, weight: val, prev: prev, note: ex.notes || "" };
        ui.panel = "record";
        render();
      }
    });
  });
  document.querySelectorAll("[data-rest]").forEach((b) => {
    b.addEventListener("click", () => startTimer(Number(b.dataset.rest), "Отдых · " + b.dataset.restName));
  });
  document.querySelectorAll("[data-play]").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.dataset.play;
      const box = b.closest(".video");
      box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&hl=ru" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen title="Техника упражнения"></iframe>`;
    });
  });
  const complete = document.querySelector("[data-act='complete-all']");
  if (complete) complete.addEventListener("click", () => {
    const { iso, plan: p, scope } = currentPlanAndScope();
    updateState((s) => {
      if (!s.days[iso]) s.days[iso] = { workout: {}, zaryadka: {} };
      if (!s.days[iso][scope]) s.days[iso][scope] = {};
      p.exercises.forEach((ex) => {
        if (!isExerciseUnlocked(ex, s)) return;
        if (!s.days[iso][scope][ex.id]) s.days[iso][scope][ex.id] = { weight: "", sets: [] };
        s.days[iso][scope][ex.id].sets = Array(ex.sets).fill(true);
        markManual(s, iso, scope, ex.id);
      });
      if (scope === "workout") ui.panel = "done";
    });
    render();
  });
  const reset = document.querySelector("[data-act='reset-day']");
  if (reset) reset.addEventListener("click", () => {
    const { iso, scope } = currentPlanAndScope();
    updateState((s) => {
      if (!s.days[iso]) return;
      s.days[iso][scope] = {};
      if (s.days[iso].manualIds) s.days[iso].manualIds[scope] = {};
      if (scope === "workout") {
        s.days[iso].workoutHealth = false;
        s.days[iso].healthFilled = [];
      } else {
        s.days[iso].zaryadkaHealth = false;
        s.days[iso].healthFilledZ = [];
      }
    });
    render();
  });
  document.querySelectorAll("[data-cycle]").forEach((b) => {
    b.addEventListener("click", () => {
      updateState((s) => {
      s.cycleWeek = Number(b.dataset.cycle);
      if (s.cycleWeek >= 4) s.handstandUnlocked = true;
    });
      render();
    });
  });
  document.querySelectorAll("[data-level]").forEach((b) => {
    b.addEventListener("click", () => {
      updateState((s) => { s.pullLevel = Number(b.dataset.level); });
      render();
    });
  });
  const inst = document.getElementById("btn-install");
  if (inst) inst.addEventListener("click", async () => {
    if (!ui.installEvent) return;
    ui.installEvent.prompt();
    try { await ui.installEvent.userChoice; } catch (e) {}
    ui.installEvent = null;
    render();
  });
  const hide = document.getElementById("btn-install-hide");
  if (hide) hide.addEventListener("click", () => {
    ui.hideInstall = true;
    render();
  });
  document.querySelectorAll("[data-zblock]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.zBlock = b.dataset.zblock;
      render({ scroll: "keep" });
    });
  });
  document.querySelectorAll("[data-continue]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.panel = "exercise";
      ui.exId = b.dataset.continue;
      render({ scroll: "top" });
    });
  });
  document.querySelectorAll("[data-open-warmup]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.panel = "warmup";
      render({ scroll: "top" });
    });
  });
  document.querySelectorAll("[data-show-list]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.showList = true;
      render({ scroll: "keep" });
    });
  });
  document.querySelectorAll("[data-back]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.panel = null;
      render({ scroll: "top" });
    });
  });
  document.querySelectorAll("[data-open-food]").forEach((b) => {
    b.addEventListener("click", () => setTab("food"));
  });
  document.querySelectorAll("[data-log-weight]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.panel = null;
      setTab("progress");
    });
  });
  document.querySelectorAll("[data-share]").forEach((b) => {
    b.addEventListener("click", async () => {
      const text = b.dataset.share;
      if (navigator.share) {
        try { await navigator.share({ text: text }); } catch (e) {}
      } else if (navigator.clipboard) {
        try { await navigator.clipboard.writeText(text); } catch (e) {}
      }
    });
  });
  document.querySelectorAll("[data-record-next]").forEach((b) => {
    b.addEventListener("click", () => {
      const d = parseIso(ui.date);
      const plan = dayPlan(d);
      const stats = completedCount(isoDate(d), plan, "workout");
      ui.panel = stats.total && stats.done >= stats.total ? "done" : null;
      ui.record = null;
      render({ scroll: "top" });
    });
  });
  document.querySelectorAll("[data-wstep]").forEach((b) => {
    b.addEventListener("click", () => {
      const input = document.querySelector(`[data-weight="${b.dataset.ex}"]`);
      if (!input) return;
      const cur = parseFloat(String(input.value).replace(",", ".")) || 0;
      const next = Math.max(0, Math.round((cur + Number(b.dataset.wstep) * 2.5) * 10) / 10);
      const snapped = Math.round(next * 2) / 2;
      input.value = snapped ? String(snapped) : "";
      input.dispatchEvent(new Event("change"));
    });
  });
  const weightForm = document.getElementById("weight-form");
  if (weightForm) {
    weightForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("weight-input");
      const value = input ? String(input.value).trim().replace(",", ".") : "";
      if (!value || !Number.isFinite(Number(value))) return;
      updateState((s) => {
        if (!s.bodyWeight) s.bodyWeight = {};
        s.bodyWeight[todayDate()] = value;
      });
      render({ scroll: "keep" });
    });
  }
  const stepsForm = document.getElementById("steps-form");
  if (stepsForm && stepsForm.dataset.stepsFor) {
    stepsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("steps-input");
      if (typeof saveManualSteps === "function") saveManualSteps(stepsForm.dataset.stepsFor, input ? input.value : "");
    });
  }
  if (typeof bindFood === "function") bindFood();
  if (typeof bindActivity === "function") bindActivity();
  if (typeof bindDayBlocks === "function") bindDayBlocks();
  bindAnims();
}

let animObserver = null;
function bindAnims() {
  if (animObserver) animObserver.disconnect();
  const nodes = document.querySelectorAll("[data-ex-anim]");
  if (!nodes.length || typeof IntersectionObserver !== "function") {
    nodes.forEach(startAnim);
    return;
  }
  animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) startAnim(el);
      else if (el.tagName === "VIDEO") el.pause();
    });
  }, { rootMargin: "120px 0px", threshold: 0.25 });
  nodes.forEach((node) => animObserver.observe(node));
}
function startAnim(el) {
  const src = el.dataset.src;
  if (!src) return;
  if (el.tagName === "VIDEO") {
    if (!el.getAttribute("src")) {
      el.preload = "metadata";
      el.src = src;
    }
    const play = el.play();
    if (play && play.catch) play.catch(() => {});
    return;
  }
  if (!el.getAttribute("src")) el.src = src;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(s) {
  return escapeHtml(s);
}

/* ------------ boot ------------ */
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  ui.installEvent = e;
  render();
});

window.addEventListener("load", () => {
  if (typeof isNativeApp === "function" && isNativeApp()) return;
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
});
