// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  // Outras opções da store, como middleware, podem ser adicionadas aqui
});

export type AppDispatch = typeof store.dispatch;

export default store;
