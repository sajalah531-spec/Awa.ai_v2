import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
export async function POST(req) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    return Response.json({ reply: result.response.text() });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
  }
