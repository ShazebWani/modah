import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInRight } from "react-native-reanimated";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import LottieView from 'lottie-react-native';

type Props = {};

const WelcomeScreen = (props: Props) => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={['#f3e5f5', '#ffffff']}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, marginTop: 30 }}>
          <LottieView
            source={require("@/assets/animations/modah_cart.json")}
            autoPlay
            loop={false}
            style={{ flex: 1 }}
          />
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Animated.Text
                style={styles.arabicTitle}
                entering={FadeInRight.delay(200).duration(300).springify()}
              >
                موضة
              </Animated.Text>
              <Animated.Text
                style={styles.title}
                entering={FadeInRight.delay(300).duration(300).springify()}
              >
                Modah
              </Animated.Text>
              <Animated.Text
                style={styles.description}
                entering={FadeInRight.delay(500).duration(300).springify()}
              >
                Fashion • Shopping • Excellence
              </Animated.Text>

              <SocialLoginButtons emailHref={'/signup'} />
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginTxt}>Already have an account? </Text>
                <Link href={"/signin"} asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginTxtSpan}>Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    paddingBottom: 110,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  arabicTitle: {
    fontSize: 40,
    color: Colors.gray,
    fontWeight: "600",
    letterSpacing: 2.4,
    fontFamily: 'Cochin',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 60,
    color: Colors.primary,
    fontWeight: "600",
    letterSpacing: 2.4,
    marginBottom: 10,
    fontFamily: 'Cochin',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    letterSpacing: 1.2,
    lineHeight: 20,
    marginBottom: 15,
  },
  loginTxt: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 20,
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: "600",
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 5,
  },
});
