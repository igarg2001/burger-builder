import * as actionTypes from '../actions/actionTypes';
import { UpdateObject } from './utility';

const initialState = {
    ingredients: null,
    INGREDIENT_PRICES : null,
    totalPrice: 4,
    loading: false,
    error: {
        state : false,
        message : ''
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + state.INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - state.INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS :
            return UpdateObject(state, {ingredients : action.ingredients, loading : false ,error : {...state.error, value : false, message: ''}}) 
        case actionTypes.SET_INGREDIENT_PRICES : 
        return UpdateObject(state, {INGREDIENT_PRICES : action.ingredientPrices, loading : false, error : {...state.error, value : false, message : ''}})
        case actionTypes.SET_BASE_PRICE : 
        return UpdateObject(state, {totalPrice : action.price})
        case actionTypes.SET_ERROR : 
            return UpdateObject(state, {error : {...state.error, value : true, message : action.message}})
        case actionTypes.SET_LOADING :
            return UpdateObject(state, {loading : action.value})
        default:
            return state;
    }
};

export default reducer;