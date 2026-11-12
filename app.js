const STORAGE_KEY = "boets-v1";

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

const ZARYADKA = {
  id: "zaryadka",
  title: "Утренняя зарядка",
  place: "Дом",
  duration: "10–15 мин",
  intro: "Каждое утро, дома, с гантелями. Если очень мало времени — сделай видео суставной гимнастики и махи на плечи.",
  exercises: [
    { id: "z-follow", name: "Суставная гимнастика", sets: 1, reps: "8–10 мин", rest: 0, logWeight: false, video: "zaryadkaFollow", notes: "Можно просто повторять за видео. Если идёшь по списку ниже — это разминка на 8–10 минут, пункты 2–7 тогда короче." },
    { id: "z-cat", name: "Кошка-корова", sets: 1, reps: "8–10", rest: 0, logWeight: false, video: "catCow", notes: "Медленно, дыхание в такт движению. Без боли в шее." },
    { id: "z-squat", name: "Приседания без веса", sets: 2, reps: "12–15", rest: 45, logWeight: false, video: "bwSquat", notes: "Пятки на полу, колени в сторону носков." },
    { id: "z-push", name: "Отжимания", sets: 2, reps: "8–12", rest: 45, logWeight: false, video: "pushup", notes: "Если тяжело — руки на возвышении (стол, диван)." },
    { id: "z-plank", name: "Планка", sets: 2, reps: "20–40 сек", rest: 30, logWeight: false, video: "plank", notes: "Таз не проваливать, смотреть в пол." },
    { id: "z-lat", name: "Махи гантелями в стороны", sets: 2, reps: "12–15", rest: 45, logWeight: true, video: "latRaise", notes: "Лёгкий вес, это активация средних дельт, не отказ." },
    { id: "z-stretch", name: "Растяжка грудных", sets: 1, reps: "30–40 сек на сторону", rest: 0, logWeight: false, video: "chestStretch", notes: "В дверном проёме или у стены. Без боли в плече." }
  ]
};

const DAYS = [
  {
    key: 1, short: "Пн", name: "Понедельник",
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
    title: "Подтягивания и руки",
    place: "Офис", tag: "office", duration: "35–45 мин",
    focus: "Турник · плечи · руки · 8 кг",
    intro: "Практика подтягиваний и многоповторная работа с гантелями 8 кг. Темп медленный, пауза в пике сокращения.",
    exercises: [
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
    title: "Лёгкий день · теннис",
    place: "Офис", tag: "tennis", duration: "20–25 мин",
    focus: "Подтягивания и мобилити",
    intro: "Сегодня теннис — не выжигай руки до игры. Подтягивания не до отказа. Дорожку можно после матча как заминку.",
    exercises: [
      { id: "band-thu", name: "Подтягивания с эспандером", sets: 4, reps: "макс, не в отказ", rest: 90, logWeight: false, video: "bandPullup", notes: "Оставь 2 повтора в запасе. Сегодня восстановление важнее рекорда." },
      { id: "scap-thu", name: "Лопаточные подтягивания", sets: 3, reps: "8–10", rest: 60, logWeight: false, video: "scapPull", notes: "Вис, плечи от ушей, сведи лопатки вниз-назад, локти прямые." },
      { id: "hang-thu", name: "Активный вис на турнике", sets: 3, reps: "20–40 сек", rest: 60, logWeight: false, video: "activeHang", notes: "Плечи опущены, корпус чуть в тонусе. Если хват слабый — короче время." },
      { id: "mob-thu", name: "Мобилити плеч и грудного отдела", sets: 1, reps: "8–10 мин", rest: 0, logWeight: false, video: "mobility", notes: "Повторяй за видео. Без боли, дыхание спокойное." },
      { id: "tm-thu", name: "Дорожка по желанию", sets: 1, reps: "10–15 мин", rest: 0, logWeight: false, notes: "Лёгкий шаг, не гонка. Можно после тенниса." }
    ]
  },
  {
    key: 5, short: "Пт", name: "Пятница",
    title: "Плечи и ноги",
    place: "Зал", tag: "gym", duration: "70–80 мин",
    focus: "Средние дельты · ноги · руки · грудь",
    intro: "Главный день плеч плюс вторые ноги. Если мало времени — убери икры и сократи суперсет до 2 кругов.",
    exercises: [
      { id: "db-ohp", name: "Жим гантелей сидя вверх", sets: 4, reps: "8–10", rest: 120, logWeight: true, video: "dbOhp", notes: "Спинка почти вертикальная. Не выгибай поясницу." },
      { id: "lat-fri", name: "Махи в стороны", sets: 4, reps: "12–15", rest: 60, logWeight: true, video: "latRaise", notes: "В последнем подходе — дроп-сет: до утруднения, скинь вес, ещё 8–12." },
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
    title: "Подтягивания и плечи",
    place: "Офис", tag: "office", duration: "35–45 мин",
    focus: "Турник · плечи · руки · 8 кг",
    intro: "Второй офисный объём. Снова практика подтягиваний и многоповторка с 8 кг, чуть другой набор движений, чем во вторник.",
    exercises: [
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
    title: "Отдых",
    place: "Дом", tag: "rest", duration: "прогулка",
    focus: "Восстановление",
    intro: "Силовых нет. 10–15 тысяч шагов, сон, белок 160–180 г. Зарядку можно сделать, если тело просит подвигаться — без отказа.",
    exercises: [
      { id: "walk", name: "Прогулка 10–15 тысяч шагов", sets: 1, reps: "день", rest: 0, logWeight: false, notes: "Можно разбить на несколько выходов. Это не день дивана." }
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
  plan.exercises.forEach((ex) => {
    total += ex.sets;
    const st = (log[ex.id] && log[ex.id].sets) || [];
    done += st.filter(Boolean).length;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
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
  const left = timer.running ? (timer.endsAt - Date.now()) / 1000 : 0;
  root.innerHTML = `
    <div class="timer${timer.done ? " done" : ""}">
      <div class="time">${timer.done ? "0:00" : formatSec(left)}</div>
      <div class="lbl"><b>${timer.done ? "Отдых закончен" : timer.label}</b>${timer.done ? "Можно следующий подход" : "осталось"}</div>
      ${timer.done ? `<button type="button" data-act="close">Ок</button>` : `<button type="button" class="ghost" data-act="stop">Стоп</button>`}
    </div>`;
  root.querySelector("button").addEventListener("click", stopTimer);
}

/* ------------ render ------------ */
const ui = {
  tab: "today", // today | zaryadka | week | guide
  date: todayDate(),
  installEvent: null,
  hideInstall: false
};

function setTab(tab) {
  ui.tab = tab;
  render({ scroll: "top" });
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
  app.innerHTML = `
    ${renderHeader(d, s)}
    ${ui.tab === "today" ? renderInstall() + renderWeekStrip(d) + renderDay(d, plan, "workout") : ""}
    ${ui.tab === "zaryadka" ? renderZaryadka(d) : ""}
    ${ui.tab === "week" ? renderWeek(d) : ""}
    ${ui.tab === "guide" ? renderGuide(s) : ""}
  `;
  bind(d, plan);
  renderNav();
  renderTimer();
  if (opts.scroll === "top") window.scrollTo(0, 0);
  else if (opts.scroll === "keep") window.scrollTo(0, y);
}

function renderHeader(d, s) {
  const rule = WEEK_RULES[s.cycleWeek - 1];
  return `
    <header class="top">
      <div class="brand">
        <div class="brand-kicker">Программа · цикл ${s.cycleWeek}/4</div>
        <h1>Боец</h1>
        <div class="today-date">${d.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })} · ${rule ? rule.title : ""}</div>
      </div>
    </header>`;
}

function renderInstall() {
  if (ui.hideInstall || window.matchMedia("(display-mode: standalone)").matches) return "";
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
    cells.push(`<button type="button" class="${cls}" data-date="${iso}"><span class="d">${plan.short}</span><span class="n">${d.getDate()}</span></button>`);
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

function renderZaryadka(d) {
  const iso = isoDate(d);
  const stats = completedCount(iso, ZARYADKA, "zaryadka");
  return `
    <section class="hero" style="--tag:var(--text)">
      <div class="place-row">
        <span class="pill home">Дом</span>
        <span class="meta">${ZARYADKA.duration}</span>
        <span class="meta">гантели</span>
      </div>
      <h2>${ZARYADKA.title}</h2>
      <p>${ZARYADKA.intro}</p>
      <div class="progress-line">
        <div class="bar"><span style="width:${stats.pct}%"></span></div>
        <b>${stats.done}/${stats.total} подходов</b>
      </div>
    </section>
    ${ZARYADKA.exercises.map((ex, i) => renderExercise(iso, "zaryadka", ex, i)).join("")}
    <div class="day-actions">
      <button class="btn" type="button" data-act="complete-all">Отметить всё</button>
      <button class="btn ghost" type="button" data-act="reset-day">Сбросить</button>
    </div>
  `;
}

function renderExercise(iso, scope, ex, idx) {
  const s = getState();
  const log = exLog(iso, scope, ex.id);
  const weight = log.weight || ex.defaultWeight || s.lastWeights[ex.id] || "";
  const last = s.lastWeights[ex.id] && s.lastWeights[ex.id] !== log.weight ? `прошлое: ${s.lastWeights[ex.id]} кг` : "";
  const sets = Array.from({ length: ex.sets }, (_, i) => {
    const on = !!(log.sets && log.sets[i]);
    return `<button type="button" class="set${on ? " on" : ""}" data-set="${i}" data-ex="${ex.id}" aria-pressed="${on}">${i + 1}</button>`;
  }).join("");
  const video = ex.video ? VIDEOS[ex.video] : null;
  return `
    <article class="ex" data-ex-card="${ex.id}">
      <div class="ex-top">
        <div class="ex-num">${String(idx + 1).padStart(2, "0")}</div>
        <div style="flex:1;min-width:0">
          ${ex.superset ? `<div class="superset-flag">Суперсет · ${escapeHtml(ex.superset)}</div>` : ""}
          <h3>${escapeHtml(ex.name)}</h3>
          <div class="ex-stats">
            <span class="chip">${ex.sets} × ${escapeHtml(ex.reps)}</span>
            ${ex.rest ? `<span class="chip rest">отдых ${formatRest(ex.rest)}</span>` : ""}
          </div>
          ${ex.notes ? `<p class="notes">${escapeHtml(ex.notes)}</p>` : ""}
          ${ex.logWeight !== false ? `
            <div class="weight-row">
              <label>Вес</label>
              <input inputmode="decimal" type="number" step="0.5" min="0" value="${escapeAttr(weight)}" data-weight="${ex.id}" placeholder="кг">
              <span>кг</span>
              ${last ? `<span class="last-w">${last}</span>` : ""}
            </div>` : ""}
          <div class="sets">
            ${sets}
            ${ex.rest ? `<button type="button" class="rest-btn" data-rest="${ex.rest}" data-rest-name="${escapeAttr(ex.name)}">Отдых ${formatRest(ex.rest)}</button>` : ""}
          </div>
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
    const z = completedCount(iso, ZARYADKA, "zaryadka");
    cards.push(`
      <button type="button" class="week-card" data-open-date="${iso}">
        <div class="wd"><b>${plan.short}</b><span>${d.getDate()}</span></div>
        <div style="flex:1;min-width:0;text-align:left">
          <h3>${escapeHtml(plan.title)}</h3>
          <p>${plan.place} · ${plan.duration} · зарядка ${z.done}/${z.total}</p>
        </div>
        <div class="mini-bar"><span style="width:${stats.pct}%"></span></div>
      </button>`);
  }
  return `
    <p class="section-title">${ruDate(mon)} — ${ruDate(end)}</p>
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
          <li><b>Каждое утро</b> — зарядка 10–15 мин дома, гантели.</li>
          <li><b>Пн / Ср / Пт</b> — зал, база и прогрессия весов. Ноги в пн и пт (плюс румынская в среду).</li>
          <li><b>Вт / Сб</b> — офис: практика подтягиваний + плечи и руки с 8 кг, много повторов.</li>
          <li><b>Чт</b> — теннис, только подтягивания, вис и мобилити.</li>
          <li><b>Вс</b> — ходьба 10–15 тыс. шагов, восстановление.</li>
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
    { id: "today", label: "Сегодня", icon: "M4 6h16M4 12h16M4 18h10" },
    { id: "zaryadka", label: "Зарядка", icon: "M12 3v4M8 5.5 12 3l4 2.5M6 21V10l6-3 6 3v11M10 21v-6h4v6" },
    { id: "week", label: "Неделя", icon: "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" },
    { id: "guide", label: "План", icon: "M12 19V5M7 10l5-5 5 5M6 19h12" }
  ];
  nav.innerHTML = `<div class="nav-inner">${items.map((it) => `
    <button type="button" class="${ui.tab === it.id ? "on" : ""}" data-tab="${it.id}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${it.icon}"/></svg>
      ${it.label}
    </button>`).join("")}</div>`;
  nav.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
}

function currentPlanAndScope() {
  const d = parseIso(ui.date);
  if (ui.tab === "zaryadka") return { iso: isoDate(d), plan: ZARYADKA, scope: "zaryadka" };
  return { iso: isoDate(d), plan: dayPlan(d), scope: "workout" };
}

function bind(d, plan) {
  document.querySelectorAll(".dow[data-date]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.date = b.dataset.date;
      ui.tab = "today";
      render();
    });
  });
  document.querySelectorAll("[data-open-date]").forEach((b) => {
    b.addEventListener("click", () => {
      ui.date = b.dataset.openDate;
      ui.tab = "today";
      render();
    });
  });
  document.querySelectorAll("[data-set]").forEach((b) => {
    b.addEventListener("click", () => {
      const { iso, plan: p, scope } = currentPlanAndScope();
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
      });
      const ex = (ui.tab === "zaryadka" ? ZARYADKA : plan).exercises.find((x) => x.id === exId);
      b.classList.toggle("on", started);
      b.setAttribute("aria-pressed", started ? "true" : "false");
      refreshProgress();
      if (started && ex && ex.rest) startTimer(ex.rest, "Отдых · " + ex.name);
    });
  });
  document.querySelectorAll("[data-weight]").forEach((inp) => {
    inp.addEventListener("change", () => {
      const { iso, scope } = currentPlanAndScope();
      const exId = inp.dataset.weight;
      const val = inp.value;
      updateState((s) => {
        if (!s.days[iso]) s.days[iso] = { workout: {}, zaryadka: {} };
        if (!s.days[iso][scope]) s.days[iso][scope] = {};
        if (!s.days[iso][scope][exId]) s.days[iso][scope][exId] = { weight: "", sets: [] };
        s.days[iso][scope][exId].weight = val;
        if (val) s.lastWeights[exId] = val;
      });
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
        if (!s.days[iso][scope][ex.id]) s.days[iso][scope][ex.id] = { weight: "", sets: [] };
        s.days[iso][scope][ex.id].sets = Array(ex.sets).fill(true);
      });
    });
    render();
  });
  const reset = document.querySelector("[data-act='reset-day']");
  if (reset) reset.addEventListener("click", () => {
    const { iso, scope } = currentPlanAndScope();
    updateState((s) => {
      if (s.days[iso]) s.days[iso][scope] = {};
    });
    render();
  });
  document.querySelectorAll("[data-cycle]").forEach((b) => {
    b.addEventListener("click", () => {
      updateState((s) => { s.cycleWeek = Number(b.dataset.cycle); });
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();
