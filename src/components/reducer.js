import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartItems: []
};

let slice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },

        removeFromCart: (state, action) => {
            const { index, quantity } = action.payload;
            const currentQuantity = state.cartItems[index]?.Quantity || 0;
            if (quantity >= currentQuantity) {
                state.cartItems.splice(index, 1);
            } else {
                state.cartItems[index].Quantity -= quantity;
            }
        },

        clearCart(state, action) {
            state.cartItems = [];
        },

        updateQuantity: (state, action) => {
            const { index, quantity } = action.payload;
            state.cartItems[index].Quantity = quantity;
        },

        increaseQuantity: (state, action) => {
            const { index, quantityToAdd } = action.payload;
            state.cartItems[index].Quantity += quantityToAdd;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, increaseQuantity } = slice.actions;
export default slice.reducer;
