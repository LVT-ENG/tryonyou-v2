import { cpSync, mkdirSync, rmSync, existsSync } from "fs";
import { execSync } from "child_process";

const out = "ops-tryonyou-panel";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync("ops_panel.html", `${out}/index.html`);
if (existsSync("favicon.ico")) {
  cpSync("favicon.ico", `${out}/favicon.ico`);
}

console.log("Deploying to Netlify...");
execSync(`npx netlify deploy --prod --dir=${out}`, { stdio: "inherit" });
