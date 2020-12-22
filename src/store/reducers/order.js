import { SET_ORDERS, SUCCESSFUL_ORDER, SET_LOADING } from "../actions/actionTypes";
import { UpdateObject } from "./utility";

const initialState = {
    orders : [],
    loading : false,
    error : {
        value : false,
        message : ''
    },
    isLoggedIn : {
        value : false
    }
}

const parseOrders = fetchedOrders => {
    let orders = []
    for(let key in fetchedOrders) {
        let order = {
            id : key,
            data : fetchedOrders[key]
        }
    orders.push(order)
    }
    //console.log(orders)
    return orders
}

const reducer = (state = initialState, action) => {
    //console.log([...state.orders].concat(parseOrders(['hello'])))
    switch(action.type) {
        case SET_LOADING : 
        return UpdateObject(state, {loading : action.value})
        case SET_ORDERS : 
            return UpdateObject(state, {orders : parseOrders(action.orders), error : {...state.error, value : false, message : ''}})
        case SUCCESSFUL_ORDER : 
            action.push('/')
            return state
            default : 
            return state
    }
}

export default reducer

