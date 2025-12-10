import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runLookCurator(userInput) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Eres el Curador Estético de la marca TRYONME. Seleccionas productos ideales basados en el estilo del usuario y catálogo disponible.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    console.log("\uD83C\uDFA8 LOOK CURATOR RESPONSE:", response.choices[0].message.content);
  } catch (error) {
    console.error("\u274C Error al invocar Look Curator:", error);
  }
}

async function triggerShopifyUpload() {
  try {
    const response = await fetch("https://tu-servidor.onrender.com/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trigger: "shopify" }),
    });

    const data = await response.json();
    console.log("\u2705 Shopify Upload Result:", data);
  } catch (err) {
    console.error("\uD83D\uDEAB Error Shopify Trigger:", err);
  }
}

// === MAIN RUNNER ===
async function start() {
  await runLookCurator(
    "Quiero un look elegante pero cómodo para una fiesta de noche."
  );
  await triggerShopifyUpload();
}

start();
