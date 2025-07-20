import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
}

export const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        retirarItem: (state) => {
            state.loading = true;
        },
        retirarItemSucesso: (state) => {
            state.loading = false;            
        },
        retirarItemErro: (state) => {
            state.loading = false;            
        },
    }
})


export const { retirarItem, retirarItemSucesso, retirarItemErro } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;