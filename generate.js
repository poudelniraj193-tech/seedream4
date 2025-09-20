// /api/generate.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Call OpenAI Images API
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // keep safe in Vercel
      },
      body: JSON.stringify({
        model: "gpt-image-1", // OpenAI’s image model
        prompt: prompt,
        size: "512x512"
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const imageUrl = data.data[0].url;
    res.status(200).json({ image: imageUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
