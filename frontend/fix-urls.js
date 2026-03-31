const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next') {
                replaceInDir(fullPath);
            }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('http://localhost:3001')) {
                console.log(`Fixing: ${fullPath}`);
                // Replace hardcoded URL with env variable. 
                // We use backticks to handle the template string.
                // If it was already in a string, we might need more logic but let's do a safe replace.
                content = content.replace(/['"]http:\/\/localhost:3001['"]/g, "process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'");
                content = content.replace(/http:\/\/localhost:3001/g, "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}");
                fs.writeFileSync(fullPath, content);
            }
        }
    });
}

replaceInDir('./src');
console.log('Complete!');
