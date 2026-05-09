import { designTokensAgent } from './agents/designTokensAgent.js';

async function test() {
    console.log("🚀 Тестируем Design Tokens Agent...\n");

    const result = await designTokensAgent(
        "Создай дизайн-токены для главной страницы сайта мастерской. Стиль премиум, дерево и металл."
    );

    console.log("\n=== РЕЗУЛЬТАТ ===");
    console.dir(result, { depth: null });
}

test();
