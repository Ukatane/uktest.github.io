import React from 'react'

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return ( <
            React.Fragment >
            <
            Backdrop show = {
                this.props.show
            }
            removeModal = {
                this.props.removeModal
            }
            /> <
            div className = {
                classes.Modal
            }
            style = {
                {
                    transform: this.props.show ? 'translateY(0)' : 'translateY(150vh)',
                    opacity: this.props.show ? '1' : 0
                }
            } > {
                this.props.children
            } <
            /div> <
            /React.Fragment>
        )
    }
}

export default Modal