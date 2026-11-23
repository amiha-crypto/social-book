import { useEffect, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUpdated, selectPostById } from '@/entities/post';
import { editModalClosed, selectEditingPostId } from '@/features/edit-post';
import { Button, Modal } from '@/shared/ui';
import styles from './EditPostModal.module.css';

export function EditPostModal() {
  const dispatch = useDispatch();
  const editingPostId = useSelector(selectEditingPostId);
  const editingPost = useSelector((state: Parameters<typeof selectPostById>[0]) =>
    editingPostId ? selectPostById(state, editingPostId) : undefined,
  );

  const [draftText, setDraftText] = useState('');

  useEffect(() => {
    if (editingPost) {
      setDraftText(editingPost.text);
    }
  }, [editingPost]);

  const handleClose = () => {
    dispatch(editModalClosed());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingPost) {
      return;
    }
    const trimmed = draftText.trim();
    if (!trimmed) {
      return;
    }
    dispatch(postUpdated({ id: editingPost.id, text: trimmed }));
  };

  return (
    <Modal
      isOpen={Boolean(editingPost)}
      onClose={handleClose}
      ariaLabel="Редактирование поста"
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={draftText}
          onChange={(event) => setDraftText(event.target.value)}
          aria-label="Текст поста"
          rows={3}
          autoFocus
        />
        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className={styles.confirmBtn}
            disabled={!draftText.trim()}
          >
            Подтвердить
          </Button>
          <Button
            type="button"
            variant="danger"
            size="md"
            className={styles.closeBtn}
            onClick={handleClose}
          >
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
}
