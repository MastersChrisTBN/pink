import { NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';

/**
 * API Route Handler
 * Endpoint internal untuk memproses permintaan dari frontend.
 */

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const aiData = await AIService.generateResponse(prompt);
    
    return NextResponse.json({ 
      success: true, 
      data: aiData.choices[0].message.content 
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}