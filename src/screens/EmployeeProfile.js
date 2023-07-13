import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [doke, setDoke] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = 'http://192.168.26.7:8000';

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the media library is required!');
    }
  };

  const Updateprofile = (doke) => {
    axios
      .put(
        `${API_URL}/updateuserprofile/${doke.name}`,
        { mobile: doke.mobile, password: doke.password, address: doke.address },
        { withCredentials: true }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (text) => {
    setName(text);
    setNameError('');
    updateDoke({ password: text });
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError('');
    updateDoke({ address: text });
  };

  const handleContactNumberChange = (text) => {
    setContactNumber(text);
    setContactNumberError('');
    updateDoke({ mobile: text });
  };

  const updateDoke = (updatedFields) => {
    setDoke((prevDoke) => ({
      ...prevDoke,
      ...updatedFields,
    }));
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveProfile = () => {
    let isValid = true;
    setIsEditMode(false);

    if (name.trim() === '') {
      setNameError('Name must be filled');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email must be filled');
      isValid = false;
    }

    if (contactNumber.trim() === '') {
      setContactNumberError('Contact number must be filled');
      isValid = false;
    }

    if (isValid) {
      // Save data to the database here
      Updateprofile(doke);

      // Update the button text
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('employee_token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setDoke(decodedToken);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  console.log('token data', doke);

  const handleProfileImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleProfileImagePicker}
          style={styles.profileImageContainer}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <MaterialIcons name="add-a-photo" size={50} color="#FFFFFF" />
          )}
        </TouchableOpacity>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.text}>{doke.name}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          
          {isEditMode ? (
            <>
            
              <TextInput style={styles.input}secureTextEntry={!showPassword} value={doke.password} onChangeText={handleNameChange} />
              {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
              
            </>
          ) : (
            <Text style={styles.text} > {showPassword ? doke.password : '********'}</Text>
          )}
         <TouchableOpacity onPress={handleTogglePassword} style={styles.toggleButton}>
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="#666666"
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email ID</Text>
          <Text style={styles.text}>{doke.email}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address</Text>
          {isEditMode ? (
            <>
              <TextInput style={styles.input} value={doke.address} onChangeText={handleEmailChange} />
              {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            </>
          ) : (
            <Text style={styles.text}>{doke.address}</Text>
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Contact Number</Text>
          {isEditMode ? (
            <>
              <TextInput
                style={styles.input}
                value={doke.mobile}
                onChangeText={handleContactNumberChange}
              />
              {contactNumberError ? (
                <Text style={styles.error}>{contactNumberError}</Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.text}>{doke.mobile}</Text>
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Wallet</Text>
          <Text style={styles.text}>{doke.wallet}</Text>
        </View>
        {isEditMode ? (
          <TouchableOpacity onPress={handleSaveProfile} style={styles.button}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444444',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
  error: {
    fontSize: 12,
    paddingHorizontal: 10,
    marginTop: 5,
    color: 'red',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleButton:{
    position:"relative",
    left:280,
    bottom:29
  }
});

export default ProfilePage;
