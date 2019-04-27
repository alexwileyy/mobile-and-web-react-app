/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Animated, Platform, StyleSheet, Text, View, Image} from 'react-native';

import GetNavStack, {NavStack} from './AppNavigator';
import {BrandYellow} from "./variables";

import {containerPadding} from './variables'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.NewNavStack = GetNavStack({toggleDateHeader: this.toggleDateHeader});
  }

  state = {
    showDateHeader: false,
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  };

  componentDidMount(): void {
  }

  toggleDateHeader = (toggle) => {

    this.setState(state => ({showDateHeader: toggle}), ()=>{
      Animated.timing(                  // Animate over time
          this.state.fadeAnim,            // The animated value to drive
          {
            toValue: toggle ? 1 : 0,                   // Animate to opacity: 1 (opaque)
            duration: 200,              // Make it take a while
          }
      ).start();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Image source={require('./assets/img/icon/logo.png')} style={styles.logo}/>
        </View>
        <this.NewNavStack/>
        <Animated.View          // Special animatable View
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              opacity: this.state.fadeAnim,         // Bind opacity to animated value
            }}
        >
          <View style={styles.navTop}>
            <Text style={styles.navTopText}>Monday 28 April</Text>
          </View>
        </Animated.View>
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
  },
  navTopContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  navTop: {
    backgroundColor: BrandYellow,
    width: "100%",
    paddingTop: 50,
    paddingLeft: containerPadding,
    paddingRight: containerPadding,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  navTopText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Catamaran-Bold",
  }
});



export default App;