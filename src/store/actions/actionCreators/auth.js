import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from "../actionTypes";
import Axios from "axios";

export const authStart = () => {
    return {
        type : AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type : AUTH_SUCCESS,
        authData : authData
    }
}

export const authFailed = error => {
    return {
        type : AUTH_FAILED,
        error : error
    }
}

export const auth = (email, password, method, push) => {
    console.log(push)
    return dispatch => {
        dispatch(authStart())
        let url = ''
        if(method === 'SIGNUP')
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVYOUxaRvhYdu8uTj1pFGDWBMFEZM1FTU"
        if(method==='SIGNIN')
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVYOUxaRvhYdu8uTj1pFGDWBMFEZM1FTU"
        Axios.post(url, {
            email : email,
            password : password,
            returnSecureToken : true
        }).then(res => {
            console.log(res)
            authSuccess(res.data)
            push('/')
        })
        .catch(err => {
            console.log(err)
            dispatch(authFailed())
        })
    }
}