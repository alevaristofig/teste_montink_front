import { all, takeEvery, put, call } from "redux-saga/effects";
import { AnyAction } from "redux-saga";

import axios, { AxiosResponse } from 'axios';

import { listarSucesso, listarErro, confirmarSucesso, confirmarError, atualizarStatusSucesso,
         atualizarStatusError
       } from "./slice";

import { IPedido } from "../../interfaces/pedido/pedido.interface";

function* listar(): Generator<any, void, AxiosResponse<IPedido[]>>  {
    try {

         let response = yield call(axios.get,`http://localhost:8000/api/erp_gerenciamento/pedido`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarErro());
    }
}

function* confirmar(action: AnyAction): Generator<any, void, AxiosResponse<IPedido[]>>  {
  try {   
     yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/pedido`,action.payload,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(confirmarSucesso());
  } catch(error: any) {   
    console.log(error);  
    yield put(confirmarError(error.response.data.msg));
  }
}

function* atualizarStatus(action: AnyAction): Generator<any, void, AxiosResponse<IPedido[]>>  {
    try {

        let dados = {
            'status': action.payload.status          
        }        

        yield call(axios.patch,`http://localhost:8000/api/erp_gerenciamento/pedido/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
       });

        yield put(atualizarStatusSucesso());

    } catch(error: any) {    
        yield put(atualizarStatusError(error.response.data.message));
    }
}

export default all([
    takeEvery('pedido/listar', listar),
    takeEvery('pedido/confirmar', confirmar),
    takeEvery('pedido/atualizarStatus', atualizarStatus),
]);