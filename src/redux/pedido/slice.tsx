import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
}

export const PedidoSlice = createSlice({
    name: 'pedido',
    initialState,
    reducers: {
        realizarPedido: (state,action) => {            
            state.loading = true;
        },
        realizarPedidoSucesso: (state) => {
            state.loading = false;
            toast.success("Produto adicionando no carrinho!");
        },
        realizarPedidoError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
    }
})

export const { realizarPedido, realizarPedidoSucesso, realizarPedidoError } = PedidoSlice.actions;

export default PedidoSlice.reducer;