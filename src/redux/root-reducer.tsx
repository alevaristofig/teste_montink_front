import { combineReducers } from "@reduxjs/toolkit";

import  produtoSlice  from "./produto/slice";
import  cupomSlice    from "./cupom/slice";
import  pedidoSlice   from "./pedido/slice";
import  carrinhoSlice from "./carrinho/slice";
import  autenticacaoSlice  from "./autenticacao/slice";

const rootReducer = combineReducers({
    produto: produtoSlice,
    cupom: cupomSlice,
    pedido: pedidoSlice,
    carrinho: carrinhoSlice,
    autenticacao: autenticacaoSlice
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;