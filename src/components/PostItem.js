import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

class PostItem extends PureComponent {

    static defaultProps = {
        title: 'This is the title',
        image:  "https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?resize=640%2C426",
        datetime: 1411975314,
        description: 'This is it iwtsdf sdsd fsd sdfsd dsfsdkla jfadls; jsadl jfadls;fj dkls;afjasdl;k fjdkls;a fjsadkl; fjadls;kfj  sdfsdfsdfsdfsdfsd',
        onClose: ()=>{},
        onPress: () => {},
        index: -1,
        seen: false,
        comments: 5589,
        active: false,
    };

    render() {
        const {title, image, datetime, description, index, seen, comments, active} = this.props;
        const activeStyles = active ? {backgroundColor: "#333333"} : null;
        return (
            <View style={[styles.container, activeStyles]}>
                <View style={[styles.close, {marginBottom: 10}]}>
                    {!seen ? 
                        <View style={styles.seen}></View>
                    :null}
                    <Text style={styles.title}>
                    {title} <Text style={[styles.body, {textAlign: 'right'}]}>{moment(datetime, "X").fromNow()}</Text></Text>
                </View>
               
                <View style={styles.center_container}>
                    <View>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>

                    <View style={styles.text_container}>
                        <Text style={styles.body}>{`${description}` }</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.props.onPress.bind(this, index)}>
                            <Text style={styles.icon}>></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.close, {marginTop: 10}]}>
                    <TouchableOpacity onPress={this.props.onClose.bind(this, index)}> 
                        <View style={styles.close}>
                            <View style={styles.circle}>
                                <Text style={styles.circle_text}>X</Text>
                            </View>
                            <Text style={[styles.body, {marginLeft: 10,}]}>{`Dismiss Post`}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.text_accent}>{`${comments} comments`}</Text>
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container:{
        padding: 10,
        backgroundColor: "#000",
    },
	center_container: {
		flexDirection: 'row',
		alignItems: 'center',
        justifyContent: 'space-between',
       
	},
	container_image: {
		width: 100,
		height:100,
	},
	text_container: {
		borderColor: 'red',
		flexDirection: 'column',
        flex:4,
        marginLeft: 10,
	},
	title: {
		color: "#fff",
		fontSize: 18,
	},
	body: {
		marginRight: 30,
		color: "#fff",
		textAlign: 'left',
		fontSize: 12,
	},
	image:{
		width: 100,
		height: 100,
    },
    icon:{
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 30,
    },
    close:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle:{
        width: 28,
        height: 28,
        borderWidth: 3,
        borderColor: "#f67c22",
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 14,
    },
    circle_text: {
        color: "#f67c22",
        fontSize: 18,
        fontWeight: "bold",
    },
    seen: {
        width: 15,
        height: 15,
        backgroundColor: "#157efb",
        borderRadius: 8,
        marginRight: 10,
    },
    text_accent:{
        color: "#f67c22",
    }
});
export default PostItem;
