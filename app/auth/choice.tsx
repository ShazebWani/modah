import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

const ChoiceScreen = () => {
    const router = useRouter();
    StatusBar.setBarStyle('light-content');

    return (
        <ImageBackground
            source={require('../../assets/images/choice-bg.jpg')}
            style={styles.background}
        >
            <SafeAreaView style={styles.overlay}>
                <Text style={styles.title}>Start Your Shopping Journey</Text>
                <Text style={styles.subtitle}>Lorem ipsum dolor sit amet consectetur adipiscing elit:</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonOutline]}
                        onPress={() => router.push('/auth/signIn')}
                    >
                        <Text style={[styles.buttonText, styles.buttonOutlineText]}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonFilled]}
                        onPress={() => router.push('/auth/signUp')}
                    >
                        <Text style={[styles.buttonText, styles.buttonFilledText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        marginTop: 25,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(194,163,102,0.59)',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 400,
    },
    button: {
        width: '90%',
        paddingVertical: 14,
        borderRadius: 30,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOutline: {
        borderWidth: 2,
        borderColor: 'rgba(194,163,102,0.59)',
        backgroundColor: 'transparent',
    },
    buttonFilled: {
        backgroundColor: 'rgba(194,163,102,0.59)',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonOutlineText: {
        color: 'rgba(194,163,102,0.86)',
    },
    buttonFilledText: {
        color: '#fff',
    },
});

export default ChoiceScreen;
