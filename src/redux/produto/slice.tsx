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
            state.loading = false;
            state.produtos = action.payload;
        },
        listarErro: (state) => {
            state.loading = false;            
        },
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {
            state.loading = false;
        },
        salvarError: (state) => {
            state.loading = false;
        }
    }
});

export const { listar, listarSucesso, listarErro, salvar, salvarSucesso, salvarError } = produtoSlice.actions;

export default produtoSlice.reducer;