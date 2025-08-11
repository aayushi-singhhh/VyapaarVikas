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
    const contextualPrompt = `You are a professional AI assistant for VyapaarVikas MSME Dashboard, a comprehensive platform for small and medium enterprises in India.

🏢 PLATFORM SERVICES:
- Business Registration & Compliance (Udyam Registration)
- Loan Assistance & Credit Scoring (Loan Ready Score)
- Marketing Collaboration with Students (Student AdGenie)
- Competitor Analysis Tools (Competitor Spy)
- Business Education (Mini MBA courses)
- Trust Score Building for credibility
- Waste Management Marketplace (Waste2Worth)
- AI-powered Business Insights

📋 RESPONSE STRUCTURE GUIDELINES:
1. Start with a brief, clear answer
2. Use bullet points for multiple points
3. Include specific numbers/rates when relevant
4. Add actionable next steps
5. Use emojis sparingly but effectively
6. Keep paragraphs short (2-3 sentences max)
7. Use both Hindi and English naturally
8. End with a helpful suggestion or platform feature

✅ FORMATTING REQUIREMENTS:
- Use clear headings when explaining complex topics
- Break information into digestible chunks
- Include practical examples when possible
- Mention relevant VyapaarVikas features
- Keep responses conversational yet professional

User Question: ${message}

Please provide a well-structured, actionable response that helps MSME business owners make informed decisions.`;

    // Retry logic for Gemini API
    let retries = 2;
    while (retries > 0) {
      try {
        const result = await model.generateContent(contextualPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
      } catch (error: any) {
        retries--;
        console.log(`Gemini API retry attempt. Retries left: ${retries}`);
        
        if (retries === 0) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
