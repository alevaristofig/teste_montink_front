import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
}

export const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        retirarItem: (state,action) => {
            state.loading = true;
        },
        retirarItemSucesso: (state) => {
            state.loading = false;  
            toast.success("Produto retirado do carrinho com Sucesso!");          
        },
        retirarItemErro: (state,action) => {
            state.loading = false;  
            toast.error(action.payload);          
        },
        removerCarrinho: (state) => {
            state.loading = true;
        },
        removerCarrinhoSucesso: (state) => {
            state.loading = false;  
            toast.success("Produto retirado do carrinho com Sucesso!");          
        },
        removerCarrinhoErro: (state,action) => {
            state.loading = false;  
            toast.error(action.payload);          
        },
        adicionarCarrinho: (state,action) => {            
            state.loading = true;
        },
        adicionarCarrinhoSucesso: (state) => {
            state.loading = false;
            toast.success("Produto adicionando no carrinho!");
        },
        adicionarCarrinhoError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
    }
})


export const { adicionarCarrinho, adicionarCarrinhoSucesso, adicionarCarrinhoError, retirarItem, 
               retirarItemSucesso, retirarItemErro, removerCarrinho,
               removerCarrinhoSucesso, removerCarrinhoErro } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;