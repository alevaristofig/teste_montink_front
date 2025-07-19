import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

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
            toast.success("Produto cadastrado com Sucesso!");
        },
        salvarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        deletar: (state,action) => {
            state.loading = true;
        },
        deletarSucesso: (state) => {
            state.loading = false;
             toast.success("Produto removido com Sucesso!");
        },
        deletarError: (state,action) => {
            state.loading = false;
             toast.success(action.payload);
        }
    }
});

export const { listar, listarSucesso, listarErro, salvar, salvarSucesso, salvarError,
               deletar, deletarSucesso, deletarError
             } = produtoSlice.actions;

export default produtoSlice.reducer;