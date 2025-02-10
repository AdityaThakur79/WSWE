// src/Redux/slice/SpinnerSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Spinner Slice for managing loading state
const spinnerSlice = createSlice({
  name: 'spinner',
  initialState: {
    isloading: false,
  },
  reducers: {
    showSpinner: (state) => {
      state.isloading = true;
    },
    hideSpinner: (state) => {
      state.isloading = false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
