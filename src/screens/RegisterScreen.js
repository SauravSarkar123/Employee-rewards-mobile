import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
const API_URL = 'http://192.168.26.107:8000';
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [DOJ, setDOJ] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [wallet, setWallet] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleNameChange = (text) => {
    setUsername(text)
    if (text.length === 0) {
      setUsername({ error: 'Name is required' })
    } else if (!/^[a-zA-Z ]+$/.test(text)) {
      setUsername({ error: 'Name must contain only alphabets and spaces' })
    } else {
      setUsername({ value: text, error: '' })
    }
  }

  const handleMobileChange = (text) => {
    setMobile(text)
    if (text.length === 0) {
      setMobile({ error: 'Mobile number is required' })
    } else if (!/^\d{10}$/.test(text)) {
      setMobile({ error: 'Mobile number must contain exactly 10 digits' })
    } else {
      setMobile({ value: text, error: '' })
    }
  }

  const handleDOJChange = (text) => {
    setDOJ(text)
    if (text.length === 0) {
      setDOJ({ error: 'Date of Joining is required' })
    } else {
      setDOJ({ value: text, error: '' })
    }
  }
  const validateWallet = (walletId) => {
    setWallet(walletId)
    if (!walletId) {
      setWallet ({ error: 'Wallet ID is required' });
    } else if (walletId.length < 8 || walletId.length > 20) {
      setWallet ({ error: 'Wallet ID must be between 8 and 20 characters' });
    } else {
      setWallet( { value: walletId, error: '' });
    }
  };
  const validateEmail = (email) => {
    setEmail(email)
    if (!email) {
      setEmail( { error: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmail( { error: 'Email is invalid' });
    } else {
      setEmail ({ value: email, error: '' });
    }
  };
  const validateAddress = (address) => {
    setAddress(address)
    if (!address) {
      setAddress( { error: 'Address is required' });
    } else if (address.length < 10 || address.length > 100) {
      setAddress( { error: 'Address must be between 10 and 100 characters' });
    } else {
      setAddress( { value: address, error: '' });
    }
  };
      
  const handlePasswordChange = (password) => {
    setPassword(password)
    if (password.length === 0) {
      setPassword({ error: 'Password is required' })
    } else if (password.length < 6) {
      setPassword({ error: 'Password must be at least 6 characters long' })
    } else {
      setPassword({ value: password, error: '' })
    }
  }
  const onSignUpPressed = () => {
   
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

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
      navigation.navigate("LoginScreen");    } 
      catch (error) {
      console.log(error);
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
    <Background>
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
        onChangeText={handleMobileChange }
        error={!!mobile.error}
        errorText={mobile.error}
      />
     
      <TextInput
        label="Address"
        returnKeyType="next"
        multiline={true}
        numberOfLines={4}
        value={name.value}
        onChangeText={validateAddress}
        error={!!address.error}
        errorText={address.error}

      />

      <TextInput
        label="walletId"
        returnKeyType="next"
        keyboardType="default"
        value={wallet.value}
        onChangeText={validateWallet}
        error={!!wallet.error}
        errorText={wallet.error}
      />

      <TextInput
        label="DOJ"
        returnKeyType="next"
        value={DOJ.value}
        onFocus={openDatePicker}
        onChangeText={handleDOJChange}
        error={!!DOJ.error}
        errorText={DOJ.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={validateEmail}
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


// import React, { useState } from 'react'
// import { View, StyleSheet, TouchableOpacity } from 'react-native'
// import { DatePickerAndroid } from 'react-native-datepicker'
// import { Text } from 'react-native-paper'
// import Background from '../components/Background'
// import Header from '../components/Header'
// import Button from '../components/Button'
// import TextInput from '../components/TextInput'
// import BackButton from '../components/BackButton'
// import { theme } from '../core/theme'
// import axios from 'axios'

// export default function RegisterScreen({ navigation }) {
//   const API_URL = 'http://192.168.26.107:8000'
//   const [name, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [email, setEmail] = useState('')
//   const [mobile, setMobile] = useState('')
//   const [address, setAddress] = useState('')
//   const [DOJ, setDOJ] = useState('')
//   const [checkbox, setCheckbox] = useState(false)
//   const [wallet, setWallet] = useState('')
//   const [showPassword, setShowPassword] = useState(false)

 

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, {
//         name: name.value,
//         mobile: mobile.value,
//         address,
//         DOJ: DOJ.value,
//         password: password.value,
//         email,
//         wallet,
//       })

//       console.log(response.data)
//       navigation.navigate('LoginScreen')
//     } catch (error) {
//       console.log(error)
//       console.error(error)
//     }
//   }

//   const openDatePicker = async () => {
//     try {
//       const { action, year, month, day } = await DatePickerAndroid.open({
//         date: DOJ.value ? new Date(DOJ.value) : new Date(),
//       })
//       if (action !== DatePickerAndroid.dismissedAction) {
//         const selectedDate = new Date(year, month, day)
//         setDOJ({ value: selectedDate.toDateString(), error: '' })
     
//       }
//     } catch ({ code, message }) {
//       console.warn('Cannot open date picker', message)
//     }
//     }
    
//     return (
//     <Background>
//     <BackButton goBack={navigation.goBack} />
//     <Header>Create Account</Header>
//     <TextInput
//          label="Name"
//          returnKeyType="next"
//          value={name.value}
//          onChangeText={handleNameChange}
//          error={!!name.error}
//          errorText={name.error}
//        />
//     <TextInput
//          label="Mobile Number"
//          returnKeyType="next"
//          value={mobile.value}
//          onChangeText={handleMobileChange}
//          error={!!mobile.error}
//          errorText={mobile.error}
//          keyboardType="numeric"
//        />
//     <TouchableOpacity onPress={openDatePicker}>
//     <TextInput
//            label="Date of Joining"
//            editable={false}
//            value={DOJ.value}
//            error={!!DOJ.error}
//            errorText={DOJ.error}
//          />
//     </TouchableOpacity>
//     <TextInput
//     label="Password"
//     returnKeyType="done"
//     value={password.value}
//     onChangeText={handlePasswordChange}
//     error={!!password.error}
//     errorText={password.error}
//     secureTextEntry={!showPassword}
//     right={
//     <TextInput.Icon
//     name={showPassword ? 'eye-off' : 'eye'}
//     onPress={() => setShowPassword(!showPassword)}
//     />
//     }
//     />
//     <Button mode="contained" onPress={handleRegister} style={styles.button}>
//     Sign Up
//     </Button>
//     <View style={styles.row}>
//     <Text style={styles.label}>Already have an account? </Text>
//     <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
//     <Text style={styles.link}>Login</Text>
//     </TouchableOpacity>
//     </View>
//     </Background>
//     )
//     }
    
//     const styles = StyleSheet.create({
//     row: {
//     flexDirection: 'row',
//     marginTop: 4,
//     },
//     label: {
//     color: theme.colors.secondary,
//     fontSize: 14,
//     },
//     link: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: theme.colors.primary,
//     },
//     button: {
//     marginTop: 24,
//     },
//     })
