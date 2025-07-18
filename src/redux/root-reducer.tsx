import { combineReducers } from "@reduxjs/toolkit";

import  produtoSlice  from "./produto/slice";

const rootReducer = combineReducers({
    produto: produtoSlice
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;