import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useData, useDataUpdate } from '../../context/DataContext';

import Navbar from '../Navbar/Navbar';
import Button from '../Button/Button';
import Page from '../Page/Page';

import styles from './ContactCard.module.css';

const ContactCard = () => {

    const data = useData();
    const changeData = useDataUpdate();
    const { id } = useParams();
    const history = useHistory();

    const navItems = {
      left: <Button click={()=>history.push('/')}>Back</Button>,
      center: (data[id]) ? <div>Contact</div> : <div>Error</div>,
      right: (data[id]) ? <Button click={()=>history.push('/edit/'+id)}>Edit</Button> : null
    }

    let page = <div>Invalid request</div>;

    if(data[id]) {
      const user = data[id];
      const mailHref = 'mailto:'+user.email;
      const phoneHref = 'tel:'+user.phone;
  
      const deleteUser = () => {
        changeData('delete',null,id);
        history.push("/");
      }

      page = (
        <React.Fragment>
        <h1>{user.firstname+' '+user.lastname}</h1>
        <fieldset className={styles.fieldset}>
          <legend>{user.status}</legend>
          <label>Email:</label><div><a href={mailHref}>{user.email}</a></div>
          <label>Phone:</label><div><a href={phoneHref}>{user.phone}</a></div>
          <label>Street:</label><div>{user.street}</div>
          <label>Postcode:</label><div>{user.postcode}</div>
          <label>City:</label><div>{user.city}</div>
        </fieldset>
        <p>
          <Button click={deleteUser}>Delete</Button>
        </p>
        </React.Fragment>
        );
   
      
    } 

    return (
    <React.Fragment>
      <Navbar {...navItems} />
      <Page>{page}</Page>
    </React.Fragment>);
}

export default ContactCard;