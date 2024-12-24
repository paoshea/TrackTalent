import type { StatusContent } from "../types/status";

export function formatMentions(text: string): string {
  return text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
}

export function formatHashtags(text: string): string {
  return text.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
}

export function formatLinks(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
  );
}

export function formatStatusText(content: StatusContent): string {
  let formattedText = content.text;
  formattedText = formatMentions(formattedText);
  formattedText = formatHashtags(formattedText);
  formattedText = formatLinks(formattedText);
  return formattedText;
}
