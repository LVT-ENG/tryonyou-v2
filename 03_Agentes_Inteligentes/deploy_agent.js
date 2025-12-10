import { exec } from "child_process";
exec("vercel --prod --confirm --yes --token=$VERCEL_TOKEN", (err, stdout, stderr) => {
  if (err) return console.error("[ERROR] Vercel:", stderr);
  console.log("[OK] Despliegue Vercel:\n", stdout);
});
