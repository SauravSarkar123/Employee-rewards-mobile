import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import * as eva from '@eva-design/eva';
import Button from '../components/Button'
import { ApplicationProvider, Layout } from '@ui-kitten/components';

export default function LandingPage ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EMPLOYEE REWARDS SYSTEM</Text>
      <Text style={styles.subtitle}>LANDING PAGE.</Text>
      <Button
      mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('StartScreen')}
      >
        <Text style={styles.buttonText}>Get started</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position:'relative',
    top:30
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});

