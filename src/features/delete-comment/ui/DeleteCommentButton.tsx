import { useDispatch } from 'react-redux';
import { commentDeleted } from '@/entities/comment';
import { Button } from '@/shared/ui';
import styles from './DeleteCommentButton.module.css';

export interface DeleteCommentButtonProps {
  commentId: string;
}

export function DeleteCommentButton({ commentId }: DeleteCommentButtonProps) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="danger"
      size="md"
      className={styles.deleteBtn}
      onClick={() => dispatch(commentDeleted(commentId))}
    >
      Удалить
    </Button>
  );
}
