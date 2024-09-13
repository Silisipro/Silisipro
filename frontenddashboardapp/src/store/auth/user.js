import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { setItemStore, removeItemStore } from "@/helpers/localstorage";
import  FetchJSON from '../../helper/api'

export const register = createAsyncThunk('register',
  async (formData, { rejectWithValue }) =>  {
    try {
      const response = await FetchJSON(`register`, 'POST', formData);
      return response
    } catch (error) {
      return rejectWithValue(error); 
    }
});

export const login = createAsyncThunk('login',
  async (formData, { rejectWithValue }) =>  {
    try {
      const response = await FetchJSON(`login`, 'POST', formData);
      return response
    } catch (error) {
      return rejectWithValue(error); 
    }
});

const initialState = {
    isLoggedIn: true,
    jwtToken: "kkkkkk", 
    connecte : true,
    userRloes: 'user',
    register: [],
    login: [],
};




const sidebarSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // toggleSidebar: (state) => {
    //   state.isSidebarOpen = !state.isSidebarOpen;
    // },
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.register = action.payload.data;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.login = action.payload.data;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }  
});

export const { toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer; 
