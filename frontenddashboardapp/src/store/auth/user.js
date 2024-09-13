import axios from "axios";
import { API_BASE_URL } from "../../constants/ApiConstant";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  FetchJSON from '../../helper/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { setItemStore, removeItemStore } from "@/helpers/localstorage";

export const registerUser = createAsyncThunk(
  'register/user',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, data);
      // On retourne uniquement les données pertinentes
      return response.data; 
    } catch (error) {
      // Gestion des erreurs pour renvoyer un message sérialisé
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const registerGoogle = createAsyncThunk(
  'registerGoogle/user',
  
  async (data, { rejectWithValue }) => {
    try {
      const email = data.email;
      const name = data.name;
      const response = await axios.post(`${API_BASE_URL}/login/google/${email}/${name}`, data);
      // On retourne uniquement les données pertinentes
      return response.data; 
    } catch (error) {
      // Gestion des erreurs pour renvoyer un message sérialisé
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const login = createAsyncThunk(
  'login/user',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);
      // On retourne uniquement les données pertinentes
      return response.data; 
    } catch (error) {
      // Gestion des erreurs pour renvoyer un message sérialisé
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const logout = createAsyncThunk(
  'logout/user',
  async () => {
      const response = await axios.post(`${API_BASE_URL}/logout`);
      return response.data; 
   
  }
);



const initialState = {
    isLoggedIn: true,
    jwtToken: localStorage.getItem('accessToken') || '', 
    connecte : true,
    userRloes: 'user',
    userInfos: localStorage.getItem('information') || '',
    register: [],
    login: [],
};




const sidebarSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload?.data || action.payload;
        if(action.payload?.status_code === 200 ) {
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
        // Assurez-vous que vous accédez aux données correctement
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // Utilisez le message d'erreur sérialisé
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(registerGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload?.data || action.payload;
        if(action.payload?.status_code === 200 ) {
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
        // Assurez-vous que vous accédez aux données correctement
      })
      .addCase(registerGoogle.rejected, (state, action) => {
        state.loading = false;
        // Utilisez le message d'erreur sérialisé
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // Vérifiez l'accès aux données
        state.login = action.payload?.data || action.payload;
        if(action.payload?.status_code === 200 ) {
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // Utilisez le message d'erreur sérialisé
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(logout .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout .fulfilled, (state, action) => {
        state.loading = false;
        // Vérifiez l'accès aux données
        state.logout  = action.payload?.data || action.payload;
        if(action.payload?.status_code === 200 ) {
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
      })
      .addCase(logout .rejected, (state, action) => {
        state.loading = false;
        // Utilisez le message d'erreur sérialisé
        state.error = action.payload?.message || action.error.message;
      });
  }  
});


export const { toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer; 
