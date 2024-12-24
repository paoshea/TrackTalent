import type {
  StatusContent,
  StatusMention,
  StatusHashtag,
} from "../types/status";

export function parseStatusContent(content: string): Partial<StatusContent> {
  const mentions = extractMentions(content);
  const hashtags = extractHashtags(content);

  return {
    text: content,
    mentions,
    hashtags,
  };
}

function extractMentions(content: string): StatusMention[] {
  const mentions: StatusMention[] = [];
  const mentionRegex = /@\[([^\]]+)\]\((\w+):([^)]+)\)/g;
  let match;

  while ((match = mentionRegex.exec(content)) !== null) {
    const [fullMatch, name, type, id] = match;
    mentions.push({
      id,
      type: type as "user" | "company" | "job",
      name,
      range: [match.index, match.index + fullMatch.length],
    });
  }

  return mentions;
}

function extractHashtags(content: string): StatusHashtag[] {
  const hashtags: StatusHashtag[] = [];
  const hashtagRegex = /#(\w+)/g;
  let match;

  while ((match = hashtagRegex.exec(content)) !== null) {
    hashtags.push({
      tag: match[1],
      range: [match.index, match.index + match[0].length],
    });
  }

  return hashtags;
}

export function formatStatusContent(content: StatusContent): string {
  let formattedContent = content.text;

  // Sort ranges in descending order to avoid offset issues
  const allRanges = [
    ...(content.mentions || []).map((m) => ({
      type: "mention" as const,
      item: m,
      range: m.range,
    })),
    ...(content.hashtags || []).map((h) => ({
      type: "hashtag" as const,
      item: h,
      range: h.range,
    })),
  ].sort((a, b) => b.range[0] - a.range[0]);

  // Apply formatting from end to start
  for (const rangeItem of allRanges) {
    const [start, end] = rangeItem.range;
    const prefix = formattedContent.slice(0, start);
    const suffix = formattedContent.slice(end);

    if (rangeItem.type === "mention") {
      formattedContent = `${prefix}@[${rangeItem.item.name}](${rangeItem.item.type}:${rangeItem.item.id})${suffix}`;
    } else {
      formattedContent = `${prefix}#${rangeItem.item.tag}${suffix}`;
    }
  }

  return formattedContent;
}

export function stripStatusFormatting(content: string): string {
  return content
    .replace(/@\[([^\]]+)\]\(\w+:[^)]+\)/g, "@$1") // Replace mentions with @username
    .replace(/#(\w+)/g, "#$1"); // Keep hashtags as is
}
