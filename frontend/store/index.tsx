import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import CfaPage from "../components/Superfluid/CfaPage";

let initialState = {
    totalAccounts: [<CfaPage />]
};

const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment(state) {
            return {
                totalAccounts: [...state.totalAccounts, <CfaPage />]
            }
        },
        decrement(state) {
          return {
            totalAccounts: state.totalAccounts.slice(0, state.totalAccounts.length - 2)
          }
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

