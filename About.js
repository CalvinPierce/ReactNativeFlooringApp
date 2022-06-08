import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export function AboutScreen({navigation}){
    return (
    <View style={styles.container}>
      <Text>By: Calvin Pierce</Text>
      <Text>SID: 101253832</Text>
      <Button title="Main" onPress={() => navigation.navigate('Main')} />
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });