import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function Registro({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../img/atras.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Registro</Text>
            </View>
            <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#000" />
            <TextInput style={styles.input} placeholder="Apellido" placeholderTextColor="#000" />
            <TextInput style={styles.input} placeholder="Alias" placeholderTextColor="#000" />
            <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#000" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Número de teléfono" placeholderTextColor="#000" keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#000" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#000" secureTextEntry />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>REGISTRARSE</Text>
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
});