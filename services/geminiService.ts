
import { GoogleGenAI } from "@google/genai";
import type { StoryInputs } from '../types';

export const generateStory = async (inputs: StoryInputs, language: 'en' | 'bn'): Promise<string> => {
  // FIX: Removed explicit check for API_KEY. The environment variable is assumed to be present.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const languageInstruction = language === 'bn'
    ? "The entire story, including the title, must be written in the Bengali (Bangla) language."
    : "The entire story, including the title, must be written in the English language.";

  const prompt = `
    Generate a complete, cinematic, and emotional short story based on the following details. The story should be well-structured with paragraphs and a bold title at the top.

    ${languageInstruction}

    **Genre:** ${inputs.genre}
    **Main Characters:** ${inputs.characters}
    **Setting:** ${inputs.setting}
    **Plot Outline:** ${inputs.plot}. The story should build psychological tension, blend vivid space imagery with scientific realism, and explore themes of AI ethics, isolation, and the unknown.
    **Perspective:** ${inputs.perspective}
    **Tone:** ${inputs.tone}
    **Story Length:** ${inputs.length}

    The story must have a clear beginning, middle, and a compelling end with the specified twist. Ensure the title is automatically generated and placed at the top in bold.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating story from Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
