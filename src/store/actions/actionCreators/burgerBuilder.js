import * as actionTypes from '../actionTypes'
import axios from "../../../axios-orders";

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientPrices = ingredientPrices => {
    return {
        type: actionTypes.SET_INGREDIENT_PRICES,
        ingredientPrices: ingredientPrices
    }
}
export const setBasePrice = price => {
    return {
        type: actionTypes.SET_BASE_PRICE,
        price: price
    }
}


export const setError = message => {
    return {
        type: actionTypes.SET_ERROR,
        message: message
    }
}

export const setLoading = (value) => {
    return {
        type: actionTypes.SET_LOADING,
        value: value
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
                //dispatch(setLoading(false))
            })
            .catch(error => {
                dispatch(setError(error.message))
            })
    }
}

export const fetchIngredientPrices = () => {
    return dispatch => {
        axios.get('/ingredient_prices.json')
            .then(res => {
                dispatch(setIngredientPrices(res.data))
                //dispatch(setLoading(false))
            })
            .catch(error => {
                dispatch(setError(error.message))
            })
    }
}
export const fetchBasePrice = () => {
    return dispatch => {
        axios.get('/BASE_PRICE.json')
            .then(res => {
                dispatch(setBasePrice(res.data))
                //dispatch(setLoading(false))
            })
            .catch(error => {
                dispatch(setError(error.message))
            })
    }
}


export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}