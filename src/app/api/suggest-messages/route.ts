import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
// StreamingTextResponse:- jaise-jaise response genrate hoga usi taraha aate jayega(one-one word)
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// next js me edge time par chalta hai ai 
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      max_tokens: 400,
      stream: true,
      prompt,
    });

    const stream = OpenAIStream(response);
    
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) { // OpenAI ka error hai to error me se sabhi chij(name,status.. ) nikal rahe hai.
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
}



// import { GeminiAI } from 'gemini-ai'; // Adjust the import based on the actual SDK
// import { GeminiAIStream, StreamingTextResponse } from 'ai'; // Adjust based on Gemini AI streaming implementation
// import { NextResponse } from 'next/server';

// const gemini = new GeminiAI({
//   apiKey: process.env.GEMINI_AI_API_KEY, // Update with your Gemini AI API key
// });

// // next.js runtime configuration for edge-side execution
// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await gemini.completions.create({
//       model: 'gemini-1.5', // or 'gemini-2.0', based on your chosen model
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     // Ensure response is valid for streaming
//     if (!response.readable) {
//       throw new Error('Invalid response: Streaming not supported');
//     }

//     const stream = GeminiAIStream(response);

//     return new StreamingTextResponse(stream, {
//       // Optional headers for customization (e.g., Content-Type)
//     });
//   } catch (error) {
//     if (error instanceof GeminiAI.APIError) {
//       // Handle Gemini AI specific errors gracefully
//       const { name, status, headers, message } = error;
//       console.error('Gemini AI API error:', error);
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       // Handle general errors with informative messages
//       console.error('An unexpected error occurred:', error);
//       return NextResponse.json({ message: 'Internal server error. Please try again later.' }, { status: 500 });
//     }
//   }
// }
