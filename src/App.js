import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Posts from './views/Posts';
import SinglePost from './views/SinglePost';

const IS_TABLET = Dimensions.get('window').width > 767;

export default class App extends Component {
  
  static navigationOptions = { title: 'Reddit Posts' };

  constructor(props){
    super(props);

    this.state = {
      selectedPost : 0,
      data: [],
      visited: [],
    }
  }

  selectPost = (index) => {
    this.setState({selectedPost: index });
  }

  tablet =() =>{
    const {selectedPost, data} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.posts}>
          <Posts data={data} selectedPost={selectedPost} selectPost={this.selectPost} navigation={this.props.navigation}/>
        </View>
        <View style={styles.single}>
          <SinglePost post={data[selectedPost]} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
  phone = () =>{
    const {data} = this.state;
    return(
      <View>
        <Posts data={data} navigation={this.props.navigation}/>
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
  }

  render() {
    return IS_TABLET ? this.tablet() : this.phone();
  }


  getData() {
    return fetch('https://www.reddit.com/r/articles/top/.json?count=20')
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
