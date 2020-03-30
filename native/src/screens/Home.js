import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


const HomeScreen = ( { navigation } ) => {
    const id = JSON.stringify(navigation.getParam('itemId'));
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> { id } item </Text>
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
        />

        <Button title="order food" onPress={() => { navigation.navigate('Order', { itemId: 86, });  }} />
        <Button title="book a table" onPress={() => { navigation.navigate('Tables', { itemId: 86, });  }} />
      </View>
    );
}

export default HomeScreen;
