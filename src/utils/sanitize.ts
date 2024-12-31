import DOMPurify from 'dompurify';

// Configure DOMPurify with safe defaults
const config = {
  ALLOWED_TAGS: ['span', 'br', 'p'],
  ALLOWED_ATTR: ['class'],
  ALLOWED_CLASSES: {
    'span': ['text-blue-600']
  }
};

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, config);
}

export function sanitizePlainText(text: string): string {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

// Safely format mentions and hashtags
export function formatMentionsAndHashtags(
  content: string,
  mentions: Array<{ name: string }>,
  hashtags: Array<{ tag: string }>
): string {
  let safeContent = sanitizePlainText(content);

  // Format mentions
  mentions.forEach(mention => {
    const safeName = sanitizePlainText(mention.name);
    const regex = new RegExp(`@${safeName}\\b`, 'g');
    safeContent = safeContent.replace(
      regex,
      `<span class="text-blue-600">@${safeName}</span>`
    );
  });

  // Format hashtags
  hashtags.forEach(tag => {
    const safeTag = sanitizePlainText(tag.tag);
    const regex = new RegExp(`#${safeTag}\\b`, 'g');
    safeContent = safeContent.replace(
      regex,
      `<span class="text-blue-600">#${safeTag}</span>`
    );
  });

  return sanitizeHtml(safeContent);
}
