import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    productList:[],
    productDetails:null
}

export const fetchAllFilteredProducts=createAsyncThunk(
    'products/fetchAllFilteredProducts',
    async ()=>{
        const result= await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/products/get`)

        return result?.data;
    }
)

export const fetchProductDetails=createAsyncThunk(
    'products/fetchProductDetails',
    async (id)=>{
        const result= await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/products/get/${id}`)

        return result?.data;
    }
)

const shopProductSlice=createSlice({
    name:'shopProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending,(state,action)=>{
            state.isLoading=true
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading=false
            state.productList=action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading=false
            state.productList=[]
        }).addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading=true
        }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
            console.log(action.payload.data);
            
            state.isLoading=false
            state.productDetails=action.payload.data;
        }).addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading=false
            state.productDetails=null
        })
    }
})

export default shopProductSlice.reducer