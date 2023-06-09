import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.26.131:8000';

export default function SignInPage({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onLoginPressed = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        name,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem('employee_token', token);
        const storedToken = await AsyncStorage.getItem('employee_token');
        console.log('Stored Token:', storedToken);
        setMessage('Login Successful!');
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
      } else {
        setErrorMessage('An error occurred');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found');
        Alert.alert('Wrong username');
      } else if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect password');
        Alert.alert('Wrong password');
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Header
          style={{
            fontSize: 29,
            fontWeight: 'bold',
            position: 'relative',
            bottom: 20,
            textAlign: 'center',
            color: '#7149C6',
          }}
        >
          Login
        </Header>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('RegisterScreen')}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    top: '35%',
    width: '90%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
  },
  label: {
    color: theme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: '#7149C6',
  },
  error: {
    color: theme.colors.error,
    paddingTop: 8,
    fontSize: 16,
  },
  message: {
    color: theme.colors.success,
    paddingTop: 8,
    fontSize: 16,
  },
});
