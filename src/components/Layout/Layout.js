import React from 'react'
import classes from './Layout.module.css'

const Layout = ({
    children
}) => ( <
    React.Fragment >
    <
    div >
    Toolbar, Sidebar, Backdrop <
    /div> <
    main className = {
        classes.Content
    } > {
        children
    } <
    /main> <
    /React.Fragment>
)

export default Layout