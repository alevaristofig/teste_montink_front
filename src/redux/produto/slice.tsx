import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    produtos: []
}

export const produtoSlice = createSlice({
    name: 'produto',
    initialState,
    reducers: {
        listar: (state) => {
            state.loading = true;
        },
        listarSucesso: (state,action) => {
            state.loading = true;
            state.produtos = action.payload;
        },
        listarErro: (state) => {
            state.loading = true;
            
        }
    }
});

export const { listar, listarSucesso, listarErro } = produtoSlice.actions;

export default produtoSlice.reducer;