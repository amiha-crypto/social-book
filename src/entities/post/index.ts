export type { Post } from './model/types';
export {
  postsAdapter,
  postsReducer,
  postAdded,
  postUpdated,
  postDeleted,
  initialPostsState,
  SEED_POST_1_ID,
  SEED_POST_2_ID,
} from './model/postsSlice';
export type { PostsState } from './model/postsSlice';
export {
  selectAllPosts,
  selectPostById,
  selectPostIds,
  selectTotalPosts,
} from './model/postsSelectors';
