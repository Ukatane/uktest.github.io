import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => ( <
    ul className = {
        classes.NavigationItems
    } >
    <
    NavigationItem href = "/"
    active > Burger Builder < /NavigationItem> <
    NavigationItem href = '/' > Checkout < /NavigationItem> <
    /ul>
)

export default NavigationItems