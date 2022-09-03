/*
   A page where users can enter their name and 
   choose a background color for the chat screen before joining the chat.
*/
import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, } from 'react-native';
import * as Font from 'expo-font';

let customFonts = { 
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
 };

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        name: '',   
        color: '#CDC7B7',          //Default background color for chat screen
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.props.navigation.setOptions({ 
      headerStyle: {
        backgroundColor: '#EEE',
     }
    });
  }


  render() {

    return (

      <View style = {{ flex: 1}}>
        <ImageBackground source={ require('../assets/Background-Image.png')} style = { styles.image }>
          <Text style = {styles.title}>ChatApp</Text>

          <View style = {styles.inputbox}>

            <TextInput 
              style={styles.textinput}
              placeholder = 'Your Name'
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}>
            </TextInput>

            <View style = {{height: '40%', marginVertical: '8%'}}>
              <Text style = {{ fontFamily: 'Poppins-Regular', color: '#777', fontSize: 17}}>Choose Background Color:</Text>
               <View style = {{ flexDirection: 'row', justifyContent: 'space-around', height: 40, marginVertical: '5%' }}>
                <TouchableOpacity onPress={() => this.setState({ color: '#090C08' })} style={{minWidth: 37, backgroundColor: '#090C08', borderRadius: 20}}/> 
                <TouchableOpacity onPress={() => this.setState({ color: '#474056' })} style={{minWidth: 37, backgroundColor: '#474056', borderRadius: 20}}/> 
                <TouchableOpacity onPress={() => this.setState({ color: '#8A95A5' })} style={{minWidth: 37, backgroundColor: '#8A95A5', borderRadius: 20}}/>   
                <TouchableOpacity onPress={() => this.setState({ color: '#B9C6AE' })} style={{minWidth: 37, backgroundColor: '#B9C6AE', borderRadius: 20}}/>
              </View>
            </View>  

            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
              style = {styles.startchatting}>
              <Text style = {{ fontFamily: 'Poppins-Regular', color: '#FFF', fontSize: 16}} >Start Chatting</Text>
            </TouchableOpacity>  
    
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: { 
    fontFamily: 'Poppins-Bold', 
    fontSize: 45, 
    color: '#DEE', 
    alignSelf: 'center',
  },
  inputbox: { 
    backgroundColor: '#FFF', 
    padding: '6%', 
    marginHorizontal: '6%',
    borderRadius: 4, 
    height: '44%',
    justifyContent: 'space-around',
    marginTop: '25%'
  },
  choosecolor: {
    borderRadius: 20,
    minWidth: 37,
    backgroundColor: '#B9C6AE' ,
  },
  textinput: {
    height: 50, 
    fontFamily: 'Poppins-Regular',
    borderColor: '#aaa', 
    padding: 10,
    borderRadius: 4,
    borderWidth: 1.5,
    width: '100%'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  startchatting: {
    backgroundColor: '#757083', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 50,
    borderRadius: 4
  }
});