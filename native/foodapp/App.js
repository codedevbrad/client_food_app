
import React , { Component , useEffect , useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import { StyleSheet , Button , Image , View , Text , TouchableWithoutFeedback } from 'react-native';
import { createAppContainer , withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { AppText , AppView } from './src/defaults/customViews';
import styles from './src/defaults/styles';

// import header components.
import HeadMenu  from './src/components/header/headMenu';
import HeadTitle from './src/components/header/headTitle';

// import screens
import HomeScreen  from './src/screens/Home';
import OrderScreen from './src/screens/Order';
import MenuScreen  from './src/screens/Menu';

// state management
import { StoreProvider , createStore } from 'easy-peasy';
import { useStore , useActions } from 'easy-peasy';
import model from './src/model';
const store = createStore( model );

var screens = {
    Home:  HomeScreen ,
    Order: OrderScreen ,
    Menu : MenuScreen
}

const FoodApp = createAppContainer( createStackNavigator(
      screens ,
      {
          transitionConfig : () => ({
              transitionSpec: {
                  duration: 0
              },
          }),
          initialRouteName: 'Home',

          defaultNavigationOptions: {
              headerStyle: {
                backgroundColor: 'white', boxShadow:null ,
                borderBottomColor: 'white',
                elevation: 0 ,
                height: 100
              },
              headerTitle: () => <HeadTitle /> ,
              headerRight: () => <HeadMenu  />
          }
      }
));

export default class App extends Component {
  state = {
      fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'main_bold': require('./assets/custom_font/Montserrat-Italic.ttf')   ,
      'main_reg' : require('./assets/custom_font/Montserrat-Regular.ttf') ,
      'main_Med' : require('./assets/custom_font/Montserrat-Medium.ttf')  ,
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
        this.state.fontLoaded ? (
          <StoreProvider store={ store }>
              <FoodApp />
          </StoreProvider >
        ) : (
          null
        )
    );
  }
}
