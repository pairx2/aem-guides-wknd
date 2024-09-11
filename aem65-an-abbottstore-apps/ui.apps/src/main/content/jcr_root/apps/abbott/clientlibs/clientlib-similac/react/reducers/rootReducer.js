const storeData = {};

function rootReducer(state, action) {
    state = state || storeData;

    if( action.type === 'UPDATE') {
        state.storeData = action.newcartData;
    }
    return state;
}

export default rootReducer;