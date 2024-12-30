import { ProviderModelType } from "../types/ProviderModelType";
  
// Defined implementation for the providers and models to be used alike
export const PROVIDER_MODEL: ProviderModelType = {
    openai: [
        'gpt-4o',
        'gpt-4o-mini',
        'gpt-4-turbo',
        'o1',
        'o1-mini'
    ],
    anthropic: [
        'claude-3-5-sonnet-20241022',
        'claude-3-5-haiku-20241022',
        'claude-3-opus-20240229'
    ],
    mistral: [
        'pixtral-large-latest',
        'pixtral-12b-2409'
    ],
    googlegenerativeai : [
        'gemini-2.0-flash-exp',
        'gemini-1.5-pro-latest',
        'gemini-1.5-pro',
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash'
    ],
    groq: [
        'llama-3.3-70b-versatile',
        'llama-3.1-8b-instant',
        'gemma2-9b-it',
        'mixtral-8x7b-32768'
    ]
};