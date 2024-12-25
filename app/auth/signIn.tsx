import React, { useState } from 'react';
import {
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    View,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
    Platform, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        if (email.trim() && password.trim()) {
            router.replace('/(tabs)');
        }
    };

    const handleGoogleSignIn = async () => {
        alert('Google Sign-In clicked');
        router.replace('/(tabs)');
    }
    const handleFacebookSignIn = async() => {
        alert('Facebook Sign-In clicked');
        router.replace('/(tabs)');
    }

    StatusBar.setBarStyle('dark-content');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {/* Banner */}
                        <View style={styles.bannerContainer}>
                            <Image
                                source={require('../../assets/images/SignUpImage.png')}
                                style={styles.banner}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Content */}
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>Login</Text>
                            <Text style={styles.subtitle}>Please sign in to continue.</Text>

                            <View style={styles.inputContainer}>
                                <Ionicons name="mail-outline" size={24} color="#a0a0a0" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#a0a0a0"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={24} color="#a0a0a0" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#a0a0a0"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                                <Pressable onPress={() => alert('Forgot Password?')}>
                                    <Text style={styles.forgotText}>Forgot</Text>
                                </Pressable>
                            </View>

                            <LinearGradient
                                colors={['#72521f', '#f8e5c2']}
                                style={styles.gradientButton}
                            >
                                <Pressable style={styles.buttonContent} onPress={handleSignIn}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </Pressable>
                            </LinearGradient>

                            {/* OR Text */}
                            <Text style={styles.orText}>or</Text>

                            {/* Social Buttons */}
                            <View style={styles.socialButtonsContainer}>
                                <Pressable style={styles.socialButton} onPress={handleGoogleSignIn}>
                                    <Ionicons name="logo-google" size={24} color="#fff" />
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </Pressable>

                                <Pressable style={styles.socialButton} onPress={handleFacebookSignIn}>
                                    <Ionicons name="logo-facebook" size={24} color="#fff" />
                                    <Text style={styles.socialButtonText}>Facebook</Text>
                                </Pressable>
                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Don’t have an account? </Text>
                                <Pressable onPress={() => router.push('/auth/signUp')}>
                                    <Text style={styles.signUpText}>Sign Up</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
    },
    scrollContent: {
        flexGrow: 1,
    },
    bannerContainer: {
        width: '100%',
        backgroundColor: '#ECECEC',
    },
    banner: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#a0a0a0',
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    forgotText: {
        fontSize: 12,
        color: '#c2a366',
    },
    gradientButton: {
        borderRadius: 25,
        marginTop: 10,
    },
    buttonContent: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 14,
        color: '#a0a0a0',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a0a0a0',
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
    },
    footerText: {
        fontSize: 14,
        color: '#a0a0a0',
    },
    signUpText: {
        fontSize: 14,
        color: '#c2a366',
        fontWeight: 'bold',
    },
});
