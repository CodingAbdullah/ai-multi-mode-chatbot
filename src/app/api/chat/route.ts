import { openai } from '@ai-sdk/openai';
import { groq } from '@ai-sdk/groq';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { mistral } from '@ai-sdk/mistral';
import { LanguageModelV1, streamText } from 'ai';
import { PROVIDER_MODEL } from '@/app/utils/providerModel';
import { NextRequest } from 'next/server';

export const maxDuration = 30;

// Custom API route for working with front-end request
export async function POST(req: NextRequest) {
    const { messages, input, selectedProvider, selectedModel } = await req.json();

    // Type checking and input verification
    let modelType: string | object | LanguageModelV1 = selectedProvider; // Initialize with selectedProvider
    const modifiedModel = selectedModel === '-- Select a Model --' ? PROVIDER_MODEL[selectedProvider][0] : selectedModel;

    // Custom switch statement for working with select AI models
    switch (modelType) {
        case 'openai':
            modelType = openai(modifiedModel);
            break;
        case 'groq':
            modelType = groq(modifiedModel);
            break;
        case 'anthropic':
            modelType = anthropic(modifiedModel);
            break;
        case 'mistral':
            modelType = mistral(modifiedModel);
            break;
        case 'google':
            modelType = google(modifiedModel);
            break;
        default:
            throw new Error('Invalid provider selected');
    }

    // Stream text function for handling streams of text
    const result = streamText({
        model: modelType as LanguageModelV1,
        prompt: input as string
    });

    return result.toDataStreamResponse();
}