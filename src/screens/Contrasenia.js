import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function Contrasenia({ navigation }) {

    // Función para navegar hacia la pantalla de Perfil
    const irPerfil = async () => {
        navigation.navigate('Perfil');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../img/atras.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Cambiar contraseña</Text>
            </View>
            <TextInput style={styles.input} placeholder="Contraseña actual" placeholderTextColor="#000" secureTextEntry />
            <TextInput style={styles.input} placeholder="Nueva contraseña" placeholderTextColor="#000" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#000" secureTextEntry />
            <TouchableOpacity onPress={irPerfil} style={styles.button}>
                <Text style={styles.buttonText}>GUARDAR</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 50,
    },
    registerText: {
        justifyContent: 'flex-start'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    subtitle: {
        fontSize: 18,
        color: '#000',
        marginBottom: 24,
    },
    input: {
        marginTop: 12,
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});