import React, { Component } from 'react';
import { connect } from "react-redux";

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.loading !== nextProps.loading)
    }
    componentDidMount() {
        this.props.fetchOrdersHandler()
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });
    }

    render () {
        let orders = null
       //console.log(this.props.loading)
        orders = this.props.loading ? <Spinner /> : (<div>
            {
            this.props.orders.map(order => {
                //console.log(order)
                return (
                <Order 
                    key={order.id}
                    ingredients={order.data.ingredients}
                    price={order.data.price} />
            )})}
        </div>)
        
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        fetchOrdersHandler : () => dispatch(fetchOrders())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Orders, axios));