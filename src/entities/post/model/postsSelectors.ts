import { postsAdapter, type PostsState } from './postsSlice';

interface WithPostsState {
  posts: PostsState;
}

const adapterSelectors = postsAdapter.getSelectors<WithPostsState>((state) => state.posts);

export const selectAllPosts = adapterSelectors.selectAll;
export const selectPostById = adapterSelectors.selectById;
export const selectPostIds = adapterSelectors.selectIds;
export const selectTotalPosts = adapterSelectors.selectTotal;
