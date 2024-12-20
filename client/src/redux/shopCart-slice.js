import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const initialState={
    isLoading:false,
    cartItems:[]
}


export const addToCart=createAsyncThunk(
    'cart/addTocart',
    async({userId,productId,quantity})=>{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/shop/cart/add`,
            {userId,productId,quantity}
        )

        return response.data
    }
)

export const fetchCartItems=createAsyncThunk(
    'cart/fetchCartItems',
    async(userId)=>{
        const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/cart/get/${userId}`
        )

        return response.data
    }
)

export const deleteCartItem=createAsyncThunk(
    'cart/deleteCartItem',
    async({userId,productId})=>{
        const response=await axios.delete(`${process.env.REACT_APP_API_URL}/api/shop/cart/${userId}/${productId}`,
        )

        return response.data
    }
)

export const updateCartQty=createAsyncThunk(
    'cart/updateCartQty',
    async({userId,productId,quantity})=>{
        const response=await axios.put(`${process.env.REACT_APP_API_URL}/api/shop/cart/update-cart`,
            {userId,productId,quantity}
        )

        return response.data
    }
)


const shopCartSlice=createSlice({
    name:'shopCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data;
            console.log(action.payload)
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(fetchCartItems.pending,(state)=>{
            state.isLoading=true;
        }).addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data;
        }).addCase(fetchCartItems.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(updateCartQty.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateCartQty.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data;
        }).addCase(updateCartQty.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        }).addCase(deleteCartItem.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteCartItem.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.cartItems=action.payload.data;
        }).addCase(deleteCartItem.rejected,(state)=>{
            state.isLoading=false;
            state.cartItems=[];
        })
    }
})

export default shopCartSlice.reducer;