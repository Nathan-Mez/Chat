/*
A page displaying the conversation, as well as an input field and submit button 
*/
import React from 'react';
import { Text, View, Platform, KeyboardAvoidingView, TouchableHighlightBase } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'


export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  

  renderBubble(props) {
    return (
      <Bubble
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


  componentDidMount(){
    let name = this.props.route.params.name;

    if ( name === '') {                //Set navigation title to 'Chat Screen' if there's no userinput
      name = 'Chat Screen'
    }

    this.props.navigation.setOptions({ 
      title: name, 
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello Developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: 'You have entered Chat room',
          createdAt: new Date(),
          system: true,
         },
      ]
    })
  }
  

  render() {
    
    let color = this.props.route.params.color;

    return (
      <View style={{flex: 1}}>
        <GiftedChat
          placeholder='Type Your Message'
          showUserAvatar
          alwaysShowSend

          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
          listViewProps={{
            style: {
              backgroundColor: color,
            },
          }}
          user={{
            _id: 1,
          }}
        />
        
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>  
    )
  }
}