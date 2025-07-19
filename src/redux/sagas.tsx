import { all } from 'redux-saga/effects';

import produto from './produto/saga';
import cupom from './cupom/saga';

export default function* rootSaga() {
    yield all([
        produto,
        cupom
    ]);
}