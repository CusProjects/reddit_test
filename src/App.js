import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Posts from './views/Posts';
import SinglePost from './views/SinglePost';

const IS_TABLET = Dimensions.get('window').width > 767;

export default class App extends Component {
  
  static navigationOptions = { title: 'Reddit Posts' };

  constructor(props){
    super(props);
    this.addToVisited = this.addToVisited.bind(this);
    this.deleteAllPost = this.deleteAllPost.bind(this);
    this.state = {
      selectedPost : -1,
      data: [],
      visited: [],
    }
  }

  selectPost = (index) => {
    this.setState({selectedPost: index });
  }
  deletePost = (index) => {
    let result = []
    const {data} = this.state;
    data.forEach((x, i) => {
      if(index !== i){
        result = [...result, x];
      }else{
        result = [...result, null];
      }
    });
    this.setState({data:result}); 
  }
  async deleteAllPost(index) {
    this.setState({data: []});
      try {
        await AsyncStorage.setItem('visited', JSON.stringify([]));
      } catch (error) {
        // Error saving data
      }
  }

  async addToVisited(index){
    let {visited} = this.state;
    visited = [...visited, index];
    this.setState({visited});
    try {
      await AsyncStorage.setItem('visited', JSON.stringify(visited));
    } catch (error) {
      // Error saving data
    }
    
    
  }

  tablet =() =>{
    const {selectedPost, data, visited} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.posts}>
          <Posts deleteAllPost={this.deleteAllPost} visited={visited} addToVisited={this.addToVisited} deletePost={this.deletePost} data={data} selectedPost={selectedPost} selectPost={this.selectPost} navigation={this.props.navigation}/>
        </View>
        <View style={styles.single}>
          <SinglePost post={data[selectedPost]} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
  phone = () =>{
    const {data, visited} = this.state;
    return(
      <View>
        <Posts deleteAllPost={this.deleteAllPost} visited={visited} addToVisited={this.addToVisited} deletePost={this.deletePost} data={data} navigation={this.props.navigation}/>
      </View>
    );
    
  }

  async UNSAFE_componentWillMount(){
    try{
      const response = await this.getData();
      this.setState({data: response.data.children});
    }catch(error){
      console.log(error);
    }

    try {
      const value = await AsyncStorage.getItem('visited');
      if (value !== null){
          this.setState({visited: JSON.parse(value)});
      }else{
          this.setState({visited: []});
      }
    } catch (error) {
        this.setState({visited: []});
    }

  }

  render() {
    return IS_TABLET ? this.tablet() : this.phone();
  }


  getData() {
    return fetch('https://www.reddit.com/r/articles/top/.json?count=50')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row'
  },
  posts:{
    backgroundColor: "#000",
  },
  single:{
    flexGrow: 1,

  }
});
