import React from 'react';

import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <button className={`custom-button  ${inverted ? 'inverted' : ''}`} {...otherProps}>
        {children}
        {console.log(children)}
    </button>
);

export default CustomButton