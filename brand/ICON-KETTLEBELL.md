# Иконка-гиря для «АРСДРОЙД — ЯРОСТЬ»

Превью: `brand/icon-kettlebell-preview.png`. Исходник: `src/kettlebell.py`.

## Варианты
| Папка | Вариант |
|---|---|
| `icon-kettlebell-a/` | **А (рекомендую).** Гиря: корпус-октагон контуром, широкая ручка сверху, белая «А» внутри. Продолжает знак-октагон бренда |
| `icon-kettlebell-b/` | **Б.** Ромб контуром с белой «А», ручка гири дугой сверху |
| `icon-kettlebell-c/` | **В.** Сплошная оранжевая гиря, «А» вырезана тёмным. Самый плотный силуэт на 48 px, но буква не белая |

В каждой папке:
- **Обычная иконка:** `icon.svg`, `icon-512.png`, `icon-192.png`, `icon-180.png` (apple-touch), `icon-48.png` (фавикон).
- **Maskable:** `icon-maskable.svg`, `icon-maskable-512.png`, `icon-maskable-192.png`. Знак вписан в безопасный круг 80 %.
- **Android adaptive:** передний план `icon-adaptive-foreground.svg` и `icon-adaptive-foreground-432.png` (108 dp, знак в зоне 66 dp), фон #0B0C0E.
- **Монохромная:** `icon-monochrome.svg` и `icon-monochrome-432.png`, белый силуэт на прозрачном фоне для тематических иконок Android 13+.
- **Готовая папка `android-res/`:**
  - `mipmap-{mdpi…xxxhdpi}` с файлами `ic_launcher.png`, `ic_launcher_round.png`, `ic_launcher_foreground.png`, `ic_launcher_monochrome.png`;
  - `mipmap-anydpi-v26/ic_launcher.xml` и `ic_launcher_round.xml`;
  - `values/ic_launcher_background.xml`.

## Почему на телефоне стоит стандартная иконка
Проверял `origin/main` (7eedae2, тег apk-3) в https://github.com/2253595-sys/Training-app.

1. **Главная причина.** В проекте остался файл из шаблона Android Studio `android/app/src/main/res/drawable-v24/ic_launcher_foreground.xml` (стандартный робот). `mipmap-anydpi-v26/ic_launcher.xml` берёт передний план из `@drawable/ic_launcher_foreground`. На Android 7+ папка `drawable-v24` побеждает `drawable/`, поэтому вместо нашего `drawable/ic_launcher_foreground.png` система показывает робота на нашем тёмном фоне #0B0C0E.
2. **`drawable/ic_launcher_monochrome.png` — цветная иконка с фоном.** В режиме тематических иконок Android 13+ вместо знака будет сплошной квадрат. Монохромная иконка должна быть белым силуэтом на прозрачном фоне.
3. **В проекте остался шаблонный `drawable/ic_launcher_background.xml`** (бирюзовая сетка). Сейчас он не используется, потому что фон задан цветом, но его стоит удалить, чтобы не путал.
4. **PNG лежат в `drawable/` без указания плотности.** Android считает их mdpi. Правильнее положить по плотностям в `mipmap-*dpi`, как в готовом `android-res/`.
5. **Кэш лаунчера.** Даже после исправления часть лаунчеров (One UI, MIUI) держит старую иконку. Нужно удалить приложение и поставить APK заново либо перезагрузить телефон.
6. **PWA из Chrome.** Если стоит PWA, а не APK: веб-манифест уже ссылается на `icon-192.png`, `icon-512.png` и maskable-версии. Но установленный WebAPK обновляет иконку редко. Проще удалить ярлык и установить заново.

TWA/Bubblewrap в репозитории нет, сборка идёт через Capacitor 8 (`npm run sync:android` → `cap sync android`). Иконки `cap sync` не перезаписывает.

## Что положить разработчику (вариант А; для Б/В меняется только папка)
**Android** (`android/app/src/main/res/`):
1. Удалить `drawable-v24/ic_launcher_foreground.xml`, `drawable/ic_launcher_foreground.png`, `drawable/ic_launcher_monochrome.png` и `drawable/ic_launcher_background.xml`.
2. Скопировать содержимое `brand/icon-kettlebell-a/android-res/` поверх `res/` (заменить существующие файлы):
   - `mipmap-{mdpi,hdpi,xhdpi,xxhdpi,xxxhdpi}/ic_launcher*.png`;
   - `mipmap-anydpi-v26/ic_launcher.xml` и `ic_launcher_round.xml`, которые теперь ссылаются на `@mipmap/ic_launcher_foreground` и `@mipmap/ic_launcher_monochrome`;
   - `values/ic_launcher_background.xml` (#0B0C0E, без изменений).
3. `AndroidManifest.xml` не трогать: там уже `@mipmap/ic_launcher` и `@mipmap/ic_launcher_round`.
4. Проверить, что в собранном APK нет робота:
   ```
   aapt2 dump resources app-release.apk | grep ic_launcher_foreground
   ```
   Должен остаться только `mipmap`.

**Веб и PWA** (корень репозитория; эти файлы копирует `scripts/copy-www.mjs`):
- `icon-kettlebell-a/icon-192.png` → `icon-192.png`
- `icon-512.png` → `icon-512.png`
- `icon-maskable-192.png` и `icon-maskable-512.png` → те же имена
- `icon-180.png` → `apple-touch-icon.png`
- `icon-48.png` → `favicon.png`

Затем поднять `CACHE` в `sw.js` (`boets-v4` → `boets-v5`), иначе service worker отдаст старые PNG. Копию для `brand/` в репозитории можно положить в `brand/icon-kettlebell-a/`.

**Установка на телефон:** удалить старое приложение «АРСДРОЙД», поставить новый APK из релиза и при необходимости перезагрузить телефон.
