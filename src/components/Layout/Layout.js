import React, {
    useState
} from 'react'

import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = ({
    children
}) => {

    const [show, setShow] = useState(false)

    const removeBackdrop = () => {
        setShow(false)
    }

    const toggleSideDrawer = () => {
        setShow(!show)
    }

    return ( <
        React.Fragment >
        <
        Toolbar clicked = {
            toggleSideDrawer
        }
        /> <
        SideDrawer show = {
            show
        }
        clicked = {
            removeBackdrop
        }
        /> <
        main className = {
            classes.Content
        } > {
            children
        } <
        /main> <
        /React.Fragment>
    )
}

export default Layout