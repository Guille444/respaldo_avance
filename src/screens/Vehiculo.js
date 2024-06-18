import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function RegistroVehiculo() {
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [matricula, setMatricula] = useState('');
  const [color, setColor] = useState('');
  const [vin, setVin] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Vehículo</Text>
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput style={styles.input} placeholder="Año" value={año} onChangeText={setAño} />
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />
      <TextInput style={styles.input} placeholder="Color" value={color} onChangeText={setColor} />
      <TextInput style={styles.input} placeholder="VIN del motor" value={vin} onChangeText={setVin} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>REGISTRAR VEHÍCULO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 32,
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#000',
      paddingVertical: 12,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    headerTitleContainer: {
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });