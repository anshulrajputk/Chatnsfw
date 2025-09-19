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

// OpenAI client
const client = new OpenAI({
  apiKey: "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" // ⚠️ isko .env file me rakhna best practice hai
});

// 🔹 Static files serve karne ke liye
app.use(express.static(__dirname));

// 🔹 Root route (index.html serve karega)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔹 Chat page route (chat.html serve karega)
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

// 🔹 API route (AI chat)
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
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 🔹 Server start
app.listen(3000, "0.0.0.0", () =>
  console.log("✅ Server running on http://127.0.0.1:3000")
);
