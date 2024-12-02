import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    isLoading:false,
    messageList:[]
}

export const addNewMessage=createAsyncThunk(
    '/contact/addNewMessage',
    async(contactValues)=>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/shop/contact/add`,contactValues)
        return response.data
    }
)

export const fetchAllMessages=createAsyncThunk(
    '/contact/fetchAllMessages',
    async()=>{
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/shop/contact/get`,
    
        )
        return response.data
    }
)

const contactSlice=createSlice({
    name:'contactSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewMessage.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addNewMessage.fulfilled,(state,action)=>{
            console.log(action.payload.data,'cooo');
            
            state.isLoading=false;
            state.messageList=action.payload.data
        }).addCase(addNewMessage.rejected,(state)=>{
            state.isLoading=false;
            state.messageList=[];
        }).addCase(fetchAllMessages.pending,(state)=>{
            state.isLoading=true;
        }).addCase(fetchAllMessages.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.messageList=action.payload.data
        }).addCase(fetchAllMessages.rejected,(state)=>{
            state.isLoading=false;
            state.messageList=[];
        })
    }
})

export default contactSlice.reducer;