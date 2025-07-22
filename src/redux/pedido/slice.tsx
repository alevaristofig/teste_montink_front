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
        confirmar: (state,action) => {
            state.loading = true;
        },
        confirmarSucesso: (state) => {
            state.loading = false;
            toast.success("Pedido registrado com Sucesso!");
        },
        confirmarError: (state,action) => {
            state.loading = false; 
            toast.error(action.payload.message);           
        },
         atualizarStatus: (state,action) => {
            state.loading = true;
        },
        atualizarStatusSucesso: (state) => {
            state.loading = false;
            toast.success("Pedido atualizado com Sucesso!");
        },
        atualizarStatusError: (state,action) => {
            state.loading = false; 
            toast.error(action.payload.message);           
        },       
    }
})

export const { listar, listarSucesso, listarErro, confirmar, confirmarSucesso, confirmarError,
               atualizarStatus, atualizarStatusSucesso, atualizarStatusError
             } = PedidoSlice.actions;

export default PedidoSlice.reducer;