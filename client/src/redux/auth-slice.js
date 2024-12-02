import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState={
    isAuthenticated:false,
    isLoading:false,
    user:null,
    usersList:[]
}

export const getAllUsersList=createAsyncThunk('/auth/getAllUsers',
    async()=>{
        const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/get`
        );
        return response.data
    }
)

//AsyncThunk For Register
export const registerUser=createAsyncThunk('/auth/register',

    async(values)=>{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`,
            values,
            {
                withCredentials:true
            }
        )
        return response.data
    }
)


//AsyncThunk For Login
export const loginUser=createAsyncThunk('/auth/login',

    async(values)=>{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
            values,
            {
                withCredentials:true
            }
        )
        return response.data
    }
)

//AsyncThunk For Logout
export const logoutUser=createAsyncThunk('/auth/logout',

    async()=>{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`,
            {},
            {
                withCredentials:true
            }
        )
        return response.data
    }
)

//AsyncThunk For UserVerification with token
export const checkAuth=createAsyncThunk('/auth/checkauth',

    async()=>{
        const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/check-auth`,
            {
                withCredentials:true,
                headers:{
                    'Cache-control':'no-store, no-cache, must-revalidate,proxy-revalidate',
                }
            }
        )
        return response.data
    }
)

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        // setUser:(state,action)=>{

        // }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user= action.payload.success ? action.payload.user : null;
            state.isAuthenticated=action.payload.success ;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
        })
        .addCase(checkAuth.pending,(state)=>{
            state.isLoading=true
        }).addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user= action.payload.success ? action.payload.user : null;
            state.isAuthenticated=action.payload.success ;
        }).addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isAuthenticated=false;
            console.error('Error in checkAuth:', action.error.message);
        }).addCase(logoutUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user= null;
            state.isAuthenticated=false ;
        }).addCase(getAllUsersList.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllUsersList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.usersList= action.payload.data
            // state.isAuthenticated=action.payload.success ;
        }).addCase(getAllUsersList.rejected,(state,action)=>{
            state.isLoading=false;
            state.usersList=[];
        })
    }
})

// export const {setUser}=authSlice.actions;
export default authSlice.reducer