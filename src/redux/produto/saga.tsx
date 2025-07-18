import { all, takeEvery, put, call } from "redux-saga/effects";

import { listarSucesso, listarErro, salvarSucesso, salvarError } from "./slice";

import { IProduto } from "../../interfaces/produto/produto.interface";

import axios from "axios";
import { AxiosResponse } from 'axios';

function* listar(): Generator<any, void, AxiosResponse<IProduto[]>>  {
    try {

         let response = yield call(axios.get,`http://localhost:8000/api/erp_gerenciamento/produto`,{
            /*headers: {
                "Authorization": `Bearer ${token_url.token}`
            }*/
        });

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarErro());
    }
}

function* salvar(action: ReturnType<typeof IProduto>) {
  try {

  } catch(error) {

  }
}

export default all([
     takeEvery('produto/listar', listar),
     takeEvery('produto/salvar', salvar),
]);