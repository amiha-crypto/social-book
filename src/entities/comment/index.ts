export type { Comment } from './model/types';
export {
  commentsAdapter,
  commentsReducer,
  commentAdded,
  commentDeleted,
  initialCommentsState,
} from './model/commentsSlice';
export type { CommentsState } from './model/commentsSlice';
export {
  selectAllComments,
  makeSelectCommentsByPostId,
  makeSelectCommentCountByPostId,
} from './model/commentsSelectors';
