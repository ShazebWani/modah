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
    Platform,
    ScrollView,
    KeyboardAvoidingView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SignUp() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        if (fullName.trim() && email.trim() && password.trim() && password === confirmPassword) {
            alert('Account created!');
            router.replace('/(tabs)');
        } else {
            alert('Please ensure all fields are filled correctly.');
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
                            <Text style={styles.title}>Create Account</Text>

                            {/* Full Name Input */}
                            <View style={styles.inputContainer}>
                                <Ionicons name="person-outline" size={24} color="#a0a0a0" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    placeholderTextColor="#a0a0a0"
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                            </View>

                            {/* Email Input */}
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

                            {/* Password Input */}
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
                            </View>

                            {/* Confirm Password Input */}
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={24} color="#a0a0a0" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#a0a0a0"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                />
                            </View>

                            {/* Sign-Up Button */}
                            <LinearGradient
                                colors={['#72521f', '#f8e5c2']}
                                style={styles.gradientButton}
                            >
                                <Pressable style={styles.buttonContent} onPress={handleSignUp}>
                                    <Text style={styles.buttonText}>SIGN UP</Text>
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

                            {/* Footer */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Already have an account? </Text>
                                <Pressable onPress={() => router.push('/auth/signIn')}>
                                    <Text style={styles.signInText}>Log In</Text>
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
        height: 175,
        marginBottom: 8,
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
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
    gradientButton: {
        borderRadius: 25,
        marginTop: 20,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    footerText: {
        fontSize: 14,
        color: '#a0a0a0',
    },
    signInText: {
        fontSize: 14,
        color: '#c2a366',
        fontWeight: 'bold',
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
});
