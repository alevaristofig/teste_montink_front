import { all, takeEvery, put, call } from "redux-saga/effects";

import { listarSucesso, listarErro, salvarSucesso, salvarError, deletarSucesso,
         deletarError, atualizarSucesso, atualizarError
       } from "./slice";

import { ICupom } from "../../interfaces/cupom/cupom.interface";

import axios, { AxiosResponse, AxiosError } from 'axios';
import { AnyAction } from "redux-saga";

function* listar(): Generator<any, void, AxiosResponse<ICupom[]>>  {
    try {

         let response = yield call(axios.get,`http://localhost:8000/api/erp_gerenciamento/cupom`,{
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
     takeEvery('cupom/listar', listar),
    // takeEvery('produto/salvar', salvar),
    // takeEvery('produto/deletar', deletar),
    // takeEvery('produto/atualizar', atualizar),
]);