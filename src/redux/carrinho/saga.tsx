import { all, takeEvery, put, call } from "redux-saga/effects";
import { AnyAction } from "redux-saga";

import { listarCarrinhoSucesso, listarCarrinhoError,
         adicionarCarrinhoSucesso, adicionarCarrinhoError, retirarItemSucesso, retirarItemErro, 
         removerCarrinhoSucesso, removerCarrinhoErro } from "./slice";

import { ICarrinho } from "../../interfaces/carrinho/carrinho.interface";
import { ICarrinhoItem } from "../../interfaces/carrinho/carrinhoitem.interface";

import axios, { AxiosResponse } from 'axios';

function* listarCarrinho(): Generator<any, void, AxiosResponse<ICarrinho[]>> {
    try {               
            let response = yield call(axios.get,`http://localhost:8000/api/erp_gerenciamento/carrinho`,{
             headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            });    
                 
            yield put(listarCarrinhoSucesso(response.data));
    } catch(error) {              
        yield put(listarCarrinhoError(error));
    }
}

function* adicionarCarrinho(action: AnyAction) {
    try {        
            yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/carrinho`,action.payload,{
             headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            yield put(adicionarCarrinhoSucesso());
    } catch(error) {
        alert('error')
        yield put(adicionarCarrinhoError(error));
    }
}

function* retirarItem(action: AnyAction): Generator<any, void, AxiosResponse<ICarrinhoItem[]>>  {
  try {   
        yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/carrinhoitem`,action.payload,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(retirarItemSucesso());
  } catch(error: any) {    
     yield put(retirarItemErro(error.response.data.message));
  }
}

function* removerCarrinho()  {
  try {   
        yield call(axios.delete,`http://localhost:8000/api/erp_gerenciamento/carrinho`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(removerCarrinhoSucesso());
  } catch(error: any) {    
     yield put(removerCarrinhoErro(error.response.data.message));
  }
}

export default all([
    takeEvery('carrinho/listarCarrinho', listarCarrinho),
    takeEvery('carrinho/adicionarCarrinho', adicionarCarrinho),
    takeEvery('carrinho/retirarItem', retirarItem),
    takeEvery('carrinho/removerCarrinho', removerCarrinho),
]);