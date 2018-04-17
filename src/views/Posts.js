import React, { Component } from 'react';
import { View, Text,  FlatList, StyleSheet} from 'react-native';

import PostItem from '../components/PostItem';

class Posts extends Component {


    _renderItem = ({item, index}) => {
        return(
            <PostItem />
        );
    }

    render() {
        return (
        <View style={styles.page}>
            <FlatList 
                contentContainerStyle={styles.list_container}
                data={[0,1,2,3,4]}
                renderItem={this._renderItem}
                keyExtractor={(item, index)=>`post_item_${index}`}
                ItemSeparatorComponent={()=><View style={styles.separator}/>}
            />
        </View>
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
        marginLeft: 10,
        marginRight: 10,
    }
});

export default Posts;
