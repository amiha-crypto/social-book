import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { createAppStore } from '@/app/store/store';
import { SEED_POST_1_ID, SEED_POST_2_ID } from '@/entities/post';
import { FeedPage } from './FeedPage';

function renderFeed() {
  const store = createAppStore();
  const utils = render(
    <StoreProvider customStore={store}>
      <FeedPage />
    </StoreProvider>,
  );
  return { store, ...utils };
}

describe('FeedPage integration', () => {
  it('renders initial posts matching the Figma layout (first collapsed, second expanded)', () => {
    renderFeed();

    const firstCard = screen.getByTestId(`post-card-${SEED_POST_1_ID}`);
    const secondCard = screen.getByTestId(`post-card-${SEED_POST_2_ID}`);

    expect(within(firstCard).getByText('Комментарии')).toBeInTheDocument();
    expect(within(firstCard).getByText('Количество комментарий - 2')).toBeInTheDocument();
    expect(within(firstCard).getByText('Изменить')).toBeInTheDocument();
    expect(within(firstCard).getByText('Удалить')).toBeInTheDocument();

    expect(within(secondCard).getByPlaceholderText('Новый комментарий ...')).toBeInTheDocument();
    expect(within(secondCard).getByText('Спрятать')).toBeInTheDocument();
    expect(
      within(secondCard).getByText('Первый комментарий о выше сказанном посте ...'),
    ).toBeInTheDocument();
  });

  it('creates a new post via AddPostForm and dispatches postAdded', async () => {
    const user = userEvent.setup();
    renderFeed();

    const input = screen.getByPlaceholderText('Новый пост ...');
    await user.type(input, 'Мой первый созданный пост');
    await user.click(screen.getAllByRole('button', { name: 'Добавить' })[0]);

    expect(screen.getByText('Мой первый созданный пост')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('toggles comments visibility via Комментарии and Спрятать buttons', async () => {
    const user = userEvent.setup();
    renderFeed();

    const firstCard = screen.getByTestId(`post-card-${SEED_POST_1_ID}`);
    await user.click(within(firstCard).getByRole('button', { name: 'Комментарии' }));

    expect(within(firstCard).getByRole('button', { name: 'Спрятать' })).toBeInTheDocument();
    expect(
      within(firstCard).getByText('Первый комментарий о выше сказанном посте ...'),
    ).toBeInTheDocument();

    await user.click(within(firstCard).getByRole('button', { name: 'Спрятать' }));
    expect(within(firstCard).getByRole('button', { name: 'Комментарии' })).toBeInTheDocument();
  });

  it('adds and deletes a comment and updates the counter when collapsed', async () => {
    const user = userEvent.setup();
    renderFeed();

    const secondCard = screen.getByTestId(`post-card-${SEED_POST_2_ID}`);
    const commentInput = within(secondCard).getByPlaceholderText('Новый комментарий ...');

    await user.type(commentInput, 'Отличная идея для ужина!');
    await user.click(within(secondCard).getByRole('button', { name: 'Добавить' }));

    expect(within(secondCard).getByText('Отличная идея для ужина!')).toBeInTheDocument();

    const deleteButtons = within(secondCard).getAllByRole('button', { name: 'Удалить' });
    expect(deleteButtons).toHaveLength(3);
    await user.click(deleteButtons[0]);

    expect(within(secondCard).getAllByRole('button', { name: 'Удалить' })).toHaveLength(2);

    await user.click(within(secondCard).getByRole('button', { name: 'Спрятать' }));
    expect(within(secondCard).getByText('Количество комментарий - 2')).toBeInTheDocument();
  });

  it('edits a post in the modal and supports canceling with Закрыть', async () => {
    const user = userEvent.setup();
    renderFeed();

    const firstCard = screen.getByTestId(`post-card-${SEED_POST_1_ID}`);
    await user.click(within(firstCard).getByRole('button', { name: 'Изменить' }));

    const dialog = screen.getByRole('dialog', { name: 'Редактирование поста' });
    const textarea = within(dialog).getByRole('textbox', { name: 'Текст поста' });

    await user.clear(textarea);
    await user.type(textarea, 'Временный текст');
    await user.click(within(dialog).getByRole('button', { name: 'Закрыть' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Временный текст')).not.toBeInTheDocument();

    await user.click(within(firstCard).getByRole('button', { name: 'Изменить' }));
    const dialog2 = screen.getByRole('dialog', { name: 'Редактирование поста' });
    const textarea2 = within(dialog2).getByRole('textbox', { name: 'Текст поста' });
    await user.clear(textarea2);
    await user.type(textarea2, 'Сохранённый новый текст поста');
    await user.click(within(dialog2).getByRole('button', { name: 'Подтвердить' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(within(firstCard).getByText('Сохранённый новый текст поста')).toBeInTheDocument();
  });

  it('deletes a post and cleans up its comments in Redux store', async () => {
    const user = userEvent.setup();
    const { store } = renderFeed();

    const firstCard = screen.getByTestId(`post-card-${SEED_POST_1_ID}`);
    await user.click(within(firstCard).getByRole('button', { name: 'Удалить' }));

    expect(screen.queryByTestId(`post-card-${SEED_POST_1_ID}`)).not.toBeInTheDocument();
    const remainingPost1Comments = Object.values(store.getState().comments.entities).filter(
      (c) => c?.postId === SEED_POST_1_ID,
    );
    expect(remainingPost1Comments).toHaveLength(0);
  });
});
