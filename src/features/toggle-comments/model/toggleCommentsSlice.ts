import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { postDeleted, SEED_POST_2_ID } from '@/entities/post';

export interface ToggleCommentsState {
  expandedPostIds: Record<string, boolean>;
}

export const initialToggleCommentsState: ToggleCommentsState = {
  expandedPostIds: {
    [SEED_POST_2_ID]: true,
  },
};

const toggleCommentsSlice = createSlice({
  name: 'toggleComments',
  initialState: initialToggleCommentsState,
  reducers: {
    commentsToggled(state, action: PayloadAction<string>) {
      const postId = action.payload;
      if (state.expandedPostIds[postId]) {
        delete state.expandedPostIds[postId];
      } else {
        state.expandedPostIds[postId] = true;
      }
    },
    commentsExpanded(state, action: PayloadAction<string>) {
      state.expandedPostIds[action.payload] = true;
    },
    commentsCollapsed(state, action: PayloadAction<string>) {
      delete state.expandedPostIds[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postDeleted, (state, action) => {
      delete state.expandedPostIds[action.payload];
    });
  },
});

export const { commentsToggled, commentsExpanded, commentsCollapsed } =
  toggleCommentsSlice.actions;
export const toggleCommentsReducer = toggleCommentsSlice.reducer;

interface WithToggleCommentsState {
  toggleComments: ToggleCommentsState;
}

export const selectIsCommentsExpanded = (
  state: WithToggleCommentsState,
  postId: string,
): boolean => Boolean(state.toggleComments.expandedPostIds[postId]);
