
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  blankLayout: false
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    onBlankLayout: (state) =>{
        state.blankLayout = !state.blankLayout
    }
  },
});

export const { toggleSidebar, onBlankLayout } = sidebarSlice.actions
export default sidebarSlice.reducer; 
