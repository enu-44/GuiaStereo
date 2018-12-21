
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Share, Linking,Text,WebView,Button,Dimensions ,Image, View} from 'react-native';
import {  createStackNavigator,StackNavigator,createAppContainer   } from 'react-navigation';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ActionButton from 'react-native-action-button';

const isAndroid= Platform.OS==='android'



class HomeScreen extends Component{

  
constructor(props){
  super(props)
  this._shareMessage= this._shareMessage.bind(this);
  this._shareFacebook= this._shareFacebook.bind(this);
  this._shareYoutube= this._shareYoutube.bind(this);
  this._callPhoneHandlePress=this._callPhoneHandlePress.bind(this);
}



_showResult(result){
  this.setState({result})
}

_shareMessage(){
  Share.share({
    //url:'https://www.facebook.com/guiaestereo/',
    message:'Hola Dios Te Bendiga, Quiero que escuches siempre la mejor radio, GUÍA ESTÉREO, 24 horas de buena música y mensajes cristianos. Desde el 💛 de Colombia, http://www.guiaestereo.com, Te Invitamos también a descargar nuestra App GUÍA ESTÉREO disponible para dispositivos Android.'
  }).then(this._showResult);
}


_shareFacebook(){
  Linking.canOpenURL('https://www.facebook.com/guiaestereo/').then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + 'https://www.facebook.com/guiaestereo/');
    } else {
      return Linking.openURL('https://www.facebook.com/guiaestereo/');
    }
  }).catch(err => console.error('An error occurred', err));
}


_shareYoutube(){
  Linking.canOpenURL('https://www.youtube.com/channel/UCoJ4Hn0eazBC8hydqAOAUMA').then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + 'https://www.youtube.com/channel/UCoJ4Hn0eazBC8hydqAOAUMA');
    } else {
      return Linking.openURL('https://www.youtube.com/channel/UCoJ4Hn0eazBC8hydqAOAUMA');
    }
  }).catch(err => console.error('An error occurred', err));
}

_callPhoneHandlePress(){
  Linking.canOpenURL('tel:3004659002').then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + 'tel:3004659002');
    } else {
      return Linking.openURL('tel:3004659002');
    }
  }).catch(err => console.error('An error occurred', err));
}


render(){
    return (
      <View style={{flex:1}}>

      <WebView 
          style={styles.webview}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          source={{uri:isAndroid?'file:///android_asset/widget/index.html':'./widget/index.html'}}/>

        
        <ActionButton
        style={styles.actionButton}
        titleBgColor="000000"
        buttonColor="#fecc00"
        bgColor="rgba(255,255,255,.5)"
          ///icon={<Icon name="md-cut" style={styles.actionButtonIcon} />}
        //renderIcon={active => active ? (<Icon name="
        //youtube" style={styles.actionButtonIcon} /> ) : (<Icon name="
        //youtube" style={styles.actionButtonIcon} />)}
        >
          
              <ActionButton.Item buttonColor="#fecc00" titleColor="#ffffff" titleBgColor="#333333" title="You Tube" 
                //onPress={() => {this._shareYoutube}}
                onPress={this._shareYoutube}
                >
                <Icon name='youtube' size={25}   style={styles.actionButtonIcon}/>
              </ActionButton.Item>

              <ActionButton.Item buttonColor="#fecc00" titleColor="#ffffff" 
              titleBgColor="#333333"
              title="Facebook" 
              onPress={this._shareFacebook}
              >
                <Icon name="facebook" style={styles.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item buttonColor="#fecc00"  titleColor="#ffffff" titleBgColor="#333333" title="Compartir en redes sociales" 
              onPress={this._shareMessage}>
                <Icon name="share-alt" style={styles.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item buttonColor="#fecc00" titleColor="#ffffff" titleBgColor="#333333"
              title="Llamar a Guia Estéreo" 
              //onPress={() => console.log("notes tapped!")}
              onPress={this._callPhoneHandlePress}
              >
                <Icon name="phone" style={styles.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item buttonColor="#fecc00" titleColor="#ffffff" 
              title="Acerca de" 
              onPress={() => this.props.navigation.navigate('Details')}>
                <Icon name="thumbs-up" style={styles.actionButtonIcon} />
              </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}


class DetailsScreen extends Component{

  
  render(){
    return (
      <View   style={styles.container}>

      <Text style={styles.tittle} color="#FFFFFF" >Guía Estéreo</Text>
      <Image source={require('./img/logo_fondo.png')} />
    
      <Text style={styles.subtitle} color="#FFFFFF" >Versión 1.0</Text>
      <Text style={styles.subtitle} color="#FFFFFF">Desarrollado por Nersaki.com</Text>
    
      </View>
    );
  }
}

/*
  <Button title="Guía Estéreo"
      onPress={()=>this.props.navigation.goBack()}>
      </Button>
*/

const RootStack=createStackNavigator (
  {
    Home:{
      screen:HomeScreen,
    },
    Details:{
      screen:DetailsScreen,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {backgroundColor: 'transparent'},
    initialRouteName:'Home',
  }
);


const AppContainer = createAppContainer(RootStack);
//export default createAppContainer(RootStack);
/*
const AppNavigator = StackNavigator({
  //SettingScreen: { screen: Settings },
  Perfil: { screen: Perfil }
});*/

//Views
//import Home from './screens/Home';
type Props = {};
export default class App extends Component<Props> {
  render() {
   return (<AppContainer />);
  }
}


const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: '#ffaa00',
    width: deviceWidth,
    height: deviceHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffaa00',

    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  tittle: {
    fontFamily: 'monospace',
    color: '#FFFFFF',
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 26,
    textAlign: 'center',
    margin: 10,
  },


  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  actionButtonItem: {
  //  titleColor="#ffffff",
  // titleBgColor="#333333",
  //  buttonColor="#fecc00",
  //color='white',
  //backgroundColor='#333333'
  },

  actionButton: {
    color: 'black',
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'black',
  },
});