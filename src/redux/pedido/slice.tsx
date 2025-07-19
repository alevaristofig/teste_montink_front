import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    cupons: []
}

export const PedidoSlice = createSlice({
     name: 'cupom',
    initialState,
    reducers: {}
})

export const {} = PedidoSlice.actions;

export default PedidoSlice.reducer;