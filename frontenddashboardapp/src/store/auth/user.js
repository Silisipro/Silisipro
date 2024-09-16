import axios from "axios";
import { API_BASE_URL } from "../../constants/ApiConstant";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  FetchJSON from '../../helper/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBedPulse } from "react-icons/fa6";
import { act } from "react-dom/test-utils";


const ACCESS_TOKEN = localStorage.getItem('token_access') 

const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
};

export const registerUser = createAsyncThunk(
  'register/user',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, data);
      
      return response.data; 
    } catch (error) {
    
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
     
      return response.data; 
    } catch (error) {
    
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const activerService = createAsyncThunk(
  'activerService/user',
  
  async (name, { rejectWithValue }) => {
    try {
   
      const response = await axios.post(`${API_BASE_URL}/service/activeService/${name}`, {}, { headers });
     
      return response.data; 
    } catch (error) {
    
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const desactiverService = createAsyncThunk(
  'desactiverService/user',
  
  async (id, { rejectWithValue }) => {
    try {
   
      const response = await axios.post(`${API_BASE_URL}/service/desactiveService/${id}`, {}, { headers });
     
      return response.data; 
    } catch (error) {
    
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);


export const getService = createAsyncThunk(
  'getService/user',
  
  async () => {
    try {
   
      const response = await axios.get(`${API_BASE_URL}/service/getUserService`, { headers });
     
      return response.data; 
    } catch (error) {
    
      return 
    }
  }
);

export const listUser = createAsyncThunk(
  'listUser/user',
  
  async () => {
    try {
   
      const response = await axios.get(`${API_BASE_URL}/users/getUser`, { headers });
     
      return response.data; 
    } catch (error) {
    
      return 
    }
  }
);

export const listUserAdmin = createAsyncThunk(
  'listUserAdmin/user',
  
  async () => {
    try {
   
      const response = await axios.get(`${API_BASE_URL}/users/getAdmin`, { headers });
     
      return response.data; 
    } catch (error) {
    
      return 
    }
  }
);


export const mashAdmin = createAsyncThunk(
  'mashAdmin/user',
  
  async (id, { rejectWithValue }) => {
    try {
   
      const response = await axios.post(`${API_BASE_URL}/users/AssignRoleAdminToUser/${id}`, {}, { headers });
     
      return response.data; 
    } catch (error) {
    
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'deleteUser/user',
  
  async (id, { rejectWithValue }) => {
    try {
   
      const response = await axios.post(`${API_BASE_URL}/users/destroy/${id}`, {}, { headers });
     
      return response.data; 
    } catch (error) {
    
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const unmashAdmin = createAsyncThunk(
  'unmashAdmin/user',
  
  async (id, { rejectWithValue }) => {
    try {
   
      const response = await axios.post(`${API_BASE_URL}/users/RevokeRoleAdminToUser/${id}`, {}, { headers });
     
      return response.data; 
    } catch (error) {
    
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const showUser = createAsyncThunk(
  'desactiverService/user',
  
  async (id, { rejectWithValue }) => {
    try {
   
      const response = await axios.get(`${API_BASE_URL}/users/show/${id}`, { headers });
     
      return response.data; 
    } catch (error) {
    
      return rejectWithValue({
        message: error.response?.data?.message || 'Une erreur est survenue',
        status: error.response?.status || 500,
      });
    }
  }
);

export const getStatics = createAsyncThunk(
  'getStatics/user',
  
  async () => {
    try {
   
      const response = await axios.get(`${API_BASE_URL}/users/getStatics`,  { headers });
     
      return response.data; 
    } catch (error) {
    
      return 
    }
  }
);

export const login = createAsyncThunk(
  'login/user',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);

      return response.data; 
    } catch (error) {
   
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
      const response = await axios.post(`${API_BASE_URL}/logout`, {}, { headers });
      return response.data; 
   
  }
);



const initialState = {
    isLoggedIn: localStorage.getItem('est_logger') || false,
    jwtToken: localStorage.getItem('token_access') || null, 
    jwtTokenGoogle: localStorage.getItem('token_access_google') || null, 
    connecte : localStorage.getItem('est_conneter') || false,
    isAdmin: localStorage.getItem('meninolonin') === 'true' || false,
    userInfos: localStorage.getItem('userInfo') || '',
    register: [],
    login: [],
    services : [],
    userlist : [],
    userlistAdmin: [],
    userStatistic: {},
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
    
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
     
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

          console.log(action);
          state.connecte = true
          state.isLoggedIn= true
          state.jwtToken = action.payload?.data.token
          state.isAdmin = action.payload?.data.is_admin
          const tokene = action.payload?.data.token
          const meninolon = action.payload?.data.is_admin
          const user = action.payload?.data.user
          localStorage.setItem('token_access', tokene)
          localStorage.setItem('est_conneter', true)
          localStorage.setItem('est_logger', true)
          localStorage.setItem('userLogger', JSON.stringify(user))

          if (meninolon == 0) {
            state.isAdmin = false
            localStorage.setItem('meninolonin', false)
          }else {
            state.isAdmin = true
            localStorage.setItem('meninolonin', true)
          }
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
       
      })
      .addCase(registerGoogle.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        
    
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
  
        state.login = action.payload?.data || action.payload;
        if(action.payload?.status_code === 200 ) {
          state.connecte = true
          state.isLoggedIn= true
          
          state.jwtToken = action.payload?.data.token
          state.isAdmin = action.payload?.data.is_admin
          const tokene = action.payload?.data.token
          const meninolon = action.payload?.data.is_admin
          const user = action.payload?.data.user
          localStorage.setItem('token_access', tokene)
          localStorage.setItem('est_conneter', true)
          localStorage.setItem('est_logger', true)
          localStorage.setItem('userLogger', JSON.stringify(user))

          if (meninolon == 0) {
            state.isAdmin = false
            localStorage.setItem('meninolonin', false)
          }else {
            state.isAdmin = true
            localStorage.setItem('meninolonin', true)
          }
        
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
      
        state.logout  = action.payload?.data || action.payload;
        if(action.payload?.status_code === 200 ) {
          localStorage.clear()
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        localStorage.clear()
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(getService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload
         
      })
      .addCase(getService.rejected, (state, action) => {
        state.loading = false;
   
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(listUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUser.fulfilled, (state, action) => {
        state.loading = false;
        
        state.userlist = action.payload.data
         
      })
      .addCase(listUser.rejected, (state, action) => {
        state.loading = false;
   
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(listUserAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        
        state.userlistAdmin = action.payload.data
         
      })
      .addCase(listUserAdmin.rejected, (state, action) => {
        state.loading = false;
   
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(mashAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mashAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload?.status_code === 200 ) {
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
        
        state.userlistAdmin = action.payload.data
         
      })
      .addCase(mashAdmin.rejected, (state, action) => {
        state.loading = false;
   
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(unmashAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unmashAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload?.status_code === 200 ) {
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
        
        state.userlistAdmin = action.payload.data
         
      })
      .addCase(unmashAdmin.rejected, (state, action) => {
        state.loading = false;
   
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload?.status_code === 200 ) {
          toast.success(action.payload?.message)
        } else {
          toast.error(action.payload?.message)
        }
        
        state.userlistAdmin = action.payload.data
         
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
   
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(getStatics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatics.fulfilled, (state, action) => {
        state.loading = false;
       
        
        state.userStatistic = action.payload.data
         
      })
      .addCase(getStatics.rejected, (state, action) => {
        state.loading = false;
   
        state.error = action.payload?.message || action.error.message;
      });
  }  
});


export const { toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer; 
