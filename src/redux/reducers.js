
const s3UrlReducer = (state=[], action) => {
    if(action.type === 'SET_URL') {
        return action.payload;
    }
    return state;
}

export default {
    s3UrlReducer,
}