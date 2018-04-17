import { AppRegistry } from 'react-native';
import {
    StackNavigator,
  } from 'react-navigation';
  
import App from './src/App';
import SinglePost from './src/views/SinglePost';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const Main = StackNavigator({
    Home: { screen: App },
    
    Single: { screen: SinglePost },
}, );



AppRegistry.registerComponent('reddit', () => Main);
