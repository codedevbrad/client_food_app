
import React , { Component , useEffect , useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet , Button , Image , View , Text , TouchableWithoutFeedback } from 'react-native';
import { createAppContainer , withNavigation } from 'react-navigation';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppText , AppView } from '../../defaults/customViews';

class HeadMenu extends React.Component {
  constructor( props ) {
    super( props );
    this.navigateEvent = this.navigateEvent.bind( this );
  }
  navigateEvent () {
      this.props.navigation.navigate('Menu', { itemId: 86, });
  }

  render() {
    return (
     <View style={{ flex: 0, alignItems: 'flex-start', justifyContent: 'center' }}>

          <TouchableWithoutFeedback onPress={ this.navigateEvent }>
            <Ionicons style={{ marginRight: 30 , padding: 20 }}
                name="md-menu" size={35} color="black"
             />
          </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default withNavigation( HeadMenu );
