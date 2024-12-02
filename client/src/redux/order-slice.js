import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState={
    approvalURL:null,
    isLoading:false,
    orderId:null,
    orderList:[],
    orderDetail:null
}

export const createNewOrder=createAsyncThunk('/order/createNewOrder',
    async(orderData)=>{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/shop/order/create`,orderData);
        return response.data
    }
)

export const capturePayment=createAsyncThunk('/order/capturePayment',
    async({paymentId,payerId,orderId})=>{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/shop/order/capture`,
            {
                paymentId,
                payerId,
                orderId
            }
        );
        return response.data
    }
)

export const getAllOrdersByUserId=createAsyncThunk('/order/getAllOrdersByUserId',
    async(userId)=>{
        const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/order/list/${userId}`
        );
        return response.data
    }
)

export const getOrderDetails=createAsyncThunk('/order/getOrderDetails',
    async(id)=>{
        const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/order/details/${id}`
        );
        return response.data
    }
)

const shopOrderSlice=createSlice({
    name:'shopOrderSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createNewOrder.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createNewOrder.fulfilled,(state,action)=>{
            console.log('paaayy',action.payload);
            
            state.isLoading=false;
            state.approvalURL=action.payload.approvalURL;
            state.orderId=action.payload.orderId;
            sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.approvalURL=null;
            state.orderId=null;
            console.error('Order creation failed:', action.payload);
        }).addCase(getAllOrdersByUserId.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllOrdersByUserId.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.orderList=action.payload.data;
        }).addCase(getAllOrdersByUserId.rejected,(state)=>{
            state.isLoading=false;
            state.orderList=[];
        }).addCase(getOrderDetails.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.orderDetail=action.payload.data;
        }).addCase(getOrderDetails.rejected,(state)=>{
            state.isLoading=false;
            state.orderDetail=null;
        })
    }
})

export default shopOrderSlice.reducer;