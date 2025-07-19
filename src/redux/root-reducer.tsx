import { combineReducers } from "@reduxjs/toolkit";

import  produtoSlice  from "./produto/slice";
import  cupomSlice    from "./cupom/slice";
import  pedidoSlice   from "./pedido/slice";

const rootReducer = combineReducers({
    produto: produtoSlice,
    cupom: cupomSlice,
    pedido: pedidoSlice
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;