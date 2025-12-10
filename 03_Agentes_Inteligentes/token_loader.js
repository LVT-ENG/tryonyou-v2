import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("[WARN] OPENAI_API_KEY not set in environment");
} else {
  console.log("\ud83d\udd10 Token loaded from .env: OK");
}
