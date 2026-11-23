import type { PostsState } from '@/entities/post';
import type { CommentsState } from '@/entities/comment';
import type { ToggleCommentsState } from '@/features/toggle-comments';

const STORAGE_KEY = 'social_book_state_v1';

export interface PersistedAppState {
  posts: PostsState;
  comments: CommentsState;
  toggleComments: ToggleCommentsState;
}

function isEntityState(value: unknown): value is { ids: string[]; entities: Record<string, unknown> } {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray((value as { ids?: unknown }).ids) &&
    typeof (value as { entities?: unknown }).entities === 'object' &&
    (value as { entities?: unknown }).entities !== null
  );
}

export function loadPersistedState(): Partial<PersistedAppState> | undefined {
  if (typeof window === 'undefined' || !window.localStorage) {
    return undefined;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return undefined;
    }
    const parsed = JSON.parse(raw) as Partial<PersistedAppState>;
    if (!isEntityState(parsed.posts) || !isEntityState(parsed.comments)) {
      return undefined;
    }

    const expandedPostIds =
      typeof parsed.toggleComments?.expandedPostIds === 'object' &&
      parsed.toggleComments?.expandedPostIds !== null
        ? parsed.toggleComments.expandedPostIds
        : {};

    return {
      posts: parsed.posts,
      comments: parsed.comments,
      toggleComments: { expandedPostIds },
    };
  } catch {
    return undefined;
  }
}

export function savePersistedState(state: PersistedAppState): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or privacy mode errors gracefully
  }
}
