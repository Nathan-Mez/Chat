import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import firebase from 'firebase';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';



export default class customActions extends React.Component {

    state = {
        image: null,
        location: null,
      }

    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
     
        if(status === 'granted') {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
          }).catch(error => console.log(error));
     
          if (!result.cancelled) {
            this.setState({
              image: result
            });  
          }
     
        }
    }  

    takePhoto = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.CAMERA);

        if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images',
            }).catch(error => console.log(error));

            if (!result.cancelled) {
                this.setState({
                  image: result
                });  
              }
        }
    }

    getLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if(status === 'granted') {
        let result = await Location.getCurrentPositionAsync({});
   
        if (result) {
          this.setState({
            location: result
          });
        }
      }
    }


    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Button  title="Pick an image from the library"  onPress={this.pickImage} />
              <Button  title="Take a photo"  onPress={this.takePhoto}/>
              <Button  title="Get my Location"  onPress={this.getLocation}/>
              {this.state.image &&
                <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} />}
           </View>
        )
    }
}
