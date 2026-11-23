import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from '@/entities/post';
import { Button, Card, Input } from '@/shared/ui';
import styles from './AddPostForm.module.css';

export function AddPostForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    dispatch(postAdded(trimmed));
    setText('');
  };

  return (
    <Card className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit} aria-label="Добавить новый пост">
        <Input
          type="text"
          inputSize="lg"
          surface="surface"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Новый пост ..."
          aria-label="Текст нового поста"
          className={styles.input}
        />
        <Button type="submit" variant="primary" size="lg" className={styles.submitBtn}>
          Добавить
        </Button>
      </form>
    </Card>
  );
}
