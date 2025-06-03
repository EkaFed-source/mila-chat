import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages, systemPrompt } = req.body;
  const formattedMessages = [{ role: "system", content: systemPrompt }, ...messages];

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: formattedMessages,
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Prepáč, nastala chyba. Skús to neskôr znova." });
  }
}
