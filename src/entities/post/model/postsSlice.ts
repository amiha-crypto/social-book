import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '@/shared/lib/generateId';
import type { Post } from './types';

export const SEED_POST_1_ID = 'post-seed-1';
export const SEED_POST_2_ID = 'post-seed-2';

const SAMPLE_POST_TEXT =
  'Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.';

export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export type PostsState = ReturnType<typeof postsAdapter.getInitialState>;

export const initialPostsState: PostsState = postsAdapter.setAll(
  postsAdapter.getInitialState(),
  [
    {
      id: SEED_POST_1_ID,
      text: SAMPLE_POST_TEXT,
      createdAt: 2000,
    },
    {
      id: SEED_POST_2_ID,
      text: SAMPLE_POST_TEXT,
      createdAt: 1000,
    },
  ],
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        if (!action.payload.text) {
          return;
        }
        postsAdapter.addOne(state, action.payload);
      },
      prepare(text: string) {
        return {
          payload: {
            id: generateId('post'),
            text: text.trim(),
            createdAt: Date.now(),
          },
        };
      },
    },
    postUpdated(state, action: PayloadAction<{ id: string; text: string }>) {
      const trimmed = action.payload.text.trim();
      if (!trimmed) {
        return;
      }
      postsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { text: trimmed },
      });
    },
    postDeleted(state, action: PayloadAction<string>) {
      postsAdapter.removeOne(state, action.payload);
    },
  },
});

export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
