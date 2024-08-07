import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Constantes from '../../utils/constantes';

export default function RecuperarClave({ navigation }) {

    const ip = Constantes.IP; // Obtiene la IP del servidor desde las constantes
    const [alias, setAlias] = useState(''); // Estado para el nombre de usuario
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta
    const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de la alerta

    const sendMail = async (data) => {
        console.log('Datos recibidos en sendMail:', data);
        try {
            if (!data || !data.correo_cliente) {
                throw new Error('El correo electrónico no está definido');
            }
    
            console.log('PIN enviado:', data.codigo_recuperacion);
    
            const formData = new FormData();
            formData.append('codigo_recuperacion', data.codigo_recuperacion || '');
            formData.append('alias_cliente', data.alias_cliente || '');
            formData.append('correo_cliente', data.correo_cliente || '');
    
            const response = await fetch(`${ip}/libraries/sendCode.php`, {
                method: 'POST',
                body: formData,
            });
    
            // Verifica si la respuesta es en formato JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const responseData = await response.json();
                console.log('Respuesta del servidor:', responseData);
    
                if (responseData.status) {
                    setAlertMessage('Revise su correo electrónico');
                    setShowAlert(true);
                    navigation.navigate('VerificarCodigo');
                } else {
                    setAlertMessage(responseData.message || 'Error al enviar el correo');
                    setShowAlert(true);
                }
            } else {
                const text = await response.text();
                console.error('Respuesta del servidor no es JSON:', text);
                setAlertMessage('Error en la respuesta del servidor');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error en sendMail:', error);
            setAlertMessage(error.toString());
            setShowAlert(true);
        }
    };            

    const handleUs = async () => {
        try {
            const formData = new FormData();
            formData.append('aliasCliente', alias);
    
            const response = await fetch(`${ip}/services/public/cliente.php?action=verifUs`, {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            console.log('Datos recibidos:', data);
    
            if (data.status && data.dataset) {
                console.log('Datos enviados a sendMail:', data.dataset);
                sendMail(data.dataset);
            } else {
                setAlertMessage(data.error || 'Error en la respuesta del servidor');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error en handleUs:', error);
            setAlertMessage('Ocurrió un error al iniciar sesión');
            setShowAlert(true);
        }
    };    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../img/atras.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Recuperación de contraseña</Text>
            </View>
            <Text style={styles.registerText}>Ingresa tu alias, posterior te enviaremos un correo al correo enlazado a tu cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Alias"
                value={alias}
                onChangeText={(text) => setAlias(text)} // Actualiza el estado `alias`
            />
            <TouchableOpacity onPress={handleUs} style={styles.button}>
                <Text style={styles.buttonText}>ENVIAR</Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Alerta"
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="gray"
                onConfirmPressed={() => setShowAlert(false)}
                contentContainerStyle={styles.alertContentContainer}
                titleStyle={styles.alertTitle}
                messageStyle={styles.alertMessage}
                confirmButtonTextStyle={styles.alertConfirmButtonText}
                confirmButtonStyle={styles.alertConfirmButton}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: '#000',
        marginBottom: 24,
    },
    input: {
        marginTop: 10,
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 10,
        fontSize: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
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
    alertContentContainer: {
        borderRadius: 10,
        padding: 20,
    },
    alertTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 18,
        marginBottom: 10,
    },
    alertConfirmButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    alertConfirmButtonText: {
        fontSize: 16,
    },
});
