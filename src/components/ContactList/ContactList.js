import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useData, useDataUpdate } from '../../context/DataContext';

import Navbar from '../Navbar/Navbar';
import Button from '../Button/Button';
import Page from '../Page/Page';
import ContactListItem from './ContactListItem/ContactListItem';

import styles from './ContactList.module.css';

const ContactList = () => {

  const data = useData();
  const changeData = useDataUpdate();
  const history = useHistory();
  
  const storedFilter = localStorage.getItem('filter') ? localStorage.getItem('filter') : false;
  const [filter, setFilter] = useState(storedFilter);

  const updateFilter = (val) => {
    if(val) {
      localStorage.setItem('filter',val);
    } else {
      localStorage.removeItem('filter');
    }
    setFilter(val);
  }

  let page = (
      <div>
        <p>All contacts are deleted.</p>
        <p><Button click={()=>changeData('fetch')}>Fetch contacts from API</Button></p>
      </div>

  );

  if(data.length>0) {
    
    const items = data.map((item,index) => {
      const el = <ContactListItem key={index} index={index} {...item}/>;
      if(filter) {
        return (filter===item.status) ? el : null;
      } else {
        return el;
      }       
    });

    page = (
      <div>
        <div className={styles.filter}>
          <div><Button style={(!filter) ? 'active' : ''} click={()=>updateFilter(false)}>All</Button></div>
          <div><Button style={(filter==='private') ? 'active' : ''} click={()=>updateFilter('private')}>Private</Button></div>
          <div><Button style={(filter==='work') ? 'active' : ''} click={()=>updateFilter('work')}>Work</Button></div>
        </div>
        {items}
      </div>
    );
  }

  const navItems = {
    left: <div>Address Book</div>,
    center: null,
    right: <Button click={()=>history.push('/new')}>Add Contact</Button>
  }

  return(
    <React.Fragment>
      <Navbar {...navItems} />
      <Page>{page}</Page>
    </React.Fragment>
  );
};

export default ContactList;