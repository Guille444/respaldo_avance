import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';

export default function NuevaClave({ navigation }) {

    // Función para navegar hacia la pantalla de Sesion
    const irLogin = async () => {
        navigation.navigate('Sesion');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Actualizar contraseña</Text>
            </View>
            <TextInput style={styles.input} placeholder="Nueva contraseña" placeholderTextColor="#000" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#000" secureTextEntry />
            <TouchableOpacity onPress={irLogin} style={styles.button}>
                <Text style={styles.buttonText}>GUARDAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 50,
    },
    registerText: {
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 24,
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    title: {
        fontSize: 32,
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: '#000',
        marginBottom: 24,
    },
    input: {
        marginTop: 10,
        backgroundColor: '#f0f0f0', // Fondo gris claro similar al botón
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        fontSize: 16,
        borderRadius: 8, // Bordes redondeados para el input
        backgroundColor: '#f9f9f9', // Fondo claro para los campos de entrada
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});