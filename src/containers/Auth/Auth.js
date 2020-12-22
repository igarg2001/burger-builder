import React, { Component } from 'react'

import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import { auth } from "../../store/actions/index";
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : "Your Email "
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : "Your Password "
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 8
                },
                valid : false,
                touched : false
            }
        },
        formIsValid : false,
        isSignUp : true
    }

    inputChangedHanlder = (value, id) => {
        const updatedControls = {...this.state.controls}
        const updatedControlEl = {...updatedControls[id]}
        updatedControlEl.value = value
        updatedControlEl.valid = this.checkValidity(updatedControlEl.value, updatedControlEl.validation)
        updatedControlEl.touched = true
        updatedControls[id] = updatedControlEl
        let formIsValid = true
        for(let key in updatedControls) {
            formIsValid = updatedControls[key].valid && formIsValid
        }
        this.setState({controls : updatedControls, formIsValid : formIsValid})
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    switchAuthStateHandler = () => {
        this.setState(prevState => (
           { isSignUp : !prevState.isSignUp }
        ))
    }
    formSubmitHandler = (e) => {
        e.preventDefault()
        console.log(this.props.history.push)
        const method = this.state.isSignUp ? 'SIGNUP' : 'SIGNIN'
        this.props.onAuth(this.state.controls.email.value, this.state.controls.email.value, method, this.props.history.push)
        const updatedControls = {...this.state.controls}
        for(let key in updatedControls) {
            let updatedControlEl = {...updatedControls[key]}
            updatedControlEl.value = ''
            updatedControls[key] = updatedControlEl
        }
        this.setState({controls : updatedControls, formIsValid : false})
    }

    render() {
        const formElementsArray = []
        for(let key in this.state.controls) {
            formElementsArray.push({
                id : key,
                config : this.state.controls[key]
            })
        }

        const form = formElementsArray.map(formEl => (
            <Input
                key = {formEl.id}
                elementType = {formEl.config.elementType}
                elementConfig = {formEl.config.elementConfig}
                value = {formEl.config.value}
                invalid = {!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                changed = {(event) => this.inputChangedHanlder(event.target.value, formEl.id)}
            ></Input>
        ))

        return (
            <div className = {classes.Auth}>
                <h3>Enter Your Login Information</h3>
                <form onSubmit = {this.formSubmitHandler}>
                    {form}
                    <Button btnType= "Success" disabled = {!this.state.formIsValid}>SUBMIT</Button>
                </form>
                <Button clicked = {this.switchAuthStateHandler} btnType = "Danger" >SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onAuth : (email, password, method) => dispatch(auth(email, password, method))
    }
}

export default connect(null, mapDispatchtoProps)(Auth)