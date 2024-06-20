import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Perfil({ navigation }) {

  // Función para navegar hacia la pantalla de Sesion
  const irSesion = async () => {
    navigation.navigate('Sesion');
  };

  useEffect(() => {
    // Título del encabezado de navegación
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>
      ),
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={irSesion} style={styles.headerRightContainer}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
          <Image
            source={require('../img/sesion.png')} // Ruta a tu imagen
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const irCambiarContraseña = async () => {
    navigation.navigate('Contrasenia'); // Navegar a la pantalla de cambio de contraseña
  };

  // Renderización del componente
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Alias"
        value={alias}
        onChangeText={setAlias}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Numero de telefono"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TouchableOpacity onPress={irCambiarContraseña} style={styles.button}>
        <Text style={styles.buttonText}>CAMBIAR CONTRASEÑA</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>GUARDAR</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#fff',
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
    marginTop: 12,
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
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  logoutText: {
    fontSize: 16,
    marginRight: 8,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
});