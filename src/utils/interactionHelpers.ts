import type { Interaction } from "../types/interaction";

export function groupInteractionsByType(interactions: Interaction[] = []) {
  return interactions.reduce(
    (groups, interaction) => {
      const type = interaction.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(interaction);
      return groups;
    },
    {} as Record<string, Interaction[]>,
  );
}

export function getInteractionCount(
  interactions: Interaction[] = [],
  type: string,
) {
  return interactions.filter((interaction) => interaction.type === type).length;
}

export function hasUserInteracted(
  interactions: Interaction[] = [],
  userId: string,
  type: string,
) {
  return interactions.some(
    (interaction) => interaction.userId === userId && interaction.type === type,
  );
}

export function getLatestInteraction(
  interactions: Interaction[] = [],
  type: string,
) {
  return interactions
    .filter((interaction) => interaction.type === type)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
}

export function getInteractionUsers(
  interactions: Interaction[] = [],
  type: string,
) {
  return interactions
    .filter((interaction) => interaction.type === type)
    .map((interaction) => interaction.userId);
}

export function getInteractionsByUser(
  interactions: Interaction[] = [],
  userId: string,
) {
  return interactions.filter((interaction) => interaction.userId === userId);
}

export function getInteractionTypes(interactions: Interaction[] = []) {
  return Array.from(
    new Set(interactions.map((interaction) => interaction.type)),
  );
}

export function getInteractionTimeline(interactions: Interaction[] = []) {
  return interactions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .reduce(
      (timeline, interaction) => {
        const date = new Date(interaction.createdAt).toLocaleDateString();
        if (!timeline[date]) {
          timeline[date] = [];
        }
        timeline[date].push(interaction);
        return timeline;
      },
      {} as Record<string, Interaction[]>,
    );
}
