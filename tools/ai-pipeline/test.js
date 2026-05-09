import { callLLM } from './utils/llmclient.js';

async function test() {
    try {
        const result = await callLLM(
            "Ты полезный помощник.",
            "Напиши короткое приветствие на русском языке в формате JSON: { \"message\": \"текст\" }",
            true
        );
        console.dir(result, { depth: null });
    } catch (error) {
        console.error("Ошибка:", error.message);
    }
}

test();
