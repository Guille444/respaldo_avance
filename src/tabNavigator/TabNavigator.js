import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importa tus componentes de pantalla aquí
import Inicio from '../screens/Inicio';
import Citas from '../screens/Citas';
import Vehiculo from '../screens/Vehiculo';
import Perfil from '../screens/Perfil';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (

    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#000', // Color de los íconos activos
      tabBarInactiveTintColor: '#000', // Color de los íconos inactivos
      tabBarStyle: { backgroundColor: '#fff', height: 60, borderTopWidth: 0 }, // Estilo de la barra de pestañas
      tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
        let iconName;
        if (route.name === 'Inicio') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Citas') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Vehículo') {
          iconName = focused ? 'car' : 'car-outline';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} color={color} size={size} />;
      },
    })}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Citas"
        component={Citas}
        options={{ title: 'Citas' }}
      />
      <Tab.Screen
        name="Vehículo"
        component={Vehiculo}
        options={{ title: 'Vehículo' }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;