import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Link, router, Stack } from "expo-router";
import InputField from "@/components/InputField";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { logIn } from "@/utils/auth";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const { user, error } = await logIn(email, password);
    if (error) {
      setError(error); // Show the error message inside the UI
      return;
    }
  
    router.replace("/(tabs)"); // Redirect on success
  };
  

  return (
    <>
      <Stack.Screen
        options={{

          headerTitle: "Sign In",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Login to Your Account</Text>
        <InputField
          placeholder="Email Address"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: "red" }}>{error}</Text>}

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginTxt}>Don't Have an Account? </Text>
          <TouchableOpacity onPress={() => router.replace("/signup")}>
              <Text style={styles.loginTxtSpan}>Sign Up</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <SocialLoginButtons emailHref={"/signin"} />
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: "600",
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginBottom: 30,
    marginTop: 30
  },
  loginContainer: {
    alignItems: "center",
  },  
})