import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import { View, Text, StyleSheet } from 'react-native';
import { LoginScreen, RegisterScreen, ResetPasswordScreen, Dashboard, LandingPage } from './src/screens';
import LogoScreen from './src/screens/LogoScreen';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: { backgroundColor: 'white' },
        contentContainerStyle: { flex: 1 },
        headerStyle: { backgroundColor: '#E6FFFD' },
        drawerContentOptions: {
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
        },
      }}
      drawerContent={drawerProps => (
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>My App</Text>
          <DrawerItemList {...drawerProps} />
        </View>
      )}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Landing" component={LandingPage} />
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
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="LogoScreen" component={LogoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
