import React, { Component } from 'react';
import { View, Text,  FlatList, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';

import PostItem from '../components/PostItem';
const IS_TABLET = Dimensions.get('window').width > 767;

class Posts extends Component {

    static defaultProps = {
        selectedPost : -1,
        selectPost: ()=>{},
        addToVisited: ()=> {},
        deleteAllPost: () => {},
        data: [],
        visited: [],
    };
    
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            data: this.props.data,
            isFetching: false,
        }
    }


    _renderItem = ({item, index}) => {
        const {selectedPost, visited} = this.props;
        return item ? (
            <PostItem
                seen={visited.indexOf(index) >= 0}
                index={index}
                title={item.data.author}
                datetime={item.data.created}
                description={item.data.title}
                image={item.data.thumbnail}
                comments={item.data.num_comments}
                active={selectedPost === index}
                onPress={()=>{
                    this.props.addToVisited(index);
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

    getData() {
        fetch('https://www.reddit.com/r/articles/top/.json?count=50')
          .then((response) => response.json())
          .then((responseJson) => {
           //data here
            this.setState({data: responseJson.data.children, isFetching: false});
          })
          .catch((error) => {
            console.error(error);
          });
      }

      onRefresh() {
        this.setState({ isFetching: true }, () => {
          this.getData();
        });
      }

      UNSAFE_componentWillReceiveProps(nextProps){
          this.setState({data: nextProps.data});
      }
   
    render() {
        const {data} = this.state;
        return (
            <View>
                <FlatList
                    refreshing={this.state.isFetching}
                    onRefresh={this.onRefresh}
                    contentContainerStyle={styles.list_container}
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index)=>`post_item_${index}`}
                    ItemSeparatorComponent={()=><View style={styles.separator}/>}
                />
                <TouchableHighlight underlayColor={"gray"}  onPress={this.props.deleteAllPost} style={styles.button_container}>
                    <Text style={{color: "#fff", fontSize: 24, textAlign: 'center'}}>Dismiss All</Text>
                </TouchableHighlight >
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
       paddingBottom: 30,
    },
    button_container:{
        position: 'absolute',
        bottom: 0,
        right:0,
        left:0,
        backgroundColor: "#000",
    }
});

export default Posts;
