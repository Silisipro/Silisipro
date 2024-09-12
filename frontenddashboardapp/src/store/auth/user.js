
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    jwtToken: null, 
    connecte : false,
    userRloes: 'user'
};

const sidebarSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // toggleSidebar: (state) => {
    //   state.isSidebarOpen = !state.isSidebarOpen;
    // },
  },
});

export const { toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer; 
