import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { DataProvider } from './context/DataContext';

import ContactList from './components/ContactList/ContactList';
import ContactCard from './components/ContactCard/ContactCard';
import ContactForm from './components/ContactForm/ContactForm';

function App() {

  return(
      <DataProvider>
        <Switch>
          <Route path="/new" exact component={ContactForm} />
          <Route path="/edit/:id" exact component={ContactForm} />
          <Route path="/card/:id" exact component={ContactCard} />
          <Route path="/" exact component={ContactList} />
          <Redirect to="/" />
        </Switch>
      </DataProvider>
  );
}

export default App;