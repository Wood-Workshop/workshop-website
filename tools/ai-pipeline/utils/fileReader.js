import fs from 'fs';
import path from 'path';

export function readProjectContext() {
    const context = {
        structure: [],
        files: {}
    };
    const basePath = path.resolve(process.cwd(), '../');

    console.log(`Корень проекта: ${basePath}`);

    function scan(currentDir) {
        const items = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(currentDir, item.name);
            const relativePath = path.relative(basePath, fullPath);

            if (item.isDirectory()) {
                if (!item.name.startsWith('.') && item.name !== 'node_modules' && item.name !== '.git') {
                    context.structure.push(relativePath + '/');
                    scan(fullPath);
                }
            }
            else if (['.css', '.js', '.html', '.json', '.md', '.scss'].some(ext =>
                     item.name.endsWith(ext))) {

                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    context.files[relativePath] = content;
                    context.structure.push(relativePath);
                } catch (err) {}
            }
        }
    }

    scan(basePath);

    console.log(`Прочитано ${context.structure.length} элементов`);
    return context;
}
