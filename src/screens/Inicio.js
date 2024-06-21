import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Inicio({ navigation }) {
  // Título del encabezado de navegación
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Inicio</Text>
        </View>
      ),
      headerTitleAlign: 'center',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../img/llanta.png')} style={styles.image} />
      <Text style={styles.welcomeText}>Bienvenid@</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 100, 
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});