import { RETURN_ACTION_REQUEST, RETURN_ACTION_REQUEST_SUCCESS, RETURN_ACTION_REQUEST_FAILURE, SET_RADIO_REFUND_RESHIP_REQUEST } from '../actions/refund_reship_widget.action';

const initialState = {
    isfetching: false,
    returnStatusUpdated: false,
    errorMessageCode: "",
    selectedOption: ""
};
export const RefundReshipWegetReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETURN_ACTION_REQUEST:
            return {
                ...state,
                isfetching: true,
                returnStatusUpdated: false,
                errorMessageCode: ""
            };
        case RETURN_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                isfetching: false,
                returnStatusUpdated: true,
                errorMessageCode: ""
            };
        case RETURN_ACTION_REQUEST_FAILURE:
            return {
                ...state,
                isfetching: false,
                returnStatusUpdated: false,
                errorMessageCode: action?.error ? action?.error.code : action?.code
            };
        case SET_RADIO_REFUND_RESHIP_REQUEST:
            return {
                ...state,
                selectedOption: action.payload
            }
        default:
            return state;
    }
};
