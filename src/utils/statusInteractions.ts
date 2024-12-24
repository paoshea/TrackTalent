import type { StatusContent } from "../types/status";

export function extractUserMentions(content: StatusContent): string[] {
  const mentionRegex = /@(\w+)/g;
  const matches = content.text.matchAll(mentionRegex);
  return Array.from(matches, (match: RegExpMatchArray) => match[1]);
}

export function shouldNotifyUser(
  username: string,
  content: StatusContent,
): boolean {
  const mentions = extractUserMentions(content);
  return mentions.includes(username);
}

export function generateNotificationText(content: StatusContent): string {
  const maxLength = 50;
  const text =
    content.text.length > maxLength
      ? `${content.text.slice(0, maxLength)}...`
      : content.text;

  return text;
}

export function getStatusVisibility(
  content: StatusContent,
): "public" | "mentioned" {
  return content.mentions && content.mentions.length > 0
    ? "mentioned"
    : "public";
}
