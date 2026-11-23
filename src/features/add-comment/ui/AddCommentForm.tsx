import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { commentAdded } from '@/entities/comment';
import { Button, Input } from '@/shared/ui';
import styles from './AddCommentForm.module.css';

export interface AddCommentFormProps {
  postId: string;
}

export function AddCommentForm({ postId }: AddCommentFormProps) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    dispatch(commentAdded(postId, trimmed));
    setText('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Добавить комментарий">
      <Input
        type="text"
        inputSize="md"
        surface="white"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Новый комментарий ..."
        aria-label="Текст нового комментария"
        className={styles.input}
      />
      <Button type="submit" variant="primary" size="md" className={styles.submitBtn}>
        Добавить
      </Button>
    </form>
  );
}
