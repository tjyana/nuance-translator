
import { GoogleGenAI } from "@google/genai";
import type { LanguageOption, FormalityLevel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTranslation = async (
    text: string,
    language: LanguageOption,
    level: FormalityLevel
): Promise<string> => {
    if (!text.trim()) {
        throw new Error("Input text cannot be empty.");
    }

    const prompt = `Translate the following text into ${language}.
The desired style is "${level.title}".
This style is described as: "${level.description}".
Provide only the translated text as a raw string, without any additional formatting, explanations, or labels.

TEXT: "${text}"`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are an expert linguist and cultural translator, skilled in capturing the nuanced tones of different communication styles. Your task is to provide a single, direct translation for a given text, adhering strictly to the requested language and style. You must only output the translated text.",
            },
        });

        const resultText = response.text.trim();
        if (!resultText) {
             throw new Error("The API returned an empty translation.");
        }
        return resultText;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get translation: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching the translation.");
    }
};
