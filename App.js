import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import { View, Text, StyleSheet } from 'react-native';
import { LoginScreen, RegisterScreen, ResetPasswordScreen, Dashboard, LandingPage, Award } from './src/screens';
import LogoScreen from './src/screens/LogoScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmployeeProfile from './src/screens/EmployeeProfile';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Landing" component={LandingPage} />
      <Drawer.Screen name="Awards" component={Award}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(false);
    }, 1000); // 3 seconds
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={showLogo ? 'LogoScreen' : 'LoginScreen'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DrawerRoutes} />
          <Stack.Screen name="Landing" component={LandingPage} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="LogoScreen" component={LogoScreen} />
          <Stack.Screen name="Award" component={Award} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
