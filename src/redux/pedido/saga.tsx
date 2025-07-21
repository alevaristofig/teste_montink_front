import { all, takeEvery, put, call } from "redux-saga/effects";
import { AnyAction } from "redux-saga";

import axios, { AxiosResponse } from 'axios';

import { listarSucesso, listarErro, confirmarSucesso, confirmarError } from "./slice";

import { IPedido } from "../../interfaces/pedido/pedido.interface";

function* listar(): Generator<any, void, AxiosResponse<IPedido[]>>  {
    try {

         let response = yield call(axios.get,`http://localhost:8000/api/erp_gerenciamento/pedido`,{
            /*headers: {
                "Authorization": `Bearer ${token_url.token}`
            }*/
        });

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarErro());
    }
}

function* confirmar(action: AnyAction): Generator<any, void, AxiosResponse<IPedido[]>>  {
  try {   
     yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/pedido`,action.payload,{
           /* headers: {
                "Authorization": `Bearer ${token_url.token}`
            }*/
        });

        yield put(confirmarSucesso());
  } catch(error: any) {     
    yield put(confirmarError(error.response.data.msg));
  }
}

export default all([
    takeEvery('pedido/listar', listar),
    takeEvery('pedido/confirmar', confirmar),
]);