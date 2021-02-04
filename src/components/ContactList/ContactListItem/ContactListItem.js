import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ContactListItem.module.css';

const ContactListItem = props => {

    const history = useHistory();

    return (
        <div className={styles.item}
            onClick={()=>history.push('/card/'+props.index)}>
            <div className={styles.title}>
                {props.firstname+' '+props.lastname}
            </div>
            <div className={styles.viewM}>{props.status}</div>
            <div className={styles.viewL}>{props.email}</div>
            <div className={styles.viewXL}>{props.phone}</div>
        </div>
    );
}

export default ContactListItem;