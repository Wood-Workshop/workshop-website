import { config } from '../config.js';

export async function callLLM(systemPrompt, userPrompt, requireJson = true) {

    let finalSystemPrompt = systemPrompt;

    if (requireJson) {
        finalSystemPrompt += `\n\nВАЖНО: Ответь ТОЛЬКО валидным JSON объектом. Без markdown, без текста до или после JSON.`;
    }
    try {
        const response = await fetch(config.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    { role: "system", content: finalSystemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: config.temperature,
                max_tokens: config.maxTokens
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        let resultText = data.choices[0].message.content;

        if (requireJson) {
            try {
                return JSON.parse(resultText);
            } catch (e) {
                const match = resultText.match(/\{[\s\S]*\}/);
                return JSON.parse(match ? match[0] : resultText);
            }
        }

        return resultText;

    } catch (error) {
        console.error("Ошибка при запросе к Groq:", error.message);
        throw error;
    }
}
