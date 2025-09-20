import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // stored securely in Vercel
    });

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
    });

    const imageUrl = result.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
