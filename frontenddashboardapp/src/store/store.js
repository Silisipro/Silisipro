
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../store/sidebar/sidebarSlice';
import servicegoogleReducer from './serviceSlice/servicegoogleSlice';
import userReducer from '../store/auth/user';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
    servicegoogle: servicegoogleReducer,
  },
});

export default store;