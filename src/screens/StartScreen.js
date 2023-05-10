import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native'
import * as Font from 'expo-font';

import Background from '../components/Background'
// import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

// import {Montserrat_400Regular} from "@expo-google-fonts/montserrat"

export default function StartScreen({ navigation }) {
  const [isLoginPressed, setIsLoginPressed] = useState(false);
const [isSignupPressed, setIsSignupPressed] = useState(false);

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SecularOnne': require('../Fonts/SecularOne-Regular.ttf'),
        'SecularOnnne': require('../Fonts/DarumadropOne-Regular.ttf'),
  
        
        // add more font styles if needed
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontFamily: fontLoaded ? 'SecularOnne' : null,
      fontSize: 29,
      color: 'black',
      marginTop: 100,
      fontWeight:'bolder',
      position:'relative',
      bottom:140,
      fontWeight:"bold",
      textAlign:'center',
      color:'#000'
  },
    paragraph: {
      fontSize: 20,
      color: 'black',
      marginBottom: 20,
      position:"relative",
      bottom:100,
    },
    btn: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: -200
    },
    button1: {
      
      backgroundColor: '#0000FF',
      borderRadius: 10,
      paddingVertical: 12,
      width: 100,
      marginVertical: 10,
      borderColor: '#fff',
    },
    button2: {
      
      backgroundColor: '#0000FF',
      borderRadius: 10,
      paddingVertical: 12,
      width: 100,
      marginVertical: 10,
      borderColor: '#fff',
      marginTop: -52,
      marginLeft: 150
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    
  });
  // let [fontsLoaded] = useFonts({
  //   Montserrat_400Regular,
  // });
  return (
    <Background style={styles.background}>
      {/* <Logo /> */}
      <Header style={styles.header}>EMPLOYEE REWARD SYSTEM</Header>
      <Paragraph style={styles.paragraph}>
      "Unlock your rewards with just a click - Sign up or log in now!"
      </Paragraph>
      <View style={styles.btn}>
      <TouchableHighlight
  style={[
    styles.button1,
    isLoginPressed // change the background color if the button is pressed
  ]}
  onPress={() => {
    setIsLoginPressed(true);
    navigation.navigate('LoginScreen');
  }}
  onHideUnderlay={() => setIsLoginPressed(false)} // reset the button state when the user removes their touch
  onShowUnderlay={() => setIsLoginPressed(true)} // update the button state when the user touches the button
>
  <Text style={styles.buttonText}>Login</Text>
</TouchableHighlight>

<TouchableHighlight
  style={[
    styles.button2,
    isSignupPressed  // change the background color if the button is pressed
  ]}
  onPress={() => {
    setIsSignupPressed(true);
    navigation.navigate('RegisterScreen');
  }}
  onHideUnderlay={() => setIsSignupPressed(false)} // reset the button state when the user removes their touch
  onShowUnderlay={() => setIsSignupPressed(true)} // update the button state when the user touches the button
>
  <Text style={styles.buttonText}>Signup</Text>
</TouchableHighlight>
</View>

    </Background>
  )
}

