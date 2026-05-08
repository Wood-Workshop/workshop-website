import dotenv from 'dotenv';
dotenv.config();

export const config = {
    apiKey: process.env.AI_API_KEY,
    provider: 'llama',

    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    model: process.env.AI_MODEL || 'llama-3.3-70b-versatile',

    temperature: 0.65,
    maxTokens: 6000

};
