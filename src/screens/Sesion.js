import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Sesion({ navigation }) {

    const handlerLogin = async () => {
        navigation.navigate('TabNavigator');
      };

    const irRegistrar = async () => {
        navigation.navigate('Registro');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <TextInput style={styles.input} placeholder="Alias" />
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />
            <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={irRegistrar}>
                <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 18,
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    registerText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 40,
        alignSelf: 'flex-start',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});