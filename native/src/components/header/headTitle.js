
import React , { Component , useEffect , useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet , Button , Image , View , Text , TouchableWithoutFeedback } from 'react-native';

import { AppText , AppView } from '../../defaults/customViews';
import {styles} from '../../defaults/styles';
const { text , container } = styles;

const HeadTitle = ( ) => {
    return (
      <View style={ container , { marginLeft: 10 } }>
        <AppText fontWeight={ 'medium'} size={25 }> The ashcott </AppText>
      </View>
    )
}

export default HeadTitle;



// const HeadRight = ( ) => {
//
//     const [ boolean , setMe ] = useState(false);
//     const testMe = ( ) => setMe( !boolean );
//     return (
//       <TouchableWithoutFeedback onPress={ () => testMe() } underlayColor="white">
//       <View style={ styles.container , styles.headRight }>
//
//           <Text> { !boolean ? 'user' : 'me' } </Text>
//           <Ionicons name="ios-add-circle-outline" size={22} />
//       </View>
//       </TouchableWithoutFeedback>
//     )
//  }
