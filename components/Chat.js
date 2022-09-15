/*
A page displaying the conversation, as well as an input field and submit button 
*/
import React from 'react';
import { Image, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      uid: 0,
      messages: [],
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
    });
  });
  this.setState({
    messages,
  });
}  

addMessages() {
  const message = this.state.messages[0];
  this.referenceMessages.add({
    _id: message._id,
    text: message.text || "",
    createdAt: message.createdAt,
    user: message.user,
  });
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

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
 }

 /*========================================================
            on Render Functions 
  ==========================================================*/

onSend(messages = []) {
  this.setState((previousState) => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }),() => {
    this.addMessages();
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
          //textInputStyle={{backgroundColor: '#DDD', margin: 10}}
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