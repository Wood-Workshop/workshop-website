import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(process.cwd(), '');

export function appendToCSS(relativePath, newVariables) {
    const fullPath = path.join(PROJECT_ROOT, relativePath);
    const dir = path.dirname(fullPath);

    console.log(`Пытаемся сохранить в: ${fullPath}`);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Создана папка: ${dir}`);
    }

    let content = '';

    if (fs.existsSync(fullPath)) {
        content = fs.readFileSync(fullPath, 'utf8');
    } else {
        content = `/* Design Tokens for Workshop Website */\n\n:root {\n\n}`;
    }

    const cleanVars = newVariables
        .replace(':root {', '')
        .replace('}', '')
        .trim();
    if (content.includes(':root')) {
        content = content.replace(
            /:root\s*\{([\s\S]*?)\}/,
            `:root {\n$1\n\n  /* === Added by Design Tokens Agent === */\n${cleanVars}\n}`
        );
    } else {
        content += `\n\n:root {\n${cleanVars}\n}`;
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Успешно добавлено в ${relativePath}`);
}
