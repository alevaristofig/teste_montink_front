import { combineReducers } from "@reduxjs/toolkit";

import  produtoSlice  from "./produto/slice";

export default combineReducers({
    produto: produtoSlice
});