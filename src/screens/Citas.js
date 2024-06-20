import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Citas({ navigation }) {
  // Estados para manejar los datos del formulario
  const [service, setService] = useState(''); // Estado para el servicio seleccionado
  const [date, setDate] = useState(''); // Estado para la fecha de la cita
  const [time, setTime] = useState(''); // Estado para la hora de la cita

  useEffect(() => {
    // Configura el título del encabezado de navegación
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Citas</Text>
        </View>
      ),
      headerTitleAlign: 'center',
    });
  }, []);

  // Función para manejar la acción de agendar cita
  const handleSchedule = () => {
    // Muestra una alerta con los detalles de la cita seleccionada
    Alert.alert('Cita agendada', `Servicio: ${service}\nFecha: ${date}\nHora: ${time}`);
  };

  // Renderización del componente
  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Agendar cita</Text>

      {/* Selector de servicio */}
      <Picker
        selectedValue={service}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setService(itemValue)}
      >
        <Picker.Item label="Seleccione un servicio" value="" />
        <Picker.Item label="Servicio 1" value="Servicio 1" />
        <Picker.Item label="Servicio 2" value="Servicio 2" />
        <Picker.Item label="Servicio 3" value="Servicio 3" />
        {/* Puedes añadir más servicios según sea necesario */}
      </Picker>

      {/* Campo de entrada para la fecha de la cita */}
      <TextInput
        style={styles.input}
        placeholder="Fecha de la cita"
        value={date}
        onChangeText={setDate}
      />

      {/* Campo de entrada para la hora de la cita */}
      <TextInput
        style={styles.input}
        placeholder="Hora de la cita"
        value={time}
        onChangeText={setTime}
      />

      {/* Botón para agendar la cita */}
      <TouchableOpacity style={styles.button} onPress={handleSchedule}>
        <Text style={styles.buttonText}>AGENDAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
    height: 50,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderColor: '#000',
  },
});