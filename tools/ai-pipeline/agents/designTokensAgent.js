import { callLLM } from '../utils/llmClient.js';
import { readProjectContext } from '../utils/fileReader.js';

export async function designTokensAgent(taskDescription) {
    const projectContext = readProjectContext();
    const systemPrompt = `Ты — профессиональный эксперт по Design Tokens и дизайн-системам.

Проект: Workshop Website — сайт мастерской по дереву и металлу.
Стиль: премиум, craftsmanship, натуральные материалы, тёплый минимализм, качество ручной работы.

Ты должен создавать качественные дизайн-токены.

Отвечай **только** JSON в таком формате:

{
  "thinking": "твои рассуждения по стилю проекта",
  "tokens": {
    "colors": { ... },
    "spacing": { ... },
    "typography": { ... },
    "borderRadius": { ... },
    "shadows": { ... }
  },
  "css": ":root { ... все CSS переменные ... }",
  "recommendations": "твои советы"
}`;
    const userPrompt = `Структура проекта:\n${projectContext.structure.slice(0, 30).join('\n')}\n\nЗадача: ${taskDescription}`;
    const result = await callLLM(systemPrompt, userPrompt, true);
    return result
}
