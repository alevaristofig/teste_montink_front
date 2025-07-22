import { all, takeEvery, put, call } from "redux-saga/effects";

import { listarSucesso, listarErro, salvarSucesso, salvarError, deletarSucesso,
         deletarError, atualizarSucesso, atualizarError
       } from "./slice";

import { ICupom } from "../../interfaces/cupom/cupom.interface";

import axios, { AxiosResponse } from 'axios';
import { AnyAction } from "redux-saga";

function* listar(): Generator<any, void, AxiosResponse<ICupom[]>>  {
    try {

         let response = yield call(axios.get,`http://localhost:8000/api/erp_gerenciamento/cupom`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarErro());
    }
}

function* salvar(action: AnyAction): Generator<any, void, AxiosResponse<ICupom[]>>  {
  try {   
        yield call(axios.post,`http://localhost:8000/api/erp_gerenciamento/cupom`,action.payload,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(salvarSucesso());
  } catch(error: any) {    
     yield put(salvarError(error.response.data.message));
  }
}

function* atualizar(action: AnyAction): Generator<any, void, AxiosResponse<ICupom[]>>  {
    try {

        let dados = {
            'nome': action.payload.nome,
            'desconto': action.payload.desconto,
            'validade': action.payload.validade,            
        }        

        yield call(axios.put,`http://localhost:8000/api/erp_gerenciamento/cupom/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
       });

        yield put(atualizarSucesso());

    } catch(error: any) {    
        yield put(atualizarError(error.response.data.message));
    }
}

function* deletar(action: AnyAction): Generator<any, void, AxiosResponse<ICupom[]>>  {
  try {     
        yield call(axios.delete,`http://localhost:8000/api/erp_gerenciamento/cupom/${action.payload.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(deletarSucesso());
  } catch(error: any) {    
     yield put(deletarError(error.response.data.message));
  }
}

export default all([
     takeEvery('cupom/listar', listar),
     takeEvery('cupom/salvar', salvar),
     takeEvery('cupom/deletar', deletar),
     takeEvery('cupom/atualizar', atualizar),
]);