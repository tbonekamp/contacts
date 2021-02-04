import React from 'react';

import styles from './Page.module.css';

const page = props => {
  return(
    <div className={styles.wrapper}>
        <div className={styles.content}>
            {props.children}
        </div>
    </div>
  );
};

export default page;