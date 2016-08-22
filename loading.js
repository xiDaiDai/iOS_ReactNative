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
  ActivityIndicator
} from 'react-native';

class LoadingView extends Component {
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
       <ActivityIndicator size ="small" color='#272822' />
      <Text style={{fontSize:13,color:'#272822',marginLeft:10}}>正在加载......</Text>
      </View>
    );
  }
}



export default LoadingView;
