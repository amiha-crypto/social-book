import { describe, expect, it } from 'vitest';
import { postDeleted, SEED_POST_1_ID, SEED_POST_2_ID } from '@/entities/post';
import {
  commentAdded,
  commentDeleted,
  commentsReducer,
  initialCommentsState,
} from './commentsSlice';
import {
  makeSelectCommentCountByPostId,
  makeSelectCommentsByPostId,
} from './commentsSelectors';

describe('commentsSlice', () => {
  it('adds a comment bound to a specific postId', () => {
    const next = commentsReducer(
      initialCommentsState,
      commentAdded(SEED_POST_1_ID, '  Третий комментарий  '),
    );
    const selectComments = makeSelectCommentsByPostId();
    const post1Comments = selectComments({ comments: next }, SEED_POST_1_ID);
    expect(post1Comments).toHaveLength(3);
    expect(post1Comments[2].text).toBe('Третий комментарий');
  });

  it('deletes a single comment via commentDeleted', () => {
    const next = commentsReducer(initialCommentsState, commentDeleted('comment-seed-1'));
    const selectCount = makeSelectCommentCountByPostId();
    expect(selectCount({ comments: next }, SEED_POST_1_ID)).toBe(1);
    expect(selectCount({ comments: next }, SEED_POST_2_ID)).toBe(2);
  });

  it('cascade-deletes all comments when their parent post is deleted', () => {
    const next = commentsReducer(initialCommentsState, postDeleted(SEED_POST_1_ID));
    const selectCount = makeSelectCommentCountByPostId();
    expect(selectCount({ comments: next }, SEED_POST_1_ID)).toBe(0);
    expect(selectCount({ comments: next }, SEED_POST_2_ID)).toBe(2);
  });
});
