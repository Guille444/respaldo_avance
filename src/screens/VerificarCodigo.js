import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Constantes from '../../utils/constantes';

export default function VerificarCodigo({ route, navigation }) {
    const ip = Constantes.IP; // Obtiene la IP del servidor desde las constantes

    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);

    const onChangeText = (text, setNumber, nextInputRef) => {
        if (/^\d$/.test(text)) {
            setNumber(text);
            if (nextInputRef) {
                nextInputRef.current.focus();
            }
        }
        if (number1 && number2 && number3 && number4 && number5 && number6) {
            handlePin();
        }
    };

    const onKeyPress = (e, number, setNumber, prevInputRef, nextInputRef) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (number) {
                setNumber('');
            } else if (prevInputRef) {
                prevInputRef.current.focus();
            }
        } else if (nextInputRef && /^\d$/.test(e.nativeEvent.key)) {
            nextInputRef.current.focus();
        }
    };

    const handlePin = async () => {
        const pin = number1 + number2 + number3 + number4 + number5 + number6;
        if (pin.length === 6) {
            try {
                const formData = new FormData();
                formData.append('pinCliente', pin);
                const response = await fetch(`${ip}/services/public/cliente.php?action=verifPin`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log(data);
                if (data.status) {
                    navigation.navigate('NuevaClave');
                } else {
                    Alert.alert('Error', data.error);
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Ocurrió un error al verificar el código');
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Verificar Código</Text>
            <Text style={styles.instructions}>Ingresa el código de verificación enviado a tu correo electrónico</Text>

            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    ref={input1Ref}
                    onChangeText={(text) => onChangeText(text, setNumber1, input2Ref)}
                    onKeyPress={(e) => onKeyPress(e, number1, setNumber1, null, input2Ref)}
                    value={number1}
                    placeholder=""
                    keyboardType="numeric"
                    maxLength={1}
                    autoFocus
                />
                <TextInput
                    style={styles.input}
                    ref={input2Ref}
                    onChangeText={(text) => onChangeText(text, setNumber2, input3Ref)}
                    onKeyPress={(e) => onKeyPress(e, number2, setNumber2, input1Ref, input3Ref)}
                    value={number2}
                    placeholder=""
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={styles.input}
                    ref={input3Ref}
                    onChangeText={(text) => onChangeText(text, setNumber3, input4Ref)}
                    onKeyPress={(e) => onKeyPress(e, number3, setNumber3, input2Ref, input4Ref)}
                    value={number3}
                    placeholder=""
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={styles.input}
                    ref={input4Ref}
                    onChangeText={(text) => onChangeText(text, setNumber4, input5Ref)}
                    onKeyPress={(e) => onKeyPress(e, number4, setNumber4, input3Ref, input5Ref)}
                    value={number4}
                    placeholder=""
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={styles.input}
                    ref={input5Ref}
                    onChangeText={(text) => onChangeText(text, setNumber5, input6Ref)}
                    onKeyPress={(e) => onKeyPress(e, number5, setNumber5, input4Ref, input6Ref)}
                    value={number5}
                    placeholder=""
                    keyboardType="numeric"
                    maxLength={1}
                />
                <TextInput
                    style={styles.input}
                    ref={input6Ref}
                    onChangeText={(text) => {
                        onChangeText(text, setNumber6, null);
                        if (text.length === 1 && number1 && number2 && number3 && number4 && number5) {
                            handlePin();
                        }
                    }}
                    onKeyPress={(e) => onKeyPress(e, number6, setNumber6, input5Ref, null)}
                    value={number6}
                    placeholder=""
                    keyboardType="numeric"
                    maxLength={1}
                />
            </View>

            <TouchableOpacity onPress={handlePin} style={styles.button}>
                <Text style={styles.buttonText}>VERIFICAR</Text>
            </TouchableOpacity>
        </ScrollView>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#f9f9f9',
        width: 50,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 12,
        fontSize: 35,
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 8,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});