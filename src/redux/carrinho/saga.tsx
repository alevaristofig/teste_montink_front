import { all, takeEvery, put, call } from "redux-saga/effects";
import { AnyAction } from "redux-saga";

import { adicionarCarrinhoSucesso, adicionarCarrinhoError, retirarItemSucesso, retirarItemErro, 
         removerCarrinhoSucesso, removerCarrinhoErro } from "./slice";

import { ICarrinhoItem } from "../../interfaces/carrinho/carrinhoitem.interface";

import axios, { AxiosResponse } from 'axios';

function* adicionarCarrinho(action: AnyAction) {
    try {        
            yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/carrinho`,action.payload,{
            /* headers: {
                    "Authorization": `Bearer ${token_url.token}`
                }*/
            });

            yield put(adicionarCarrinhoSucesso());
    } catch(error) {
        alert('error')
        yield put(adicionarCarrinhoError(error));
    }
}

function* retirarItem(action: AnyAction): Generator<any, void, AxiosResponse<ICarrinhoItem[]>>  {
  try {   
        yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/carrinho`,action.payload,{
           /* headers: {
                "Authorization": `Bearer ${token_url.token}`
            }*/
        });

        yield put(retirarItemSucesso());
  } catch(error: any) {    
     yield put(retirarItemErro(error.response.data.message));
  }
}

function* removerCarrinho()  {
  try {   
        yield call(axios.delete,`http://localhost:8000/api/erp_gerenciamento/carrinho`,{
           /* headers: {
                "Authorization": `Bearer ${token_url.token}`
            }*/
        });

        yield put(removerCarrinhoSucesso());
  } catch(error: any) {    
     yield put(removerCarrinhoErro(error.response.data.message));
  }
}

export default all([
    takeEvery('carrinho/adicionarCarrinho', adicionarCarrinho),
    takeEvery('carrinho/retirarItem', retirarItem),
    takeEvery('carrinho/removerCarrinho', removerCarrinho),
]);