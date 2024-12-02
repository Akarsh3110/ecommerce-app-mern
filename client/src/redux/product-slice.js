import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    productList:[]
}
// AsyncThunk To add product
export const addNewProduct=createAsyncThunk(
    'products/addnewproduct',
    async (formValues)=>{
        const result= await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/products/add`,formValues,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            })

            return result?.data;
    }
)

export const fetchAllProducts=createAsyncThunk(
    'products/fetchAllProducts',
    async ()=>{
        const result= await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/products/get`)

        return result?.data;
    }
)

export const editProduct=createAsyncThunk(
    'products/editProduct',
    async ({id,formValues})=>{
        const result= await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/products/edit/${id}`,formValues,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            })

            return result?.data;
    }
)

export const deleteProduct=createAsyncThunk(
    'products/deleteProduct',
async (id)=>{
        const result= await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/products/delete/${id}`)

            return result?.data;
    }
)

const AdminProductSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading=false;
            state.productList=action.payload.data;
        }).addCase(fetchAllProducts.rejected,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading=false;
            state.productList=[];
        })
    }
})


export default AdminProductSlice.reducer;