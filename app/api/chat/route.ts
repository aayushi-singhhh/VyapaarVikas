import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const contextualPrompt = `You are a helpful AI assistant for VyapaarVikas MSME Dashboard, a platform designed to help small and medium enterprises in India. The platform offers various services like:

- Business registration and compliance
- Loan assistance and credit scoring (Loan Ready Score)
- Marketing collaboration with students (Student AdGenie)
- Competitor analysis (Competitor Spy)
- Mini MBA courses for business education
- Trust score building for credibility
- Waste management marketplace (Waste2Worth)
- AI-powered business insights

Please respond to the following user question in a helpful, professional, and friendly manner. If possible, relate your answer to MSME business growth and the services available on the platform. You can respond in both Hindi and English as appropriate for Indian users. Keep responses concise but informative.

User Question: ${message}

Please provide a practical, actionable response that would be valuable for an MSME business owner.`;

    // Generate response
    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
