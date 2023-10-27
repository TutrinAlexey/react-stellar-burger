import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    burgerActive: true,
    orderListActive: false,
    accountActive: false,
}

const linkSlice = createSlice({
    name: "link",
    initialState,
    reducers: {
        burgerLink: (state, action) => {
            state.burgerActive = true;
            state.orderListActive = false;
            state.accountActive = false;
        },
        orderListLink: (state, action) => {
            state.burgerActive = false;
            state.orderListActive = true;
            state.accountActive = false;
        },
        accountLink: (state, action) => {
            state.burgerActive = false;
            state.orderListActive = false;
            state.accountActive = true;
        },
    }
})

export const {burgerLink, orderListLink, accountLink} = linkSlice.actions;
export default linkSlice.reducer;