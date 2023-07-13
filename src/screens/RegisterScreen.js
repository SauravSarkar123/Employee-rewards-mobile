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


export default function RegisterScreen({ navigation }) {
  const API_URL = 'http://192.168.26.131:19000';
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [mobile, setMobile] = useState('')
  const [mobileError, setMobileError] = useState('')

  const [address, setAddress] = useState('')
  const [addressError, setAddressError] = useState('')

  const [DOJ, setDOJ] = useState('')
  const [DOJError, setDOJError] = useState('')

  const [checkbox, setCheckbox] = useState(false)

  const [wallet, setWallet] = useState('')
  const [walletError, setWalletError] = useState('')

  const nameValidator = (text) => {
    if (!text) {
      return 'Name field is required.'
    }
    return ''
  }


  const passwordValidator = (password) => {
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters long.'
    }
    return ''
  }

  const emailValidator = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!email) {
      return 'Email field is required.'
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.'
    }
    return ''
  }

  const phoneNumberValidator = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneNumber) {
      return 'Mobile field is required.'
    }
    if (!phoneRegex.test(phoneNumber)) {
      return 'Please enter a valid 10-digit mobile number.'
    }
    return ''
  }

  const addressValidator = (text) => {
    if (!text) {
      return 'Address field is required.'
    }
    return ''
  }

  const walletIdValidator = (walletId) => {
    if (!walletId) {
      return `Wallet Address can't be empty`;
    } else if (walletId.length !== 42) {
      return `This is not a valid wallet address`;
    }
  }
 

const handleNameChange = (text) => {
  setName(text);
  setNameError(nameValidator(text))
};
const handleMobileChange = (number) => {
  setMobile(number);
  setMobileError(phoneNumberValidator(number))

};
const handleEmailChange = (text) => {
  setEmail(text);
  setEmailError(emailValidator(text))


};
const handlePasswordChange = (text) => {
  setPassword(text);
  setPasswordError(passwordValidator(text))

};
const handleWalletChange = (text) => {
  setWallet(text);
  setWalletError(walletIdValidator(text))

};
const handleAddressChange = (text) => {
  setAddress(text);
  setAddressError(addressValidator(text))

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
      setDOJError('')

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
        value={name}
        onChangeText={handleNameChange}
        error={!!nameError}
        errorText={nameError}
      />
      <TextInput
        label="Mobile"
        returnKeyType="next"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={handleMobileChange}
        error={!!mobileError}
        errorText={mobileError}
      />
      <TextInput
        label="Address"
        returnKeyType="next"
        
        multiline={true}
        numberOfLines={4}
        value={address}
        onChangeText={handleAddressChange}
        error={!!addressError}
        errorText={addressError}

      />

      <TextInput
        label="walletId"
        returnKeyType="next"
        keyboardType="default"
        value={wallet}
        onChangeText={handleWalletChange}
        error={!!walletError}
        errorText={walletError}
      />

      <TextInput
        label="DOJ"
        returnKeyType="next"
        value={DOJ}
        onFocus={openDatePicker}
        onChangeText={(numericValue)=> setDOJ(numericValue)}
        error={!!DOJError}
        errorText={DOJError}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={handleEmailChange}
        error={!!emailError}
        errorText={emailError}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={handlePasswordChange}
        error={!!passwordError}
        errorText={passwordError}
        secureTextEntry
      />
       
      <Button
        mode="contained"
        onPress={() => {
          handleRegister();
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
