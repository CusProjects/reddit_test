import React, { Component } from 'react';
import { View, Text,  FlatList, StyleSheet, Dimensions} from 'react-native';

import PostItem from '../components/PostItem';
const IS_TABLET = Dimensions.get('window').width > 767;

class Posts extends Component {

    static defaultProps = {
        selectedPost : -1,
        selectPost: ()=>{},
        data: [],
    };


    _renderItem = ({item, index}) => {
        const {selectedPost} = this.props;
        return item ? (
            <PostItem 
                index={index}
                title={item.data.author}
                datetime={item.data.created}
                description={item.data.title}
                image={item.data.thumbnail}
                comments={item.data.num_comments}
                active={selectedPost === index}
                onPress={()=>{
                    if(!IS_TABLET){
                        this.props.navigation.navigate('Single',{
                            author: this.props.data[index].data.author,
                            title: this.props.data[index].data.title,
                            image: this.props.data[index].data.thumbnail,
                        });
                    }else{
                        this.props.selectPost(index);
                    }
                }}
                onClose={()=>{
                    this.props.deletePost(index);
                }}
            />
        ) : null;
    }

    render() {
        const {data} = this.props;
        return (
            <FlatList
                contentContainerStyle={styles.list_container}
                data={data}
                renderItem={this._renderItem}
                keyExtractor={(item, index)=>`post_item_${index}`}
                ItemSeparatorComponent={()=><View style={styles.separator}/>}
            />
        );
    }
}

const styles = StyleSheet.create({
    page:{
        backgroundColor: "#000",
    },
    separator: {
        height: 1,
        backgroundColor: "#fff",

    },
    list_container:{
       
    }
});

export default Posts;
