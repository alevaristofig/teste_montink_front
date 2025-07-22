import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false
}

export const autenticacaoSlice = createSlice({
    name: 'autenticacao',
    initialState,
    reducers: {}
})

export const { } = autenticacaoSlice.actions;

export default autenticacaoSlice.reducer;