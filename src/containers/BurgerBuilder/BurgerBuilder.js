import React from 'react'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .8,
    meat: 1.5,
    bacon: 1.3
}

class BurgerBuilder extends React.Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        modal: false
    }

    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)

        this.setState({
            purchaseable: sum > 0
        })
    }

    addIngredientHandler = type => {
        const count = this.state.ingredients[type] + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = count;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchase(updatedIngredients);
    }

    removeIngredientHandler = type => {

        if (this.state.ingredients[type] <= 0) {
            return;
        }

        const count = this.state.ingredients[type] - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = count;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchase(updatedIngredients);
    }

    showModal = () => {
        this.setState({
            modal: true
        })
    }

    removeModal = () => {
        this.setState({
            modal: false
        })
    }

    checkoutHandler = () => {
        console.log('continue')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return ( <
            React.Fragment >
            <
            Modal show = {
                this.state.modal
            }
            removeModal = {
                this.removeModal
            } >
            <
            OrderSummary ingredients = {
                this.state.ingredients
            }
            removeModal = {
                this.removeModal
            }
            checkout = {
                this.checkoutHandler
            }
            /> <
            /Modal> <
            Burger ingredients = {
                this.state.ingredients
            }
            /> <
            BuildControls ingredientAdded = {
                this.addIngredientHandler
            }
            ingredientRemoved = {
                this.removeIngredientHandler
            }
            disabled = {
                disabledInfo
            }
            purchaseable = {
                this.state.purchaseable
            }
            price = {
                this.state.totalPrice
            }
            showModal = {
                this.showModal
            }
            /> <
            /React.Fragment>
        )
    }
}

export default BurgerBuilder;