import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
    addressList:[]
}

export const addNewAddress=createAsyncThunk(
    '/address/addNewAddress',
    async(addressValues)=>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/shop/address/add`,addressValues)
        return response.data
    }
)

export const fetchAllAddresses=createAsyncThunk(
    '/address/fetchAllAddresses',
    async(userId)=>{
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/shop/address/get/${userId}`,
    
        )
        return response.data
    }
)

export const editaAddress=createAsyncThunk(
    '/address/editaAddress',
    async({userId,addressId,addressValues})=>{
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/shop/address/update/${userId}/${addressId}`,
            addressValues
        )
        return response.data
    }
)

export const deleteAddress=createAsyncThunk(
    '/address/deleteAddress',
    async({userId,addressId})=>{
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/shop/address/delete/${userId}/${addressId}`,
          
        )
        return response.data
    }
)

const addressSlice=createSlice({
    name:'address',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewAddress.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isLoading=false;
            // state.addressList=action.payload.data;
        }).addCase(addNewAddress.rejected,(state,action)=>{
            state.isLoading=false;
            // state.addressList=[];
        }).addCase(fetchAllAddresses.pending,(state)=>{
            state.isLoading=true;
        }).addCase(fetchAllAddresses.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.addressList=action.payload.data;
        }).addCase(fetchAllAddresses.rejected,(state,action)=>{
            state.isLoading=false;
            state.addressList=[];
        })
    }
})

export default addressSlice.reducer