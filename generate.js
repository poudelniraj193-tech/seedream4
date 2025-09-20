// /api/generate.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = JSON.parse(req.body);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // from Vercel environment
    });

    // Call OpenAI Images API
    const response = await client.images.generate({
      model: "gpt-image-1",   // ✅ correct model for image generation
      prompt,
      size: "512x512",        // you can change to "1024x1024"
    });

    // Send the first image URL back
    res.status(200).json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
