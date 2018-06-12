import React from 'react';

import todoLogo from '../../assets/images/todo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={todoLogo} alt="MyTodo List" />
    </div>
);

export default logo;