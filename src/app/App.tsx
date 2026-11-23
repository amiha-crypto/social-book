import { FeedPage } from '@/pages/feed';
import { StoreProvider } from './providers/StoreProvider';

export function App() {
  return (
    <StoreProvider>
      <FeedPage />
    </StoreProvider>
  );
}
