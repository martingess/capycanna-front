import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { loadState, saveState, loadStateSession, saveStateSession } from '@utils';
import configs from '@configs';

const persistedState = loadState();
const persistedStateSession = loadStateSession();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: { ...persistedState, ...persistedStateSession },
  devTools: !!configs?.LOCAL,
});

store.subscribe(() => {
  const { user, billing, account } = store.getState();
  saveState({ user });
  saveStateSession({ billing, account });
});

export default store;
