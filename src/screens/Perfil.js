import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TextInput, TouchableOpacity } from 'react-native';

export default function Perfil({ navigation }) {    
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const irCambiarContraseña = async () => {
        navigation.navigate('NuevaContrasenia');
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Perfil</Text>
          <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
          <TextInput style={styles.input} placeholder="Alias" value={alias} onChangeText={setAlias} />
          <TextInput style={styles.input} placeholder="Correo electronico" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Numero de telefono" value={telefono} onChangeText={setTelefono} />
          <TouchableOpacity onPress={irCambiarContraseña} style={styles.button}>
            <Text style={styles.buttonText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
    )
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
        marginTop: 12,
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