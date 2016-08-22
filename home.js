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
  Image,
  ListView,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';

import LoadingMoreView from './loadingMore';
import LoadingView from './loading';
import NewsPage from './newsPage';
const url = "https://jandan.net/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,title,custom_fields&custom_fields=thumb_c,views&dev=1&page=";

let pageIndex = 1;

class NewsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      loadMore: false,
      newContent: null,
    };
  }

  componentDidMount() {
    console.log('--------------');
    this.fetchNewsData();
  }

  render() {
    if(!this.state.loaded)return <LoadingView/>
    return (
      <View style={{flex:1}}>
        <View style={{height:50,backgroundColor:'#4b4b4b',justifyContent:'center'}}>
          <Text style={{fontSize:20,color:'white',textAlign:'center'}}>新鲜事</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(newsItem)=>this.renderNewsItem(newsItem)}
          onEndReached={()=>this.loadmore()}
          onEndReachedThreshold={30}
          renderFooter={()=>this.renderFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={()=>this.onRefresh()}
              colors={['#272822']}/>}/>
      </View>
    );
  }


  renderFooter() {
    return (this.state.loadmore && <LoadingMoreView/>);

  }


  renderNewsItem(newsItem) {
    return (
      <TouchableHighlight
            underlayColor='white'
            onPress={() => this.pressRow(newsItem.id,newsItem.title)} >
        <View style={{backgroundColor:'white',flexDirection:'column'}}>
          <View style={{justifyContent:'center', flexDirection :'row',padding:10}}>
               <View style= {styles.leftContainer}>
                  <Text style = {{fontSize:15,color:'#272822'}}>{newsItem.title}</Text>
                  <View style = {{flex:1,justifyContent:'flex-end'}} >
                    <Text >{newsItem.date}</Text>
                  </View>
               </View>
               <Image
                  style = {styles.thumbnail}
                  source={{uri:newsItem.custom_fields.thumb_c[0]}}/>
          </View>
          <View style={{backgroundColor:'#d8d8d8',height:0.5,flexDirection: 'row'}}/>
        </View>
      </TouchableHighlight>

    );
  }

  onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    this.fetchNewsData();
  }


  fetchNewsData() {
    console.log('=====start====')
    pageIndex = 1;
    fetch(url + pageIndex)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({
          newContent: responseData.posts,
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          loaded: true,
          isRefreshing: false
        });
        console.log('================')
      }).catch((err) => {
        // ToastAndroid.show(err.message, 3000)
         console.log('=========error======='+err.message);
      })
      .done();
  }

  refreshFromHomePage() {
    this.setState({
      isRefreshing: true,
    });
    fetchNewsData();
  }

  loadmore() {
    if (this.state.loadmore) return;
    this.setState({
      loadmore: true
    });
    pageIndex++;
    fetch(url + pageIndex)
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({
          newContent: [...this.state.newContent, ...responseData.posts],
          dataSource: this.state.dataSource.cloneWithRows(this.state.newContent),
          loaded: true,
          isRefreshing: false,
          loadmore: false
        });
      }).catch((err) => {
        // ToastAndroid.show(err.message, 1000)
      })
      .done();
  }


  pressRow(id, title) {
    this.props.navigator.push({
      component: NewsPage,
      params: {
        id: id,
        title: title
      }

    });
  }



}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  leftContainer: {
    height: 60,
    flexDirection: 'column',
    flex: 1,
    marginRight: 5,
    backgroundColor: 'white',
  },
  thumbnail: {
    width: 90,
    height: 60,
  },
});

export default NewsList;
