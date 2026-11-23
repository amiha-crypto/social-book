import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { Post } from '@/entities/post';
import {
  makeSelectCommentCountByPostId,
  makeSelectCommentsByPostId,
} from '@/entities/comment';
import { AddCommentForm } from '@/features/add-comment';
import { DeleteCommentButton } from '@/features/delete-comment';
import { DeletePostButton } from '@/features/delete-post';
import { EditPostButton } from '@/features/edit-post';
import {
  selectIsCommentsExpanded,
  ToggleCommentsButton,
} from '@/features/toggle-comments';
import { Card } from '@/shared/ui';
import styles from './PostCard.module.css';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const selectCommentsByPostId = useMemo(makeSelectCommentsByPostId, []);
  const selectCommentCountByPostId = useMemo(makeSelectCommentCountByPostId, []);

  const isExpanded = useSelector((state: Parameters<typeof selectIsCommentsExpanded>[0]) =>
    selectIsCommentsExpanded(state, post.id),
  );
  const comments = useSelector((state: Parameters<typeof selectCommentsByPostId>[0]) =>
    selectCommentsByPostId(state, post.id),
  );
  const commentCount = useSelector((state: Parameters<typeof selectCommentCountByPostId>[0]) =>
    selectCommentCountByPostId(state, post.id),
  );

  return (
    <Card as="article" className={styles.card} data-testid={`post-card-${post.id}`}>
      <p className={styles.text}>{post.text}</p>
      <hr className={styles.divider} />

      {!isExpanded ? (
        <div className={styles.footer}>
          <div className={styles.commentsMeta}>
            <ToggleCommentsButton postId={post.id} isExpanded={false} />
            <span className={styles.commentCount}>
              Количество комментарий - {commentCount}
            </span>
          </div>
          <div className={styles.actions}>
            <EditPostButton postId={post.id} />
            <DeletePostButton postId={post.id} />
          </div>
        </div>
      ) : (
        <div className={styles.commentsSection}>
          <AddCommentForm postId={post.id} />

          {comments.length > 0 ? (
            <ul className={styles.commentList} aria-label="Список комментариев">
              {comments.map((comment) => (
                <li key={comment.id} className={styles.commentRow}>
                  <Card className={styles.commentBubble}>
                    <p className={styles.commentText}>{comment.text}</p>
                  </Card>
                  <DeleteCommentButton commentId={comment.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyComments}>Комментариев пока нет</p>
          )}

          <div className={styles.hideRow}>
            <ToggleCommentsButton postId={post.id} isExpanded={true} />
          </div>
        </div>
      )}
    </Card>
  );
}
