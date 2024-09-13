
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../store/sidebar/sidebarSlice';
import userReducer from '../store/auth/user';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
  },
});

export default store;