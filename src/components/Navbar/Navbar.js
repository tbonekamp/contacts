import React from 'react';

import styles from './Navbar.module.css';

const navbar = props => {
  return(
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.left}>{props.left}</div>
        <div className={styles.center}>{props.center}</div>
        <div className={styles.right}>{props.right}</div>      
      </div> 
    </div>
  );
};

export default navbar;