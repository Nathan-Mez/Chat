/*
A page displaying the conversation, as well as an input field and submit button 
*/
import React from 'react';
import { View, Text} from 'react-native';
import * as Font from 'expo-font';

let customFonts = { 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'), };

export default class Chat extends React.Component {

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    
  }

  componentDidMount(){
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this._loadFontsAsync();
  }
  

  render() {
    
    let color = this.props.route.params.color;

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: color}}>
        <Text style = {{ fontFamily: 'Poppins-Regular', fontSize: 30}}> Hello {this.props.route.params.name} </Text>
        <Text style = {{ fontSize: 20}}>This is Your Chat Screen</Text>
      </View>
    )
  }
}