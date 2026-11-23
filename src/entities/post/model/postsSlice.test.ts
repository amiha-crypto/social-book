import { describe, expect, it } from 'vitest';
import {
  initialPostsState,
  postAdded,
  postDeleted,
  postsReducer,
  postUpdated,
  SEED_POST_1_ID,
} from './postsSlice';

describe('postsSlice', () => {
  it('adds a trimmed post via postAdded action', () => {
    const next = postsReducer(initialPostsState, postAdded('  Новый тестовый пост  '));
    expect(next.ids).toHaveLength(3);
    const added = Object.values(next.entities).find((p) => p?.text === 'Новый тестовый пост');
    expect(added).toBeDefined();
  });

  it('ignores empty or whitespace-only posts', () => {
    const next = postsReducer(initialPostsState, postAdded('   '));
    expect(next.ids).toHaveLength(2);
  });

  it('updates post text via postUpdated action', () => {
    const next = postsReducer(
      initialPostsState,
      postUpdated({ id: SEED_POST_1_ID, text: '  Обновлённый текст поста  ' }),
    );
    expect(next.entities[SEED_POST_1_ID]?.text).toBe('Обновлённый текст поста');
  });

  it('removes a post via postDeleted action', () => {
    const next = postsReducer(initialPostsState, postDeleted(SEED_POST_1_ID));
    expect(next.ids).toHaveLength(1);
    expect(next.entities[SEED_POST_1_ID]).toBeUndefined();
  });
});
