import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
    reviews:[]
}

export const addReview=createAsyncThunk('/order/addReview',
    async(data)=>{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/shop/review/add`,data
        );
        return response.data
    }
)

export const getReviews=createAsyncThunk('/order/getReviews',
    async(id)=>{
        const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/review/${id}`
        );
        return response.data
    }
)

const reviewSlice=createSlice({
    name:'reviewSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getReviews.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getReviews.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.reviews=action.payload.data;
        }).addCase(getReviews.rejected,(state)=>{
            state.isLoading=false;
            state.reviews=[];
        })
    }
})

export default reviewSlice.reducer;