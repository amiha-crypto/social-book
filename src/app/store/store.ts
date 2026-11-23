import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  postAdded,
  postDeleted,
  postsReducer,
  postUpdated,
} from '@/entities/post';
import {
  commentAdded,
  commentDeleted,
  commentsReducer,
} from '@/entities/comment';
import {
  commentsCollapsed,
  commentsExpanded,
  commentsToggled,
  toggleCommentsReducer,
} from '@/features/toggle-comments';
import { editPostReducer } from '@/features/edit-post';
import { loadPersistedState, savePersistedState } from './persistence';

export const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  toggleComments: toggleCommentsReducer,
  editPost: editPostReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function createAppStore(
  preloadedState?: Partial<RootState>,
  enablePersistence = false,
) {
  const listenerMiddleware = createListenerMiddleware();

  if (enablePersistence) {
    listenerMiddleware.startListening({
      matcher: isAnyOf(
        postAdded,
        postUpdated,
        postDeleted,
        commentAdded,
        commentDeleted,
        commentsToggled,
        commentsExpanded,
        commentsCollapsed,
      ),
      effect: (_action, listenerApi) => {
        const state = listenerApi.getState() as RootState;
        savePersistedState({
          posts: state.posts,
          comments: state.comments,
          toggleComments: state.toggleComments,
        });
      },
    });
  }

  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
}

export const store = createAppStore(loadPersistedState(), true);

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];
