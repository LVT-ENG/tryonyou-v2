import axios from "axios";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Variables desde el archivo .env
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!MAKE_WEBHOOK_URL || !OPENAI_API_KEY) {
  console.error("❌ MAKE_WEBHOOK_URL u OPENAI_API_KEY no definidos en .env");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function triggerScenarioFromMake() {
  try {
    const res = await axios.post(MAKE_WEBHOOK_URL, {});
    console.log(
      "Trigger lanzado desde Make a servidor externo ✅",
      res.status
    );
  } catch (err) {
    console.error(
      "❌ Error al activar Make desde Codex:",
      err.message
    );
  }
}

export async function runCodexResponse() {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Actúa como desarrollador experto de TryOnMe." },
      {
        role: "user",
        content: "Conecta flujo entre Automa, Make y Codex automáticamente.",
      },
    ],
  });
  console.log("🧠 Codex respondió:", response.choices[0].message.content);
}

export async function run() {
  await triggerScenarioFromMake();
  await runCodexResponse();
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  run();
}
