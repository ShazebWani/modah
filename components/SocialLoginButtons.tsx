import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Google from "@/assets/images/google-logo.svg";
import { signInWithGoogle } from "@/utils/auth";
import * as GoogleAuth from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { auth } from "@/config/firebaseConfig";
import * as AuthSession from "expo-auth-session";

// Use Expo's proxy redirect URI
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
});

type Props = {
  emailHref: Href<string | object>;
};

// Fix for Expo Auth Session
WebBrowser.maybeCompleteAuthSession();

const SocialLoginButtons = (props: Props) => {
  const { emailHref } = props;

  // Request Google authentication
  const [request, response, promptAsync] = GoogleAuth.useAuthRequest({
    clientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    redirectUri,
  });

  // Handle response from Google Sign-In
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication!;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => console.log("Google Sign-In Success"))
        .catch((error) => console.error("Google Sign-In Error:", error));
    }
  }, [response]);

  return (
    <View style={styles.socialLoginWrapper}>
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Link href={emailHref} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={20} color={Colors.black} />
            <Text style={styles.btnTxt}>Continue with Email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
          <Google width={20} height={20} />
          <Text style={styles.btnTxt}>Continue with Google</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(1100).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-apple" size={20} color={Colors.black} />
          <Text style={styles.btnTxt}>Continue with Apple</Text>
        </TouchableOpacity>
      </Animated.View>
      
    </View>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({
  socialLoginWrapper: {
    alignSelf: "stretch",
  },
  button: {
    flexDirection: "row",
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 15,
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
  },
});
