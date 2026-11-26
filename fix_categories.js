const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/pclenovo/Desktop/WebApp Project/meilleur-convertiseur-pur-sinus/src/content/categories';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    console.log(`Skipping ${file}: No frontmatter match`);
    return;
  }

  let frontmatter = match[1];
  let body = match[2];

  // 1. Rename q to question and r to reponse
  frontmatter = frontmatter.replace(/^(\s*)-\s*q\s*:/gm, '$1- question:');
  frontmatter = frontmatter.replace(/^(\s*)r\s*:/gm, '$1reponse:');

  // 2 & 3. Extract first paragraph
  const bodyParts = body.split(/\r?\n\r?\n/);
  let firstParagraph = '';
  let remainingBody = '';

  let foundIndex = -1;
  for (let i = 0; i < bodyParts.length; i++) {
    if (bodyParts[i].trim().length > 0) {
      firstParagraph = bodyParts[i].trim();
      foundIndex = i;
      break;
    }
  }

  if (foundIndex !== -1) {
    remainingBody = bodyParts.slice(foundIndex + 1).join('\n\n').trim();
    
    // Add texte_presentation to frontmatter
    // We'll put it before faq if possible, or just at the end
    if (frontmatter.includes('faq:')) {
        frontmatter = frontmatter.replace('faq:', `texte_presentation: "${firstParagraph.replace(/"/g, '\\"')}"\nfaq:`);
    } else {
        frontmatter += `\ntexte_presentation: "${firstParagraph.replace(/"/g, '\\"')}"`;
    }

    const newContent = `---\n${frontmatter}\n---\n\n${remainingBody}\n`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Processed ${file}`);
  } else {
    console.log(`Skipping ${file}: No body paragraph found`);
  }
});
