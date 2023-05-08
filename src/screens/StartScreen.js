import React from 'react'
import { StyleSheet } from 'react-native'
import Background from '../components/Background'
// import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

// import {Montserrat_400Regular} from "@expo-google-fonts/montserrat"

export default function StartScreen({ navigation }) {
  // let [fontsLoaded] = useFonts({
  //   Montserrat_400Regular,
  // });
  return (
    <Background style={styles.background}>
      {/* <Logo /> */}
      <Header style={styles.header}>EMPLOYEE REWARD SYSTEM</Header>
      <Paragraph style={styles.paragraph}>
      "Our system is to recognize, acknowledge the efforts and contributions of employees."
      </Paragraph>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 29,
    color: 'black',
    marginBottom: 20,
    fontWeight:'bolder',
    position:'relative',
    bottom:140,
    fontWeight:"bold",
    textAlign:'center',
    color:'#7149C6'
    

  },
  paragraph: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    position:"relative",
    bottom:100,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 4,
    position:'relative',
    bottom:30,
    
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  },
});