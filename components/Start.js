/*
   A page where users can enter their name and 
   choose a background color for the chat screen before joining the chat.
*/
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        name: '',   
        color: '#EFEDE7',          //Default background color for chat screen
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ 
      headerStyle: {
        backgroundColor: '#EEE',
     }
    });
  }

  render() {

    return (
      <View style = {{ flex: 1 }}>
        <ImageBackground source={ require('../assets/Background-Image.png')} style = { styles.image }>
          <Text style = {styles.title}>ChatApp</Text>

          <View style = {styles.inputbox}>

            <TextInput 
              style={styles.textinput}
              placeholder = 'Your Name'
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
              accessibilityLabel="Type Name">
            </TextInput>

            <View style = {{height: '40%', marginVertical: '8%'}}>
              <Text style = {styles.text}>Choose Background Color:</Text>
               <View style = {{ flexDirection: 'row', justifyContent: 'space-around', height: 40, marginVertical: '5%' }}>
                <TouchableOpacity 
                    onPress={() => this.setState({ color: '#090C08' })} 
                    style={{minWidth: 40, backgroundColor: '#090C08', borderRadius: 20}}
                    accessible={true}
                    accessibilityLabel="Black"
                    accessibilityHint="Set background-color to Black."
                    accessibilityRole="button"/> 
                <TouchableOpacity onPress={() => this.setState({ color: '#474056' })} 
                    style={{minWidth: 40, backgroundColor: '#474056', borderRadius: 20}}
                    accessible={true}
                    accessibilityLabel="Twilight Levnedar"
                    accessibilityHint="Set background-color to Twilight Levendar."
                    accessibilityRole="button"/> 
                <TouchableOpacity onPress={() => this.setState({ color: '#8A95A5' })} 
                    style={{minWidth: 40, backgroundColor: '#8A95A5', borderRadius: 20}}
                    accessible={true}
                    accessibilityLabel="Blue Yender"
                    accessibilityHint="Set background-color to Blue Yender."
                    accessibilityRole="button"/>   
                <TouchableOpacity onPress={() => this.setState({ color: '#B9C6AE' })} 
                    style={{minWidth: 40, backgroundColor: '#B9C6AE', borderRadius: 20}}
                    accessible={true}
                    accessibilityLabel="Amazon"
                    accessibilityHint="Set background-color to Amazon."
                    accessibilityRole="button"/>
              </View>
            </View>  

            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
              style = {styles.startchatting}
              accessible={true}
              accessibilityLabel="Start Chatting"
              accessibilityRole="button">
              <Text style = {[styles.text, styles.colorWhite]} >Start Chatting</Text>
            </TouchableOpacity>  
    
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: { 
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 45, 
    color: '#DEE', 
    alignSelf: 'center',
    marginTop: '25%'
  },
  inputbox: { 
    backgroundColor: '#FFF',
    padding: '6%', 
    margin: '6%',
    borderRadius: 4, 
    height: '44%',
    justifyContent: 'space-around',
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
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    width: '100%'
  },
  text: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: '#777',
  },
  colorWhite: {
    color: '#FFF',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  startchatting: {
    backgroundColor: '#757083', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 50,
    borderRadius: 4
  }
});