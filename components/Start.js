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
        color: '',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

  componentDidMount() {
    this._loadFontsAsync();
  }


  render() {

    return (

      <View style = {{ flex: 1}}>
        <ImageBackground source={ require('../assets/Background-Image.png')} style = { styles.image }>
          <Text style = {styles.title}>Chat-App</Text>

          <View style = {styles.inputbox}>

            <TextInput 
              style={styles.textinput}
              placeholder = 'Your Name'
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}>
            </TextInput>

            <View style = {{height: '40%', marginVertical: '10%'}}>
              <Text style = {{ fontFamily: 'Poppins-Regular', color: '#777', fontSize: 17}}>Choose Background Color:</Text>
               <View style = {{ flexDirection: 'row', justifyContent: 'center'}}>
                <Button color="#090C08" title='' onPress={() => this.setState({ color: '#090C08' })} style={styles.choosecolor}/>  
                <Button color="#474056" title='' onPress={() => this.setState({ color: '#474056' })} style={styles.choosecolor}/> 
                <Button color="#8A95A5" title='' onPress={() => this.setState({ color: '#8A95A5' })} style={styles.choosecolor}/>  
                <Button color="#B9C6AE" title='' onPress={() => this.setState({ color: '#B9C6AE' })} style={styles.choosecolor}/> 
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
    color: '#FFF', 
    alignSelf: 'center',
  },
  inputbox: { 
    backgroundColor: 'white', 
    padding: '6%', 
    marginHorizontal: '6%',
    height: '44%',
    borderRadius: 4, 
    justifyContent: 'center'
  },
  choosecolor: {
    borderRadius: 6,
    width: 30,
  },
  textinput: {
    height: 50, 
    alignSelf: 'center', 
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