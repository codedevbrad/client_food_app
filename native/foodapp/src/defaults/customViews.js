import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View , Text } from 'react-native';

import {styles} from './styles';
const { text , container } = styles;

const AppText = ( { children , fontWeight , size , color  } ) => {
    size  = size  || 15;
    color = color || 'black';
    // light , thin , medium
    return (
      <Text style={ text , { fontFamily: 'sans-serif-'+fontWeight , fontSize : size , color: color } }>
          { children }
      </Text>
    )
}

const AppView = ( { children } ) => {
    return (
      <View style={ container }>
          { children }
      </View>
    )
}

export { AppText , AppView };
