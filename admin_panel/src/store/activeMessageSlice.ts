import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveMessageState {
    isActive: boolean,
    message: string
}

const initialState: ActiveMessageState = {
    isActive: false,
    message: ''
};

const activeMessageSlice = createSlice({
    name: 'activeMessage',
    initialState,
    reducers: {
        showMessage: (state, action: PayloadAction<string>) => {
            state.isActive = true;
            state.message = action.payload
        },
        hideMessage: (state) => {
            state.isActive = false;
            state.message = '';
        }
    }
})

export const { showMessage, hideMessage } = activeMessageSlice.actions;
export default activeMessageSlice.reducer;