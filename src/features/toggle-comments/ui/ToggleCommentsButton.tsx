import { useDispatch } from 'react-redux';
import { Button } from '@/shared/ui';
import { commentsToggled } from '../model/toggleCommentsSlice';
import styles from './ToggleCommentsButton.module.css';

export interface ToggleCommentsButtonProps {
  postId: string;
  isExpanded: boolean;
}

export function ToggleCommentsButton({ postId, isExpanded }: ToggleCommentsButtonProps) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="primary"
      size="md"
      className={isExpanded ? styles.hideBtn : styles.showBtn}
      aria-expanded={isExpanded}
      onClick={() => dispatch(commentsToggled(postId))}
    >
      {isExpanded ? 'Спрятать' : 'Комментарии'}
    </Button>
  );
}
