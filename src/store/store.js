import { configureStore } from '@reduxjs/toolkit';
import neetSlice from './neetSlice';

// { console.log("check store", neetSlice.questions) }

const store = configureStore({
  reducer: {
    neet: neetSlice.reducer,
    // Add other reducers here if needed
  },
});

export default store;