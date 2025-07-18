import { all } from 'redux-saga/effects';

import produto from './produto/saga';

export default function* rootSaga() {
    yield all([
        produto
    ]);
}