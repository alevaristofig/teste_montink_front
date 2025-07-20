import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    pedidos: [],
}

export const PedidoSlice = createSlice({
    name: 'pedido',
    initialState,
    reducers: {        
    }
})

export const { } = PedidoSlice.actions;

export default PedidoSlice.reducer;