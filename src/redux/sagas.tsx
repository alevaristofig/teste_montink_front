import { all } from 'redux-saga/effects';

import produto from './produto/saga';
import cupom from './cupom/saga';
import pedido from './pedido/saga';
import carrinho from './carrinho/saga';

export default function* rootSaga() {
    yield all([
        produto,
        cupom,
        pedido,
        carrinho,
    ]);
}