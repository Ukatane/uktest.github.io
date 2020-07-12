import React from 'react'

import Button from '../../UI/Button/Button'

class OrderSummary extends React.Component {
    render() {
        const {
            ingredients,
            removeModal,
            checkout,
            price
        } = this.props;

        const ingredientSummary = Object.keys(ingredients).map(igKey => < li key = {
            igKey
        } > < span style = {
            {
                textTransform: 'capitalize'
            }
        } > {
            igKey
        } < /span>: {ingredients[igKey]} </li > )

        return ( <
            React.Fragment >
            <
            h3 > Your Order < /h3> <
            p > Your burger has the following ingredients < /p>

            <
            ul > {
                ingredientSummary
            } <
            /ul>

            <
            p > < strong > Total Price: $ {
                price.toFixed(2)
            } < /strong> </p >
            <
            p > Continue to Checkout < /p> <
            Button type = 'Danger'
            clicked = {
                removeModal
            } > CANCEL < /Button> <
            Button type = 'Success'
            clicked = {
                checkout
            } > CONTINUE < /Button> <
            /React.Fragment>
        )
    }
}

export default OrderSummary