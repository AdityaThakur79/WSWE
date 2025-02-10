// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from './slice/SpinnerSlice';

export const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
  },
});

export default store;
