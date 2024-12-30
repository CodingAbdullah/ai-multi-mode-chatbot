import { openai } from '@ai-sdk/openai';
import { groq } from '@ai-sdk/groq';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { mistral } from '@ai-sdk/mistral';
import { LanguageModelV1, streamText } from 'ai';
import { PROVIDER_MODEL } from '@/app/utils/providerModel';

export const maxDuration = 30;

// Custom API route for working with front-end request
export async function POST(req: Request) {
    const { messages, input, selectedProvider, selectedModel } = await req.json();

    // Check if messages or input is undefined
    if (!messages || !input) {
        throw new Error('Messages or input must be defined');
    }

    // Type checking and input verification
    let modelType: string | object | LanguageModelV1 = selectedProvider; // Initialize with selectedProvider
    let modifiedModel = selectedModel === '-- Select a Model --' ? PROVIDER_MODEL[selectedProvider][0] : selectedModel;

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