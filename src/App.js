/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import NavApp from './AppNavigator';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Image source={require('./assets/img/icon/logo.png')} style={styles.logo}/>
        </View>
        <NavApp/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  nav: {
    height: 100,
    width: '100%',
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10
  },
  navText: {
    color: "white",
    fontSize: 25
  },
  navIcon: {
    width: 15,
    height: 15
  },
  logo: {
    width: 150,
    height: 40
  }
});



export default App;