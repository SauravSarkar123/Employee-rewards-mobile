import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Text , TouchableHighlight} from 'react-native';
import { Button } from 'react-native-paper';
import * as Font from 'expo-font';
import s from '../assets/neo.png'


export default function LandingPage({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [isSignupPressed, setIsSignupPressed] = useState(false);

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
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -400
  },
  titlee: {
    fontSize: 25,
    marginTop:200,
    color:"white",
    marginLeft:-180   


  },
  title: {
    fontFamily: fontLoaded ? 'SecularOnne' : null,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign:"center",
    position:'relative',
    bottom:170,
    marginTop:180,  
    marginLeft:0 

  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 32,
    position:'relative',
    bottom:70,
    textAlign:"center",
  },
  btn: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: -200,
    marginLeft:40
  },

  button1: {
    
    backgroundColor: '#0000FF',
    borderRadius: 10,
    paddingVertical: 12,
    width: 100,
    marginVertical: 10,
    borderColor: '#fff',
    marginLeft:5
  },
  button2: {
    
    backgroundColor: '#0000FF',
    borderRadius: 10,
    paddingVertical: 12,
    width: 200,
    marginVertical: 10,
    borderColor: '#fff',
    marginTop: -52,
    marginLeft:-40

  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  paragraph: {
    fontSize: 20,
    color: 'white',
    marginBottom: 0,
    position:"relative",
    bottom:100,
    fontWeight: 'bold'
  },
});

  return (
    <View style={styles.container}>
      <ImageBackground source={s} style={styles.image} >
        <View style={styles} />
        <View style={styles.content}>
          <Text style={styles.titlee}>Welcome to </Text>
          <Text style={styles.title}>EMPLOYEE REWARD SYSTEM</Text>
<Text style={styles.paragraph}>  "Unlock your rewards with just a click"</Text>  

          {/* <Text style={styles.subtitle}> Recognizing and Rewarding Employees
with Excellence</Text> */}
          <View style={styles.btn}>
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
  <Text style={styles.buttonText}>Get Started</Text>
</TouchableHighlight>
<Text style={{color:"white", marginLeft:50, marginTop:20}}>or</Text>
<Text style={{color:"white", marginLeft:-20, marginTop:10}}>Already have an account?</Text>
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

</View>
        </View>
      </ImageBackground>
    </View>
  );
}

