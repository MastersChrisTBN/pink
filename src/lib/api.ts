interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function chatWithAI(messages: Message[]) {
  const API_KEY = import.meta.env.VITE_LLM_API_KEY;
  const API_URL = import.meta.env.VITE_LLM_API_URL || 'https://api.openai.com/v1/chat/completions';
  const MODEL = import.meta.env.VITE_LLM_MODEL || 'gpt-3.5-turbo';

  if (!API_KEY) {
    throw new Error("API Key tidak ditemukan di environment variables.");
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Gagal menghubungi API AI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI API Error:", error);
    throw error;
  }
}