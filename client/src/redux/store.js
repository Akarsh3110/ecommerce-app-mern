import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./product-slice"
import shopProductSlice from "./shopProduct-slice"
import shopCartSlice from "./shopCart-slice"
import shopAddressSlice from "./address-slice"
import shopOrderSlice from "./order-slice"
import adminOrderSlice from "./adminOrder-slice"
import shopSearchSlice from "./search-slice"
import shopReviewSlice from "./review-slice"
import contactSlice from "./contact-slice"

const store=configureStore({
    reducer:{
        auth:authReducer,
        contact:contactSlice,

        adminProducts:AdminProductSlice,
        adminOrder:adminOrderSlice,
        
        shopProducts:shopProductSlice,
        shopCart:shopCartSlice,
        shopAddress:shopAddressSlice,
        shopOrder:shopOrderSlice,
        shopSearch:shopSearchSlice,
        shopReview:shopReviewSlice
        
    },
})


export default store;