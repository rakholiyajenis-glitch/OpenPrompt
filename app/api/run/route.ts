import { NextResponse } from "next/server";
import OpenAI from "openai";

const models = ["gpt-4o-mini"];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not configured. Add it to .env.local." }, { status: 500 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const results = await Promise.all(models.map(async (model) => {
      const start = Date.now();
      const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      });
      return {
        model: process.env.OPENAI_MODEL || model,
        response: response.choices[0]?.message?.content || "",
        latency: Date.now() - start,
        tokens: response.usage?.total_tokens || 0
      };
    }));
    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI request failed." }, { status: 500 });
  }
}
