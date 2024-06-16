import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function RecuperarContrasenia({ navigation }) {

    const irContra = async () => {
        navigation.navigate('NuevaContrasenia');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../img/atras.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Recuperación de contraseña</Text>
            </View>
            <Text style={styles.registerText}>Ingresa tu correo electrónico</Text>
            <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#000" keyboardType="email-address" />
            <TouchableOpacity onPress={irContra} style={styles.button}>
                <Text style={styles.buttonText}>ENVIAR CÓDIGO</Text>
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
    registerText:{
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
});