// SCRIPT PARA CODEX – GENERA AUTOMÁTICAMENTE .env DESDE VERCEL API
import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const VERCEL_TOKEN = process.env.VERCEL_TOKEN; // Debes tenerlo en .env
const VERCEL_PROJECT_NAME = "tryonyou-app"; // Tu nombre de proyecto

const headers = {
  Authorization: `Bearer ${VERCEL_TOKEN}`,
};

// 1. Obtener ID de Organización (ORG_ID)
async function getOrgId() {
  const res = await axios.get("https://api.vercel.com/v2/teams", { headers });
  const orgId = res.data.teams[0]?.id;
  console.log("✅ ORG_ID obtenido:", orgId);
  return orgId;
}

// 2. Obtener ID de Proyecto (PROJECT_ID)
async function getProjectId() {
  const res = await axios.get(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_NAME}`, {
    headers,
  });
  const projectId = res.data.id;
  console.log("✅ PROJECT_ID obtenido:", projectId);
  return projectId;
}

// 3. Generar archivo .env completo
async function generateEnv() {
  try {
    const orgId = await getOrgId();
    const projectId = await getProjectId();

    const envContent = `
VERCEL_TOKEN=${VERCEL_TOKEN}
VERCEL_PROJECT_NAME=${VERCEL_PROJECT_NAME}
VERCEL_ORG_ID=${orgId}
VERCEL_PROJECT_ID=${projectId}
PROJECT_NAME=tryonyou-app
`;

    fs.writeFileSync(".env", envContent.trim());
    console.log("🎉 Archivo .env generado con éxito.");
  } catch (error) {
    console.error("❌ Error generando el archivo .env:", error.response?.data || error.message);
  }
}

generateEnv();
