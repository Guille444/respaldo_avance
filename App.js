import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus componentes de pantalla aquí
import Sesion from './src/screens/Sesion.js';
import Registro from './src/screens/Registro.js';
import TabNavigator from './src/tabNavigator/TabNavigator.js';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Sesion'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}