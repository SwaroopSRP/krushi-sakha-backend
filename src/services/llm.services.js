import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getLlmOutput(level = 0, systemPrompt = "", userPrompt) {
    const res = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ],
        model: level === 0 ? "llama-3.1-8b-instant" : "openai/gpt-oss-20b"
    });

    try {
        return res.choices[0]?.message?.content;
    } catch (error) {
        console.error("Error fetching LLM output:", error);
        return null;
    }
}

export default getLlmOutput;
