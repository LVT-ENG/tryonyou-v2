import { exec } from "child_process";
import env from "../env.js";

const token = env.VERCEL_TOKEN;
if (!token) {
  console.error("[WARN] VERCEL_TOKEN missing. Skip deploy.");
} else {
  exec(`vercel --prod --confirm --yes --token=${token}`,(err, stdout, stderr) => {
    if (err) return console.error("[ERROR] Vercel:", stderr);
    console.log("[OK] Despliegue Vercel:\n", stdout);
  });
}
