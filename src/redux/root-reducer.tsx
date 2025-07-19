import { combineReducers } from "@reduxjs/toolkit";

import  produtoSlice  from "./produto/slice";
import { cupomSlice } from "./cupom/slice";

const rootReducer = combineReducers({
    produto: produtoSlice,
    cupom: cupomSlice
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;