import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from "../actions/actionTypes";
import { UpdateObject } from "./utility";

const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false
}




const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_START : 
            return UpdateObject(state, {error : null, loading : true})
        case AUTH_SUCCESS :
            return UpdateObject(state, {token : action.token, userId : action.userId, error : null, loading : false})
        case AUTH_FAILED : 
            return UpdateObject(state, {error : action.error, loading : false})
        default : 
            return state
    }
}

export default reducer;