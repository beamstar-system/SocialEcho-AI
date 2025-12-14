import { GoogleGenAI } from "@google/genai";
import { AspectRatio, ImageSize, SocialPlatform, Tone } from "../types";
import { PLATFORM_CONFIG } from "../constants";

// Ensure API key is available
if (!process.env.API_KEY) {
  console.error("API_KEY environment variable is missing.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper to get platform specific instruction
const getSystemInstruction = (platform: SocialPlatform, tone: Tone): string => {
  const base = `You are an expert social media manager. Tone: ${tone}.`;
  
  switch (platform) {
    case SocialPlatform.LinkedIn:
      return `${base} Write a LinkedIn post. Structure with a hook, insights (bullet points if applicable), and a call to action. Professional but engaging. Use relevant hashtags.`;
    case SocialPlatform.Twitter:
      return `${base} Write a Twitter/X post. Short, punchy, under 280 characters. Use emojis and 2-3 high-traffic hashtags. No fluff.`;
    case SocialPlatform.Instagram:
      return `${base} Write an Instagram caption. Engaging, relatable, and visual-focused language. Include a block of 10-15 relevant, high-reach hashtags at the bottom.`;
    default:
      return base;
  }
};

export const generatePlatformText = async (
  platform: SocialPlatform, 
  idea: string, 
  tone: Tone
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Draft a post about: "${idea}".`,
      config: {
        systemInstruction: getSystemInstruction(platform, tone),
        temperature: 0.7,
      }
    });
    return response.text || "Failed to generate text.";
  } catch (error) {
    console.error(`Error generating text for ${platform}:`, error);
    return "Error generating content. Please try again.";
  }
};

export const generatePlatformImage = async (
  platform: SocialPlatform,
  idea: string,
  tone: Tone,
  size: ImageSize,
  forcedAspectRatio: AspectRatio | null
): Promise<string | undefined> => {
  try {
    const aspectRatio = forcedAspectRatio || PLATFORM_CONFIG[platform].defaultAspectRatio;
    
    // Prompt engineering for better images
    const imagePrompt = `A high-quality, photorealistic image representing the concept: "${idea}". 
    The mood is ${tone}. Optimized for social media visual appeal. 
    Ensure high contrast and vibrant details suitable for ${platform}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: imagePrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: size
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return undefined;
  } catch (error) {
    console.error(`Error generating image for ${platform}:`, error);
    return undefined; // Return undefined so UI handles "no image" state gracefully
  }
};