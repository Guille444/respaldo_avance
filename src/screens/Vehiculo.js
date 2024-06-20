import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegistroVehiculo({ navigation }) {

  useEffect(() => {
    // Título del encabezado de navegación
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Vehículo</Text>
        </View>
      ),
      headerTitleAlign: 'center',
    });
  }, []);

  // Renderización del componente
  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Registrar vehículo</Text>

      {/* Selector de modelo de vehículo */}
      <Picker
        selectedValue={modelo}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setModelo(itemValue)}
      >
        <Picker.Item label="Seleccione un modelo" value="" />
        <Picker.Item label="Toyota Corolla" value="Toyota Corolla" />
        <Picker.Item label="Honda Civic" value="Honda Civic" />
        <Picker.Item label="Ford Focus" value="Ford Focus" />
        <Picker.Item label="Chevrolet Cruze" value="Chevrolet Cruze" />
        <Picker.Item label="BMW Serie 3" value="BMW Serie 3" />
        <Picker.Item label="Audi A4" value="Audi A4" />
      </Picker>

      {/* Campos de entrada para otros datos del vehículo */}
      <TextInput
        style={styles.input}
        placeholder="Año"
        value={año}
        onChangeText={setAño}
      />
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        style={styles.input}
        placeholder="VIN del motor"
        value={vin}
        onChangeText={setVin}
      />

      {/* Botón para registrar el vehículo */}
      <TouchableOpacity onPress={registrarVehiculo} style={styles.button}>
        <Text style={styles.buttonText}>REGISTRAR VEHÍCULO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#000',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
