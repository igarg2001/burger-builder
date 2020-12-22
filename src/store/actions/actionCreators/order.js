import { SET_ORDERS, SUCCESSFUL_ORDER } from "../actionTypes";
import { setError, setLoading } from "./burgerBuilder";
import Axios from "../../../axios-orders";

export const setOrders = orders => {
    return {
        type : SET_ORDERS,
        orders : orders
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(setLoading(true))
        Axios.get('/orders.json')
            .then(res=> {
                console.log(res.data)
                dispatch(setOrders(res.data))
                dispatch(setLoading(false))
            })
            .catch(error => dispatch(setError(error.message)))
    }
}



export const successfulOrder = push => {
    return {
        type : SUCCESSFUL_ORDER,
        push : push
    }
}

export const sendOrder = (order, push) => {
    return (dispatch, store) => {
       dispatch(setLoading(true))
       //console.log(store.getState())
        Axios.post('/orders.json', order)
            .then(res => {
                dispatch(successfulOrder(push))
                dispatch(setLoading(false))
                })
    }
}