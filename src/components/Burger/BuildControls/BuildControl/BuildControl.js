import React from 'react'

import classes from './BuildControl.module.css'

const BuildControl = ({ label, type, ingredientAdded, ingredientRemoved, disabled }) => (
    <div className={classes.BuildControl}>
        <div className={classes.label}>{label}</div>
        <button className={classes.Less} onClick={ingredientRemoved} disabled={disabled}>Less</button>
        <button className={classes.More} onClick={ingredientAdded.bind(this, type)}>More</button>
    </div>
)

export default BuildControl
