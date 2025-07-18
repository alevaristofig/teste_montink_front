import { all } from 'redux-saga/effects';

import produto from './produto/saga';

export default function* rootSaga() {
    return yield all([
        produto
    ]);
}