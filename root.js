/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	StatusBar
} from 'react-native';

import ScrollableTabView, {
	ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import TabBar from './tabBar';
import Pop from './news';
import Ask from './joke';
import Share from './amazing';
import Job from './video';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View style={{flex:1}}>
		      <ScrollableTabView
		          tabBarBackgroundColor='#444444'
		          tabBarUnderlineColor='transparent'
		          tabBarActiveTextColor='#80BD01'
		          tabBarInactiveTextColor='#fff'
		          scrollWithoutAnimation={true}
		          tabBarPosition='bottom'
		          renderTabBar={() => <TabBar />}
		      >
		        <Pop tabLabel="精华"  navigator={this.props.navigator}/>
		        <Ask tabLabel="分享" navigator={this.props.navigator}/>
		        <Share tabLabel="问答" navigator={this.props.navigator}/>
		        <Job tabLabel="招聘" navigator={this.props.navigator}/>
		      </ScrollableTabView>
            </View>
		);
	}
}
