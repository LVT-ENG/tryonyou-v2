import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_NAME = process.env.VERCEL_PROJECT_NAME || "tryonyou-app";
const PROJECT_NAME = process.env.PROJECT_NAME || "tryonyou-app";

const headers = {
  Authorization: `Bearer ${VERCEL_TOKEN}`,
};

async function getOrgId() {
  const res = await axios.get("https://api.vercel.com/v2/teams", { headers });
  const orgId = res.data.teams?.[0]?.id;
  console.log("✅ ORG_ID obtenido:", orgId);
  return orgId;
}

async function getProjectId() {
  const res = await axios.get(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_NAME}`, { headers });
  const projectId = res.data.id;
  console.log("✅ PROJECT_ID obtenido:", projectId);
  return projectId;
}

export async function generateEnv() {
  if (!VERCEL_TOKEN) {
    console.error("❌ VERCEL_TOKEN is required");
    return;
  }
  try {
    const orgId = await getOrgId();
    const projectId = await getProjectId();
    const envContent = `
VERCEL_TOKEN=${VERCEL_TOKEN}
VERCEL_PROJECT_NAME=${VERCEL_PROJECT_NAME}
VERCEL_ORG_ID=${orgId}
VERCEL_PROJECT_ID=${projectId}
PROJECT_NAME=${PROJECT_NAME}
`;
    fs.writeFileSync(".env", envContent.trim() + "\n");
    console.log("🎉 Archivo .env generado con éxito.");
  } catch (error) {
    console.error("❌ Error generando el archivo .env:", error.response?.data || error.message);
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  generateEnv();
}
