import { useSelector } from 'react-redux';
import { selectAllPosts } from '@/entities/post';
import { PostCard } from '@/widgets/post-card';
import { Card } from '@/shared/ui';
import styles from './PostList.module.css';

export function PostList() {
  const posts = useSelector(selectAllPosts);

  if (posts.length === 0) {
    return (
      <Card className={styles.emptyState}>
        <p className={styles.emptyText}>Постов пока нет. Добавьте первый пост выше!</p>
      </Card>
    );
  }

  return (
    <section className={styles.list} aria-label="Лента постов">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
