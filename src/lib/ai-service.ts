/**
 * AI Service Layer
 * Mengelola komunikasi dengan LLM menggunakan API Key yang disediakan.
 */

export class AIService {
  private static readonly API_KEY = "33d9e1d1e276426bff90941b7ad9ead7";
  private static readonly ENDPOINT = "https://api.example-llm.com/v1/chat/completions"; // Ganti dengan endpoint provider yang sesuai

  static async generateResponse(prompt: string) {
    try {
      const response = await fetch(this.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4-turbo", // Atau model spesifik lainnya
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        })
      });

      if (!response.ok) throw new Error('AI API Request Failed');
      
      return await response.json();
    } catch (error) {
      console.error("AI Service Error:", error);
      throw error;
    }
  }
}