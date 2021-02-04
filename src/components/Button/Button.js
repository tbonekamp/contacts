import React from 'react';

import styles from './Button.module.css';

const button = props => (
    <button
        disabled={props.disabled}
        className={[styles.Button, styles[props.style]].join(' ')}
        onClick={props.click}>{props.children}</button>
);

export default button;