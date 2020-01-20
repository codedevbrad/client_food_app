import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const MenuScreen = ( { navigation } ) => {
    const id = JSON.stringify(navigation.getParam('itemId'));
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> menu screen </Text>
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
}

export default MenuScreen;
