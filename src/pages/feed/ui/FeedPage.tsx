import { AddPostForm } from '@/features/add-post';
import { EditPostModal } from '@/widgets/edit-post-modal';
import { PostList } from '@/widgets/post-list';
import styles from './FeedPage.module.css';

export function FeedPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.addFormSection}>
          <AddPostForm />
        </div>
        <PostList />
      </div>
      <EditPostModal />
    </main>
  );
}
