import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, type AppStore } from '../store/store';

export interface StoreProviderProps {
  customStore?: AppStore;
  children: ReactNode;
}

export function StoreProvider({ customStore = store, children }: StoreProviderProps) {
  return <Provider store={customStore}>{children}</Provider>;
}
