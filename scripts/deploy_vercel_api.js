import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.VERCEL_TOKEN;
const projectName = process.env.VERCEL_PROJECT_NAME || "tryon-app";
const orgId = process.env.VERCEL_ORG_ID;
const projectId = process.env.VERCEL_PROJECT_ID;
const projectDir = path.resolve("./web");

export async function readFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await readFiles(fullPath)));
    } else {
      const data = fs.readFileSync(fullPath);
      files.push({
        file: path.relative(projectDir, fullPath).replace(/\\/g, "/"),
        data: data.toString("base64"),
      });
    }
  }
  return files;
}

export async function deploy() {
  if (!token || !orgId || !projectId) {
    console.error("Missing Vercel credentials.");
    return;
  }
  const files = await readFiles(projectDir);
  const payload = {
    name: projectName,
    project: projectId,
    orgId,
    target: "production",
    files,
  };

  try {
    const { data } = await axios.post(
      "https://api.vercel.com/v13/deployments",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("✅ Deploy URL:", data.url);
  } catch (err) {
    if (err.response) {
      console.error("Vercel error:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  deploy();
}

