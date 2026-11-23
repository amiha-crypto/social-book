import { createSelector } from '@reduxjs/toolkit';
import { commentsAdapter, type CommentsState } from './commentsSlice';

interface WithCommentsState {
  comments: CommentsState;
}

const adapterSelectors = commentsAdapter.getSelectors<WithCommentsState>(
  (state) => state.comments,
);

export const selectAllComments = adapterSelectors.selectAll;

export const makeSelectCommentsByPostId = () =>
  createSelector(
    [selectAllComments, (_state: WithCommentsState, postId: string) => postId],
    (comments, postId) => comments.filter((comment) => comment.postId === postId),
  );

export const makeSelectCommentCountByPostId = () =>
  createSelector(
    [selectAllComments, (_state: WithCommentsState, postId: string) => postId],
    (comments, postId) => comments.reduce((acc, item) => (item.postId === postId ? acc + 1 : acc), 0),
  );
