import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
// import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { phoneNumberValidator} from '../helpers/phoneNumberValidator'
import { addressValidator } from '../helpers/addressValidator'


export default function RegisterScreen({ navigation }) {
  const API_URL = "http://localhost:8800";
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(" ");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState(" ");
  const [DOJ, setDOJ] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [wallet, setWallet] = useState("");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleRegister = async (event) => {
    event.preventDefault();

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
      console.log("hiighji");
      console.log(response.data);
      history.push("/login");
    } catch (error) {
      console.log("wrongyyyy");
      console.error(error);
    }
  };
  // const [name, setName] = useState({ value: '', error: '' })
  // const [email, setEmail] = useState({ value: '', error: '' })
  // const [password, setPassword] = useState({ value: '', error: '' })
  // const [phonenumber, setPhonenumber] = useState({ value: '', error: '' })
  // const [address, setAddress] = useState({ value: '', error: '' })
  
  // const onSignUpPressed = () => {
  //   const nameError = nameValidator(name.value)
  //   const emailError = emailValidator(email.value)
  //   const passwordError = passwordValidator(password.value)
  //   const phonenumberError = phoneNumberValidator(phonenumber.value)
  //   const addressError = addressValidator(address.value)
    

  //   if (emailError || passwordError || nameError || phonenumberError) {
  //     setName({ ...name, error: nameError })
  //     setEmail({ ...email, error: emailError })
  //     setPassword({ ...password, error: passwordError })
  //     setPhonenumber({...phonenumber, error: phonenumberError })
  //     setAddress({...address, error: addressError})
  //     return
  //   }
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Dashboard' }],
  //   })
  // }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header style={{fontSize:25,fontWeight:"bold",position:"relative",bottom:13,textAlign:'center',color:"#7149C6"}}>CREATE ACCOUNT
        </Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Mobile"
        returnKeyType="next"
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phonenumber.value}
        onChangeText={(numericValue)=> setPhonenumber({ value: numericValue, error: ''}) }
        error={!!phonenumber.error}
        errorText={phonenumber.error}
      />
      <TextInput
        label="Address"
        returnKeyType="next"
        placeholder="Enter address"
        multiline={true}
        numberOfLines={4}
        value={address.value}
        onChangeText={(value)=> setAddress({ value: value, error: '' })}
        error={!!address.error}
        errorText={address.error}

      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
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
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
       
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
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
