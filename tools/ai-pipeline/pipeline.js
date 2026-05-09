import { designTokensAgent } from './agents/designTokensAgent.js';
import { appendToCSS } from './utils/fileWriter.js';
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function runPipeline() {
    console.log("Запуск Design Tokens Pipeline...\n");

    const result = await designTokensAgent("Предложи улучшения и дополнения к существующей системе дизайна");
    console.log(result.cssAdditions);

    rl.question('\nПрименить эти изменения в static/css/tokens.css? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            appendToCSS('static/css/tokens.css', result.cssAdditions.replace(':root {', '').replace('}', ''));
            console.log("Изменения применены!");
        } else {
            console.log("Изменения отменены.");
        }
        rl.close();
    });
}

runPipeline();
