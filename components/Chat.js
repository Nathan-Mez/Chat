/*
A page displaying the conversation, as well as an input field and submit button 
*/
import React from 'react';
import { Image, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      uid: 0,
      messages: [],
      isConnected: undefined,
    }
    
    //Connect to firebase Database
    const firebaseConfig = {
      apiKey: "AIzaSyBY-QUSVCQPPwkCTyPBWz9QXcTdBcckrQ8",
      authDomain: "chat-app-afe88.firebaseapp.com",
      projectId: "chat-app-afe88",
      storageBucket: "chat-app-afe88.appspot.com",
      messagingSenderId: "730182521206",
      appId: "1:730182521206:web:a2dd88f1d7ab86d6b82a57",
      measurementId: "G-LMKP7MZ6DC"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

  //create reference to 'messages' collection
  this.referenceMessages = firebase.firestore().collection('messages');
}
  
onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    let data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: data.user,
      image: data.image || null,
      location: data.location || null,
    });
  });
  this.setState({
    messages,
  });
}  

addMessages() {                                 //Add last message to database
  const message = this.state.messages[0];
  this.referenceMessages.add({
    uid: this.state.uid,
    _id: message._id,
    text: message.text || " ",
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null,
  });
} 

async getMessages() {                            //save messages to storage once state object is updated
  let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') || [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error.message);
  }
};

async saveMessages() {                            //save messge to asyncStorage using the setItem() method
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

async deleteMessages() {                         //Clear messages in asyncStorage
  try {
    await AsyncStorage.removeItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message);
  }
}

/*=================================================================
        component did mount, will unmount or unmount
===================================================================*/

  componentDidMount() {

    let name = this.props.route.params.name;
    if ( name === '') {                //Set navigation title to 'Chat Screen' if there's no userinput
      name = 'Chat Screen'
    }
    this.props.navigation.setOptions({ 
      title: name, 
    });

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
      } else {
        this.setState({ isConnected: false });
      }
    });

    if (this.state.isConnected == false){
      this.getMessages();
    }else{
      this.getMessages();
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
        });
  
        this.referenceMessages = firebase.firestore().collection('messages');
        this.unsubscribe = this.referenceMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
      });
    }
  }

  componentWillUnmount() {
    if (this.state.isConnected){
      this.unsubscribe();
      this.authUnsubscribe();
    }
 }

 /*========================================================
            on Render Functions 
  ==========================================================*/

onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),() => {
    this.addMessages();
    this.saveMessages();
  });
}
renderBubble(props) {
  return (
    <Bubble                             //Message bubble styling
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#E0DCCC',
        },
        right: {
          backgroundColor: '#5475A0'
        }
      }}
    />
  );
}

renderSend(props) {                    //Send - custom styling
  return (
      <Send {...props}>
          <View style={{ justifyContent: 'center'}}>
              <Image source={require('../assets/send.png')} resizeMode={'center'}/>
          </View>
      </Send>
  );
}

renderInputToolbar(props) {             //hide input bar when user is offline
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

renderCustomView (props) {
  const { currentMessage} = props;
  if (currentMessage.location) {
    return (
        <MapView
          style={{width: 150,
            height: 100,
            borderRadius: 30,
            margin: 7}}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    );
  }
  return null;
}

renderCustomActions = (props) => {
  return <CustomActions {...props} />;
};

/*========================================================================= 
                   Render 
============================================================================*/
  

  render() {
    
    let color = this.props.route.params.color;

    return (
      <View style={{flex: 1}}>
        <GiftedChat
          placeholder='Type Your Message'
          alwaysShowSend
          renderSend={this.renderSend}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
          listViewProps={{
            style: {
              backgroundColor: color,
            },
          }}
          user={{
            _id: this.state.uid,
            avatar: "https://placeimg.com/140/140/people",
          }}
        />
        
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>  
    )
  }
}