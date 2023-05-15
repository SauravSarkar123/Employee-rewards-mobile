import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {DatePickerAndroid} from "react-native-datepicker";
import { Text } from 'react-native-paper'
import Background from '../components/Background'
// import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import axios from 'axios'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { phoneNumberValidator} from '../helpers/phoneNumberValidator'
import { addressValidator } from '../helpers/addressValidator'
import {walletIdValidator} from '../helpers/walletIdValidator'
import {DOJValidator} from'../helpers/dateofJoining'

export default function RegisterScreen({ navigation }) {
const API_URL = 'http://192.168.26.107:8000';
const [name, setUsername] = useState({ value: "", error: "" });
const [password, setPassword] = useState({ value: "", error: "" });
const [email, setEmail] = useState({ value: "", error: "" });
const [mobile, setMobile] = useState({ value: "", error: "" });
const [address, setAddress] = useState({ value: "", error: "" });
const [DOJ, setDOJ] = useState({ value: "", error: "" });
const [checkbox, setCheckbox] = useState(false);
const [wallet, setWallet] = useState({ value: "", error: "" });

const onSignUpPressed = () => {
  const nameError = nameValidator(name.value)
  const emailError = emailValidator(email.value)
  const passwordError = passwordValidator(password.value)
  const phonenumberError = phoneNumberValidator(mobile.value)
  const addressError = addressValidator(address.value)
  const walletIdError = walletIdValidator(wallet.value)
  const dateOfJoiningError = DOJValidator(DOJ.value)

  if (emailError || passwordError || nameError || phonenumberError || addressError || walletIdError || dateOfJoiningError) {
    setUsername({ ...name, error: nameError })
    setEmail({ ...email, error: emailError })
    setPassword({ ...password, error: passwordError })
    setMobile({ ...mobile, error: phonenumberError })
    setAddress({ ...address, error: addressError })
    setWallet({ ...wallet, error: walletIdError })
    setDOJ({ ...DOJ, error: dateOfJoiningError })
    return
  } 
  navigation.reset({
    index: 0,
    routes: [{ name: 'Dashboard' }],
  })
}
const handleNameChange = (text) => {
  const error = nameValidator(text);
  setUsername({ value: text, error });
};
const handleMobileChange = (number) => {
  const error = phoneNumberValidator(number);
  setMobile({ value: number, error });
};
const handleEmailChange = (text) => {
  const error = emailValidator(text);
  setEmail({ value: text, error });
};
const handlePasswordChange = (text) => {
  const error = passwordValidator(text);
  setPassword({ value: text, error });
};
const handleWalletChange = (text) => {
  const error = walletIdValidator(text);
  setWallet({ value: text, error });
};
const handleAddressChange = (text) => {
  const error = addressValidator(text);
  setAddress({ value: text, error });
};
  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        mobile,
        address,
        DOJ,
        password,
        email,
        wallet,
      });

      console.log(response.data);
      navigation.navigate("LoginScreen");    } catch (error) {
      console.log("wrongyyyy");
      console.error(error);
    }
  };
  const openDatePicker = async () => {
  try {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: DOJ ? new Date(DOJ) : new Date(),
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      const selectedDate = new Date(year, month, day);
      setDOJ(selectedDate.toDateString());
    }
  } catch ({ code, message }) {
    console.warn('Cannot open date picker', message);
  }
};
  

  return (
    <ScrollView >
    <Background style={{height : 10}}>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Create New Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={handleNameChange}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Mobile"
        returnKeyType="next"
        keyboardType="phone-pad"
        value={mobile.value}
        onChangeText={handleMobileChange}
        error={!!mobile.error}
        errorText={mobile.error}
      />
      <TextInput
        label="Address"
        returnKeyType="next"
        
        multiline={true}
        numberOfLines={4}
        value={address.value}
        onChangeText={handleAddressChange}
        error={!!address.error}
        errorText={address.error}

      />

      <TextInput
        label="walletId"
        returnKeyType="next"
        keyboardType="default"
        value={wallet.value}
        onChangeText={handleWalletChange}
        error={!!wallet.error}
        errorText={wallet.error}
      />

      <TextInput
        label="DOJ"
        returnKeyType="next"
        value={DOJ}
        onFocus={openDatePicker}
        onChangeText={(numericValue)=> setDOJ(numericValue)}
        error={!!DOJ.error}
        errorText={DOJ.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={handleEmailChange}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={handlePasswordChange}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
       
      <Button
        mode="contained"
        onPress={() => {
          handleRegister();
          onSignUpPressed();
        }}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
