import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import g from "../assets/log4.mp4"

const LogoScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Landing');
    }, 3100); // 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/log4.mp4')}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
      />
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
  video: {
    width: 300,
    height: 200,
  },
  title: {
    color : 'white',
    fontSize : 20
  }
});

export default LogoScreen;
