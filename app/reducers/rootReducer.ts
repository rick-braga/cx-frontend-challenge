import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
// Importe outros reducers conforme necessário

const rootReducer = combineReducers({
  products: productsReducer,
  // Adicione outros reducers aqui
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
