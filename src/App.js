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

const IS_TABLET = Dimensions.get('window').width > 767;

export default class App extends Component {
  
  static navigationOptions = { title: 'Reddit Posts' };

  tablet =() =>{
    return(
      <View>
        <Text>Tablet</Text>
      </View>
    );
  }
  phone = () =>{
    return(
      <View>
      
       <Posts />

      </View>
    );
    
  }

  render() {
    return IS_TABLET ? this.tablet() : this.phone();
  }
}

const styles = StyleSheet.create({
 
});
