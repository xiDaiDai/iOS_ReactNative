/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
  StatusBar
} from 'react-native';

import Splash from './splash';
import Root from './root';
//what the fuck is wrong with mac git github,xishiwei@sina.cn/xiDaiDai

let nav;

class reactnative extends Component {

  constructor(props) {
    super(props);

    this.state = {
      splashed: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        splashed: true
      });
    }, 4000);
   
  }

  renderScene(route, navigator) {
    let Component = route.component;
    return <Component navigator={navigator} route={route} />
  }

  render() {
    if (this.state.splashed) {
      let initialRoute = {
        name: 'home',
        component:Root
      }
      return (
        <View style={styles.container}>
        <StatusBar
          hidden={false}
          barStyle="light-content"
        />
        <Navigator
              style={styles.container}
              initialRoute={initialRoute}
              configureScene={() => Navigator.SceneConfigs.PushFromRight}
              renderScene={(route,navigator)=>this.renderScene(route,navigator)}
        />
        </View>);
    }else {
      return (
        <View style={styles.container}>
                  <StatusBar
                      hidden={true}
                      barStyle="light-content"/>
                   <Splash/>
                </View>);
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('reactnative', () => reactnative);
