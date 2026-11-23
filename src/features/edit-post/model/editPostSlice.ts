import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { postDeleted, postUpdated } from '@/entities/post';

export interface EditPostState {
  editingPostId: string | null;
}

export const initialEditPostState: EditPostState = {
  editingPostId: null,
};

const editPostSlice = createSlice({
  name: 'editPost',
  initialState: initialEditPostState,
  reducers: {
    editModalOpened(state, action: PayloadAction<string>) {
      state.editingPostId = action.payload;
    },
    editModalClosed(state) {
      state.editingPostId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUpdated, (state) => {
        state.editingPostId = null;
      })
      .addCase(postDeleted, (state, action) => {
        if (state.editingPostId === action.payload) {
          state.editingPostId = null;
        }
      });
  },
});

export const { editModalOpened, editModalClosed } = editPostSlice.actions;
export const editPostReducer = editPostSlice.reducer;

interface WithEditPostState {
  editPost: EditPostState;
}

export const selectEditingPostId = (state: WithEditPostState): string | null =>
  state.editPost.editingPostId;
