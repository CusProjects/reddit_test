import React, { Component } from 'react';
import { View, Text,  FlatList} from 'react-native';

import PostItem from '../components/PostItem';

class Posts extends Component {
  render() {
    return (
      <View>
        <PostItem />
      </View>
    );
  }
}

export default Posts;
