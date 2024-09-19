import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemCart: (state, action) => {
            const { id, price, quantity } = action.payload;
            const itemFound = state.items.find(item => item.id === id);
            if (itemFound) {
                itemFound.quantity += quantity; 
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); 
            }
            state.total += price * quantity;
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.total += item.price; 
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.total -= item.price; 
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload); 
                    state.total -= item.price; 
                }
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);
            if (itemIndex !== -1) {
                state.total -= state.items[itemIndex].price * state.items[itemIndex].quantity;
                state.items.splice(itemIndex, 1); 
            }
        },
    },
});

export const { addItemCart, clearCart, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
