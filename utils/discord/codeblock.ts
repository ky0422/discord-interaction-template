export default (content: any, lang?: string) =>
    `\`\`\`${lang ?? 'text'}\n${content}\n\`\`\``;
