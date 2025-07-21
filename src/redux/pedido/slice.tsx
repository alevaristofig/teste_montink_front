import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    pedidos: [],
    endereco: ''
}

export const PedidoSlice = createSlice({
    name: 'pedido',
    initialState,
    reducers: {         
    }
})

export const { } = PedidoSlice.actions;

export default PedidoSlice.reducer;