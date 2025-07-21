import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    pedidos: [],
}

export const PedidoSlice = createSlice({
    name: 'pedido',
    initialState,
    reducers: {  
        listar: (state) => {
            state.loading = true;
        },
        listarSucesso: (state,action) => {
            state.loading = false;
            state.pedidos = action.payload;
        },
        listarErro: (state) => {
            state.loading = false;            
        },       
    }
})

export const { listar, listarSucesso, listarErro } = PedidoSlice.actions;

export default PedidoSlice.reducer;