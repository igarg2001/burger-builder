import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { fetchIngredients } from '../../store/actions';

class Checkout extends Component {


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        console.log('render')
        //console.log(this.props)
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component = {ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients
    }
};

const mapDispatchtoProps = dispatch => {
    return {
        fetchIngredientsHandler : () => dispatch(fetchIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Checkout);