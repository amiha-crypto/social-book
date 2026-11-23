import { useDispatch } from 'react-redux';
import { Button } from '@/shared/ui';
import { editModalOpened } from '../model/editPostSlice';
import styles from './EditPostButton.module.css';

export interface EditPostButtonProps {
  postId: string;
}

export function EditPostButton({ postId }: EditPostButtonProps) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="primary"
      size="md"
      className={styles.editBtn}
      onClick={() => dispatch(editModalOpened(postId))}
    >
      Изменить
    </Button>
  );
}
