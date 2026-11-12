import { cpSync, mkdirSync, rmSync } from "node:fs";

const files = [
  "index.html",
  "app.js",
  "activity.js",
  "food.js",
  "icons.js",
  "styles.css",
  "tokens.css",
  "fonts.css",
  "sw.js",
  "manifest.webmanifest",
  "favicon.png",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-192.png",
  "icon-maskable-512.png"
];

rmSync("www", { recursive: true, force: true });
mkdirSync("www/data", { recursive: true });
mkdirSync("www/brand", { recursive: true });
mkdirSync("www/fonts", { recursive: true });
for (const file of files) cpSync(file, `www/${file}`);
cpSync("data/recipes.json", "www/data/recipes.json");
cpSync("data/menu-week.json", "www/data/menu-week.json");
cpSync("data/shopping-week.json", "www/data/shopping-week.json");
cpSync("brand/logo-horizontal-tight.svg", "www/brand/logo-horizontal-tight.svg");
cpSync("brand/logo-compact.svg", "www/brand/logo-compact.svg");
cpSync("fonts", "www/fonts", { recursive: true });
