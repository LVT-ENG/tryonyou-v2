import dotenv from "dotenv";
import OpenAI from "openai";
import axios from "axios";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function triggerScenarioFromMake() {
  try {
    const res = await axios.post(
      "https://tu-servidor.onrender.com/upload",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
  const response = await openai.responses.create({
    model: "gpt-4o",
    instructions: "Actúa como desarrollador experto de TryOnMe.",
    input: "Conecta flujo entre Automa, Make y Codex automáticamente.",
  });
  console.log("🧠 Codex respondió:", response.output_text);
}

export async function run() {
  await triggerScenarioFromMake();
  await runCodexResponse();
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  run();
}
