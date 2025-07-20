import { all, takeEvery, put, call } from "redux-saga/effects";
import { AnyAction } from "redux-saga";

import { retirarItemSucesso, retirarItemErro } from "./slice";

import axios, { AxiosResponse } from 'axios';

function* retirarItem(action: AnyAction): Generator<any, void, AxiosResponse<ICupom[]>>  {
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

export default all([
    takeEvery('carrinho/retirarItem', retirarItem),
]);