import { all, takeEvery, put, call } from "redux-saga/effects";

import { listarSucesso, listarErro, salvarSucesso, salvarError, deletarSucesso,
         deletarError
       } from "./slice";

import { IProduto } from "../../interfaces/produto/produto.interface";

import axios, { AxiosResponse, AxiosError } from 'axios';
import { AnyAction } from "redux-saga";

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

function* salvar(action: AnyAction): Generator<any, void, AxiosResponse<IProduto[]>>  {
  try {   
     yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/produto`,action.payload,{
           /* headers: {
                "Authorization": `Bearer ${token_url.token}`
            }*/
        });

        yield put(salvarSucesso());
  } catch(error: any) {    
     yield put(salvarError(error.response.data.message));
  }
}

function* deletar(action: AnyAction): Generator<any, void, AxiosResponse<IProduto[]>>  {
  try {     
        yield call(axios.delete,`http://localhost:8000/api/erp_gerenciamento/produto/${action.payload.id}`,{
           /* headers: {
                "Authorization": `Bearer ${token_url.token}`
            }*/
        });

        yield put(deletarSucesso());
  } catch(error: any) {    
     yield put(deletarError(error.response.data.message));
  }
}

export default all([
     takeEvery('produto/listar', listar),
     takeEvery('produto/salvar', salvar),
     takeEvery('produto/deletar', deletar),
]);