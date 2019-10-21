import React, { Fragment } from 'react';
import AppMain from './components/main';

import { StoreProvider , createStore } from 'easy-peasy';
import { useStore , useActions } from 'easy-peasy';
import model from './model';

import './css_app/normalise.css';
import './css_app/App.scss';
import './css_app/admin_contain.scss';

const App = () => {

    const store = createStore( model );

    return (
      <StoreProvider store={ store }>
        <div className="App">
          <AppMain />
        </div>
      </StoreProvider >
    );
}

export default App;
