import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* postUrl(action) {
    yield axios.post('/api/image', action.payload);
    yield put({type: 'FETCH_URL'});
}

function* fetchUrl() {
    const imageResponse = yield axios.get('/api/image');
    console.log('image array', imageResponse);
    yield put({type: 'SET_URL', payload: imageResponse.data});
}

//watcher saga
function* watcherSaga() {
    //take every action with type = SET_ELEMENT dispatched
    yield takeEvery('ADD_URL', postUrl)
    yield takeEvery('FETCH_URL', fetchUrl)
}

export default watcherSaga;