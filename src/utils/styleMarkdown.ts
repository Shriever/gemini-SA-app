import { marked } from 'marked';
import chalk from 'chalk';

// Sample markdown string


export function renderMarkdown(markdown: string) {
  const tokens = marked.lexer(markdown);

  for (const token of tokens) {
    switch (token.type) {
      case 'heading':
        const heading = chalk.bold.underline(token.text);
        console.log(`\n${heading}`);
        break;
      case 'paragraph':
        console.log(token.text);
        break;
      case 'strong':
        console.log(chalk.bold(token.text));
        break;
      case 'blockquote':
        console.log(chalk.gray.italic(`> ${token.text}`));
        break;
      case 'code':
        console.log(chalk.bgBlackBright(`\n${token.text}\n`));
        break;
      case 'list':
        for (const item of token.items) {
          console.log(`- ${item.text}`);
        }
        break;
      default:
        // For raw text or unsupported types
        if ('text' in token) {
          console.log(token.text);
        }
    }
  }
}
