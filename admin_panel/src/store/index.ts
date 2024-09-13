import { configureStore } from "@reduxjs/toolkit";
import activeMessageReducer from "./activeMessageSlice";

const store = configureStore({
    reducer: {
        activeMessage: activeMessageReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;