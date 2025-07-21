import { all, takeEvery, put, call } from "redux-saga/effects";
import { AnyAction } from "redux-saga";

import axios, { AxiosResponse } from 'axios';

import { listarSucesso, listarErro } from "./slice";

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

export default all([
    takeEvery('pedido/listar', listar),
]);