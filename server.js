import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ OpenAI client (API key env var me rakho)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ✅ Static files serve
app.use(express.static(__dirname));

// ✅ Chat page route
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

// ✅ API route (AI backend)
app.post("/chatapi", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }]
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI backend error" });
  }
});

// ✅ Start server
app.listen(3000, "0.0.0.0", () =>
  console.log("✅ Server running on http://127.0.0.1:3000")
);
