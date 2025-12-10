import { execSync } from "child_process";
import fs from "fs";
import path from "path";
const projectFolder = "ops-tryonyou-panel";
if (!fs.existsSync(projectFolder)) fs.mkdirSync(projectFolder);
["index.html", "favicon.ico"].forEach((file) => {
  fs.copyFileSync(path.join(".", file), path.join(projectFolder, file));
});
console.log("Desplegando en Netlify...");
execSync(`npx netlify deploy --prod --dir=${projectFolder}`, { stdio: "inherit" });
