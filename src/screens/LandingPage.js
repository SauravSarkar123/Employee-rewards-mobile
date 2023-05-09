import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as Font from 'expo-font';
import s from '../assets/rrr.png'


export default function LandingPage({ navigation }) {
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
  },
  title: {
    fontFamily: fontLoaded ? 'SecularOnnne' : null,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign:"center",
    position:'relative',
    bottom:170,
    marginTop:300,   

  },
  subtitle: {
    fontSize: 15,
    color: '#000',
    marginBottom: 32,
    position:'relative',
    bottom:70,
    textAlign:"center",
  },
  button: {
    width: '40%',
    height: 48,
    borderRadius:10,
    justifyContent: 'center',
    marginTop: -126,
    backgroundColor:"blue"
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

  return (
    <View style={styles.container}>
      <ImageBackground source={s} style={styles.image} >
        <View style={styles} />
        <View style={styles.content}>
          <Text style={styles.title}>EMPLOYEE REWARDS SYSTEM</Text>
          {/* <Text style={styles.subtitle}> Recognizing and Rewarding Employees
with Excellence</Text> */}
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('StartScreen')}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

