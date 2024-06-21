import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function Citas({ navigation }) {

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

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const showDatepicker = () => {
    showMode('date');
  };

  // Renderización del componente
  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Agendar cita</Text>

      {/* Selector de servicio */}
      <Picker
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
      <View style={styles.contenedorFecha}>
        <Text style={styles.fecha}>Fecha Nacimiento</Text>
        <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>Seleccionar Fecha:</Text></TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())} // Fecha mínima permitida (100 años atrás desde la fecha actual)
            maximumDate={new Date()} // Fecha máxima permitida (fecha actual)
          />
        )}
      </View>

      {/* Botón para agendar la cita */}
      <TouchableOpacity style={styles.button}>
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
    marginTop: 10,
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
  fechaSeleccionar: {
    fontWeight: '700',
    color: '#322C2B',
    textDecorationLine: 'underline',
  },
});