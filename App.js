import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AboutScreen } from './About';
import { SafeAreaView } from 'react-native-safe-area-context';

function MainScreen({ navigation }) {

  const [size, setSize] = useState(0);
  const [flooringPrice, setFlooringPrice] = useState(0);
  const [flooringCost, setFlooringCost] = useState(0);
  const [installationPrice, setInstallationPrice] = useState(0);
  const [installationCost, setInstallationCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const toggleSwitch = (value) => { setSwitchValue(value) };

  function calculateTotalCosts() {
    //Installation Cost
    const installationCost = size * installationPrice;
    if (isNaN(installationCost)) {
      setInstallationCost(0)
    } else {
      setInstallationCost(installationCost);
    }
    //Flooring Cost
    const flooringCost = size * flooringPrice;
    if (isNaN(flooringCost)) {
      setFlooringCost(0)
    } else {
      setFlooringCost(flooringCost);
    }
    //Total Cost
    const totalCost = installationCost + flooringCost;
    if (isNaN(totalCost)) {
      setTotalCost(0)
    } else {
      setTotalCost(totalCost);
    }
    //Tax
    const tax = totalCost * 0.13;
    if (isNaN(totalCost)) {
      setTax(0)
    } else {
      setTax(tax);
    }
  }

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.button}>
        <Button title="About" onPress={() => navigation.navigate('About')} />
      </SafeAreaView>
      <SafeAreaView style={styles.row}>
        <Text style={styles.text}>{switchValue ? 'Size (Square Metres):' : 'Size (Square Feet)'}</Text>
        <TextInput type="number" style={styles.input} placeholder="Size of Room"
          value={size} keyboardType="numeric" onChangeText={e => {
            setSize(Number.parseFloat(e));
          }} />
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={switchValue ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={switchValue}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.row}>
        <Text style={styles.text}>Flooring Price Per Unit:</Text>
        <TextInput type="number" style={styles.input} placeholder="Price Per Unit of Flooring"
          value={flooringPrice} keyboardType="numeric" onChangeText={e => {
            setFlooringPrice(Number.parseFloat(e));
          }} />
      </SafeAreaView>

      <SafeAreaView style={styles.row}>
        <Text style={styles.text}>Installation Price Per Unit:</Text>
        <TextInput type="number" style={styles.input} placeholder="Price Per Unit of Installation"
          value={installationPrice} keyboardType="numeric" onChangeText={e => {
            setInstallationPrice(Number.parseFloat(e));
          }} />
      </SafeAreaView>

      <SafeAreaView style={styles.button}>
        <Button onPress={calculateTotalCosts} title="Calculate Cost" />
      </SafeAreaView>

      <SafeAreaView style={styles.container}>
        <Text>Installation Cost (Before Tax): ${installationCost}</Text>
        <Text>Flooring Cost (Before Tax): ${flooringCost}</Text>
        <Text>Total Cost (Before Tax): ${totalCost}</Text>
        <Text>Tax: ${tax}</Text>
        <Text>Total Cost (With Tax): ${tax + totalCost}</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [page, setPage] = useState(false);
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Main" style={{ paddingTop: 20 }}>
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    flex: 1
  },
  button: {
    margin: 6,
    padding: 5
  },
  container: {
    margin: 6,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 5
  },
  text: {
    marginTop: 10
  }
});
