import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems',async (name,thunkAPI) => {
    try {
        console.log(name, thunkAPI);
        console.log(thunkAPI.getState());
        const response = await axios(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state,{payload}) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter(cartItem => cartItem.id != itemId);
        },
        increase: (state, {payload} ) => {
            const itemToBeIncreased = state.cartItems.find(cartItem => cartItem.id === payload.id);
            itemToBeIncreased.amount += 1;
        },
        decrease: (state, {payload} ) => {
            const itemToBeDecreased = state.cartItems.find(cartItem => cartItem.id === payload.id);
            itemToBeDecreased.amount -= 1;
        },
        calculateTotal: (state) => {
            let total = 0;
            let amount = 0;
            state.cartItems.forEach(cartItem => {
                amount += cartItem.amount;
                total += amount * cartItem.price;
            });
            state.amount = amount;
            state.total = total.toFixed(2);
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = true;
        },
    }
})

export const {clearCart, removeItem, increase, decrease, calculateTotal} = cartSlice.actions;

export default cartSlice.reducer;