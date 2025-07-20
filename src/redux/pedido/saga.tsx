import { all, takeEvery, put, call } from "redux-saga/effects";
import { AnyAction } from "redux-saga";

import axios, { AxiosResponse } from 'axios';

import { ICarrinho } from "../../interfaces/carrinho/carrinho.interface";

import { realizarPedidoSucesso, realizarPedidoError, listarCarrinhoSucesso, listarCarrinhoError } from "./slice";

function* realizarPedido(action: AnyAction) {
    try {        
            yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/pedido`,action.payload,{
            /* headers: {
                    "Authorization": `Bearer ${token_url.token}`
                }*/
            });

            yield put(realizarPedidoSucesso());
    } catch(error) {
        alert('error')
        yield put(realizarPedidoError(error));
    }
}

function* listarCarrinho(): Generator<any, void, AxiosResponse<ICarrinho[]>> {
    try {        
            let response = yield call(axios.get,`http://localhost:8000/api/erp_gerenciamento/pedido`,{
            /* headers: {
                    "Authorization": `Bearer ${token_url.token}`
                }*/
            });

            yield put(listarCarrinhoSucesso(response.data));
    } catch(error) {
        yield put(listarCarrinhoError(error));
    }
}

export default all([
    takeEvery('pedido/realizarPedido', realizarPedido),
    takeEvery('pedido/listarCarrinho', listarCarrinho)
]);