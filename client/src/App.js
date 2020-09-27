import React, { Fragment } from 'react';
import AppMain from './components/main';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
import { ApolloProvider , ApolloClient , InMemoryCache } from '@apollo/client';

import { StoreProvider , createStore } from 'easy-peasy';
import { useStore , useActions } from 'easy-peasy';
import model from './model';

import './css_app/normalise.css';
import './css_app/App.scss';
import './css_app/admin_contain.scss';

const clientApollo = new ApolloClient({
      uri: 'http://localhost:5000/graphql/analytics/incoming' ,
    cache: new InMemoryCache()
});

const App = () => {

    const store = createStore( model );

    return (
      <ApolloProvider client={ clientApollo }>
          <StoreProvider store={ store }>
              <div className="App">
                <AppMain />
              </div>
          </StoreProvider>
      </ApolloProvider>
    );
}

export default App;
