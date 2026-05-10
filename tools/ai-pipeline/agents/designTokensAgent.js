import { config } from '../config.js';
import { createAgent, tool } from "langchain";
import * as z from "zod";
import { ChatGroq } from "@langchain/groq";
const llm = new ChatGroq({
    model: config.model,
    temperature: config.temperature,
    maxTokens: config.maxTokens,
    apiKey: config.apiKey
})

const getWeather = tool(
    (input) => `В городе ${input.city} сейчас +22°C, солнечно и без осадков.`,
    {
        name: "get_weather",
        description: "Получить текущую погоду в городе. Всегда вызывай этот инструмент, если пользователь спрашивает про погоду.",
        schema: z.object({
            city: z.string().describe("Название города (например: Москва, Париж, New York)")
        })
    }
);
const calculator = tool(
    ({ a, b, operation }) => {
        switch (operation) {
            case "add": return `${a} + ${b} = ${a + b}`;
            case "subtract": return `${a} - ${b} = ${a - b}`;
            case "multiply": return `${a} × ${b} = ${a * b}`;
            case "divide": return b !== 0 ? `${a} ÷ ${b} = ${a / b}` : "Ошибка: деление на ноль";
            default: return "Неизвестная операция";
        }
    },
    {
        name: "calculator",
        description: "Выполняет арифметические операции. Используй, когда нужно посчитать что-то.",
        schema: z.object({
            a: z.number().describe("Первое число"),
            b: z.number().describe("Второе число"),
            operation: z.enum(["add", "subtract", "multiply", "divide"]).describe("Операция")
        })
    }
);

const agent = createAgent({
    model: llm,
    tools: [getWeather,calculator],
    systemPrompt: `Ты полезный русскоязычный ассистент.
Отвечай кратко и по делу.
Если вопрос касается погоды — обязательно используй инструмент get_weather.
Если нужен расчёт — используй инструмент calculator.
Никогда не придумывай цифры сам.`
})
async function main() {
    const result = await agent.invoke({
        messages: [
      { role: "user", content: "Какая погода в Париже и сколько будет 23 + 19?" }
    ]
    })
    console.log("Ответ агента:", result);
}
main()
