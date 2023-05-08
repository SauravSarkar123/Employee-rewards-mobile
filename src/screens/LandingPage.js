import React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'https://media.istockphoto.com/id/968383644/vector/talent-award-employee-of-the-month-outstanding-achievement-first-place-winner-reward-for-good.jpg?s=612x612&w=0&k=20&c=OlXhoqYZNp4oCasUhwYYVpcxOG_4pypJhhrp5kiwcms=' }} style={styles.image} >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>EMPLOYEE REWARDS SYSTEM</Text>
          <Text style={styles.subtitle}> Recognizing and Rewarding Employees
with Excellence</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign:"center",
    position:'relative',
    bottom:170
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 32,
    position:'relative',
    bottom:70,
    textAlign:"center",
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});