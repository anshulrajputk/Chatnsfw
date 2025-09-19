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
  apiKey: "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" // ⚠️ Abhi test key hai, future me .env use karna
});

// 🔹 Static files serve karne ke liye
app.use(express.static(__dirname));

// 🔹 Root route (index.html serve karega)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔹 API route
app.post("/chat", async (req, res) => {
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