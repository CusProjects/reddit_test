import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import App from '../App';

class SinglePost extends Component {
  render() {
    //params.postIndex;
    let post = {};
    const {params} = this.props.navigation.state;
    console.log(params);
    if(params){
    
        post = {
            data: {
                author: params.author,
                thumbnail: params.image,
                title: params.title,

            }
        };
        
       
    }else{
        post = this.props.post;
    }

    post = post || {data: {}};

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{post.data.author}</Text>
        <Image resizeMode={`cover`} style={styles.image} source={{uri: post.data.thumbnail}}/>
        <Text style={styles.text}>{post.data.title}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        paddingLeft: 15,
        paddingRight: 15
    },
    title: {
		color: "#000",
		fontSize: 18,
    },
    image:{
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    text:{
        
    }
});

export default SinglePost;
