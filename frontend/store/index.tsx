import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

let initialState = 1;

const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment(state) {
            console.log(initialState);
            initialState = initialState + 1;
        },
        decrement(state) {
            return initialState - 1;
        }
    }
});

const store = configureStore({
    reducer: {counter: counterSlice.reducer},
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
        serializableCheck: false
    })
});

export const counterActions = counterSlice.actions;
export default store;

