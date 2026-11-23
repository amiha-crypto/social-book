import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { postDeleted, SEED_POST_1_ID, SEED_POST_2_ID } from '@/entities/post';
import { generateId } from '@/shared/lib/generateId';
import type { Comment } from './types';

export const commentsAdapter = createEntityAdapter<Comment>({
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

export type CommentsState = ReturnType<typeof commentsAdapter.getInitialState>;

export const initialCommentsState: CommentsState = commentsAdapter.setAll(
  commentsAdapter.getInitialState(),
  [
    {
      id: 'comment-seed-1',
      postId: SEED_POST_1_ID,
      text: 'Первый комментарий о выше сказанном посте ...',
      createdAt: 1001,
    },
    {
      id: 'comment-seed-2',
      postId: SEED_POST_1_ID,
      text: 'Второй комментарий о выше сказанном посте ...',
      createdAt: 1002,
    },
    {
      id: 'comment-seed-3',
      postId: SEED_POST_2_ID,
      text: 'Первый комментарий о выше сказанном посте ...',
      createdAt: 2001,
    },
    {
      id: 'comment-seed-4',
      postId: SEED_POST_2_ID,
      text: 'Второй комментарий о выше сказанном посте ...',
      createdAt: 2002,
    },
  ],
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialCommentsState,
  reducers: {
    commentAdded: {
      reducer(state, action: PayloadAction<Comment>) {
        if (!action.payload.text) {
          return;
        }
        commentsAdapter.addOne(state, action.payload);
      },
      prepare(postId: string, text: string) {
        return {
          payload: {
            id: generateId('comment'),
            postId,
            text: text.trim(),
            createdAt: Date.now(),
          },
        };
      },
    },
    commentDeleted(state, action: PayloadAction<string>) {
      commentsAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postDeleted, (state, action) => {
      const deletedPostId = action.payload;
      const idsToRemove = state.ids.filter((id) => {
        const comment = state.entities[id];
        return comment?.postId === deletedPostId;
      });
      commentsAdapter.removeMany(state, idsToRemove);
    });
  },
});

export const { commentAdded, commentDeleted } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
