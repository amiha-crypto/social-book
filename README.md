# Social Book

Одностраничное React-приложение для создания, редактирования и удаления постов и комментариев, разработанное по Figma-макету **Social Book**.

## Технологический стек

- **React 19** + **TypeScript** + **Vite**
- **Redux Toolkit (RTK)** + **React Redux** — управление состоянием через нормализованные слайсы (`createEntityAdapter`), actions, мемоизированные селекторы (`createSelector`) и middleware для сохранения состояния в `localStorage` (`createListenerMiddleware`)
- **CSS Modules** + **CSS Custom Properties** — точное воспроизведение макета Figma и отзывчиво-адаптивная вёрстка (десктоп, планшет, мобильные устройства)
- **Vitest** + **React Testing Library** — модульные и интеграционные тесты

## Архитектура (Feature-Sliced Design)

Проект организован по методологии **Feature-Sliced Design (FSD)** с однонаправленными зависимостями слоёв (`app → pages → widgets → features → entities → shared`):

```text
src/
├── app/            # Конфигурация Redux store, persistence, провайдеры, глобальные стили и дизайн-токены
├── pages/          # Страница ленты (FeedPage)
├── widgets/        # Композитные блоки: PostList, PostCard, EditPostModal
├── features/       # Пользовательские действия и их модели (add-post, edit-post, delete-post, toggle-comments, add-comment, delete-comment)
├── entities/       # Доменные сущности с нормализованными RTK-слайсами (post, comment)
└── shared/         # Переиспользуемый UI-кит (Button, Card, Input, Modal) и утилиты
```

### Redux-хранилище

Все изменения состояния выполняются через actions:

- `posts`: `postAdded`, `postUpdated`, `postDeleted` (`createEntityAdapter<Post>`)
- `comments`: `commentAdded`, `commentDeleted` (`createEntityAdapter<Comment>` + каскадное удаление комментариев по `extraReducers` при `postDeleted`)
- `toggleComments`: `commentsToggled`, `commentsExpanded`, `commentsCollapsed` (очистка состояния при удалении поста)
- `editPost`: `editModalOpened`, `editModalClosed` (автозакрытие при `postUpdated` / `postDeleted`)

## Скрипты

```bash
npm install        # Установка зависимостей
npm run dev        # Запуск dev-сервера
npm test           # Запуск тестов (Vitest)
npm run build      # Проверка типов (tsc) и production-сборка
npm run preview    # Локальный предпросмотр production-сборки
npm run deploy     # Публикация dist/ на ветку gh-pages
```
