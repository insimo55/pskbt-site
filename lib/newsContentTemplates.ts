export const DEFAULT_NEWS_CONTENT = `## Основной раздел

Текст новости. Поддерживается **Markdown**: заголовки, списки, выделение.

### Подзаголовок

- пункт списка;
- ещё пункт.
`;

export function createNewsContentTemplate(title?: string): string {
  if (!title?.trim()) return DEFAULT_NEWS_CONTENT;
  return `## ${title.trim()}

Краткое вступление к новости.

### Подробности

Основной текст статьи.
`;
}
