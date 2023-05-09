import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export default function SignInPage({ navigation }) {
  // const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setname] = useState("");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onLoginPressed = async () => {
    // const emailError = emailValidator(email.value);
    // const passwordError = passwordValidator(password.value);

    // if (passwordError) {
    //   // setEmail({ ...email, error: emailError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }

    try {
      const response = await axios.post(`${API_URL}/login`, { name,password}, { withCredentials: true });
      if (response.status === 200) {
        setMessage('Login Successful!');
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
      } else {
        setErrorMessage('An error occurred');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found');
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('Incorrect password');
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
          EMPLOYEE LOGIN
        </Header>
        <TextInput
  label="name"
  returnKeyType="next"
  value={name.value}
  onChangeText={(text) => setname(text)}
/>

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(password) => setPassword(password)}
          error={!!password.error}
          errorText={password.error}
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
<Text style={styles.label}>Don’t have an account? </Text>
<TouchableOpacity onPress={() => navigation.replace('SignUpPage')}>
<Text style={styles.link}>Sign up</Text>
</TouchableOpacity>
</View>
{errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
{message ? <Text style={styles.message}>{message}</Text> : null}
</KeyboardAvoidingView>
</Background>
);
}

const styles = StyleSheet.create({
container: {
width: '90%',
maxWidth: 340,
alignSelf: 'center',
alignItems: 'center',
justifyContent: 'center',
flex: 1,
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
