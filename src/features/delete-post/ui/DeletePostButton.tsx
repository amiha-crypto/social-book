import { useDispatch } from 'react-redux';
import { postDeleted } from '@/entities/post';
import { Button } from '@/shared/ui';
import styles from './DeletePostButton.module.css';

export interface DeletePostButtonProps {
  postId: string;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="danger"
      size="md"
      className={styles.deleteBtn}
      onClick={() => dispatch(postDeleted(postId))}
    >
      Удалить
    </Button>
  );
}
