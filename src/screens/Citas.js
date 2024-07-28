import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function Citas({ navigation }) {

  useEffect(() => {
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
  const [service, setService] = useState('');
  const [vehicle, setVehicle] = useState('');

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const showDatepicker = () => {
    showMode('date');
  };

  const handleConfirm = (event, selectedDate) => {
    setShow(Platform.OS === 'ios'); // Hides the picker for Android after selecting a date
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Agendar cita</Text>
      {/* Selector de vehículo */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={vehicle}
          style={styles.picker}
          onValueChange={(itemValue) => setVehicle(itemValue)}
        >
          <Picker.Item label="Seleccione un vehículo" value="" />
          {/* Agrega los vehículos aquí */}
        </Picker>
      </View>
      {/* Selector de servicio */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={service}
          style={styles.picker}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          <Picker.Item label="Seleccione un servicio" value="" />
          {/* Puedes añadir más servicios según sea necesario */}
        </Picker>
      </View>
      {/* Campo de entrada para la fecha de la cita */}
      <View style={styles.dateContainer}>
        <Text style={styles.label}>Fecha de cita</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={handleConfirm}
            style={styles.datePicker}
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
  pickerContainer: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
  },
  dateContainer: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateText: {
    fontWeight: '700',
    color: '#322C2B',
    textDecorationLine: 'underline',
  },
  datePicker: {
    width: '100%',
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
});
