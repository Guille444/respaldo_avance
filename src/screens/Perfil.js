import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';

export default function Perfil({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Perfil</Text>
                </View>
            ),
            headerTitleAlign: 'center',
        });
    }, []);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flexDirection: 'row', // Para alinear el título al centro
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});