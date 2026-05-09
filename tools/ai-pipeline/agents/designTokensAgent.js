import { callLLM } from '../utils/llmClient.js';
import { readProjectContext } from '../utils/fileReader.js';

export async function designTokensAgent(taskDescription = "") {

    const projectContext = readProjectContext();

    const systemPrompt = `Ты — ведущий Design Systems Designer премиум-класса (работал с люксовыми craft-брендами).

**ТВОЯ ГЛАВНАЯ ЗАДАЧА:**
1. Внимательно изучи ВСЕ предоставленные файлы проекта.
2. Выдели **все текущие токены** (цвета, шрифты, отступы и т.д.), которые уже используются.
3. Предложи **улучшенную и расширенную** систему токенов, которая идеально подходит для премиум мастерской по дереву и металлу.
4. Делай акцент на тёплые, глубокие, натуральные цвета дерева и металла.

**Стиль проекта:** Warm Artisan Luxury, Tactile Craft, Organic Elegance.

**Цветовая палитра должна передавать:**
- Глубокое тёплое дерево (орех, дуб, вишня, морёный дуб)
- Благородный металл (латунь, бронза, кованая сталь)
- Тёплые нейтральные тона с глубиной

Отвечай **строго только JSON** в следующем формате:

{
  "thinking": "Что ты увидел в проекте + почему предлагаешь именно эти улучшения",
  "currentTokens": {
    "colors": { ... все цвета, которые ты нашёл в проекте ... },
    "typography": { ... },
    "spacing": { ... }
  },
  "proposedImprovements": {
    "newColors": { ... новые цвета, которых не хватает ... },
    "enhancedTokens": { ... улучшенные версии существующих токенов ... },
    "newUtilities": { ... новые полезные токены ... }
  },
  "cssAdditions": ":root { только новые и улучшенные переменные ... }",
  "recommendations": "что ещё можно сделать для премиум-ощущения"
}`;

 let userPrompt = `Структура проекта:\n${projectContext.structure.slice(0, 40).join('\n')}\n\n`;

    userPrompt += "\nСодержимое важных файлов (только начало):\n";
    for (const [filePath, content] of Object.entries(projectContext.files)) {
        if (filePath.includes('.css') || filePath.includes('.html') || filePath.includes('README')) {
            const shortContent = content.substring(0, 400);
            userPrompt += `\n--- ${filePath} ---\n${shortContent}\n...\n`;
        }
    }

    userPrompt += `\nЗадача: ${taskDescription || "Предложи улучшения дизайна"}`;

    console.log("Design Tokens Agent анализирует проект...");

    const result = await callLLM(systemPrompt, userPrompt, true,'openai/gpt-oss-20b');
    return result;
}
