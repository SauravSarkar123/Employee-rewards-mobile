import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import g from "../assets/log3.gif"

const LogoScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Landing');
    }, 3200); // 3 seconds
  }, []);
  return (
    <View style={styles.container}>
<Image source={g} />    
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    color : 'white',
    fontSize : 20
  }
});

export default LogoScreen;
