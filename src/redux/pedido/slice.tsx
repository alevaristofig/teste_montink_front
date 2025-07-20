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
        listarCarrinho: (state) => {
            state.loading = true;
        },
        listarCarrinhoSucesso: (state,action) => {
            state.loading = false;
            state.pedidos = action.payload;
        },
        listarCarrinhoError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        }
    }
})

export const { listarCarrinho, listarCarrinhoSucesso, listarCarrinhoError } = PedidoSlice.actions;

export default PedidoSlice.reducer;