import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
 
export default function Citas({ navigation }) {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
 
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
 
  const handleSchedule = () => {
    Alert.alert('Cita agendada', `Servicio: ${service}\nFecha: ${date}\nHora: ${time}`);
  };
 
  return (
<View style={styles.container}>
<Text style={styles.title}>Agendar cita</Text>
<TextInput
        style={styles.input}
        placeholder="Servicio de la cita"
        value={service}
        onChangeText={setService}
      />
<TextInput
        style={styles.input}
        placeholder="Fecha de la cita"
        value={date}
        onChangeText={setDate}
      />
<TextInput
        style={styles.input}
        placeholder="Hora de la cita"
        value={time}
        onChangeText={setTime}
      />
<TouchableOpacity style={styles.button} onPress={handleSchedule}>
<Text style={styles.buttonText}>AGENDAR</Text>
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