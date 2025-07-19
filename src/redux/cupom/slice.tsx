import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    cupons: []
}

export const cupomSlice = createSlice({
    name: 'cupom',
    initialState,
    reducers: {
        listar: (state) => {
            state.loading = true;
        },
        listarSucesso: (state,action) => {
            state.loading = false;
            state.cupons = action.payload;
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
        atualizar(state,action) {
            state.loading = true;
        },
        atualizarSucesso(state) {
            state.loading = false;
            toast.success("Produto atualizado com Sucesso!");
        },
        atualizarError(state,action) {
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
               deletar, deletarSucesso, deletarError, atualizar, atualizarSucesso,
               atualizarError
             } = cupomSlice.actions;

export default cupomSlice.reducer;