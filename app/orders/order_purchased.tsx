import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Stack, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import LottieView from 'lottie-react-native';
import TabScreenWrapper from '@/components/TabScreenWrapper';

const OrderPurchased = () => {
  return (
    <TabScreenWrapper>
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Order Complete',
        }}
      />
    <View style={styles.container}>
    <LottieView
            source={require("@/assets/animations/confetti.json")}
            autoPlay={false}
            loop={false}
            style={{ width: 900, height: 900 }}
            ref={animation => {
            if (animation) {
              setTimeout(() => {
                animation.play();
              }, 500);
            }
            }}
        />
      <LottieView
            source={require("@/assets/animations/order-confirmed.json")}
            autoPlay={false}
            loop={false}
            style={{ width: 400, height: 400, marginTop: -800 }}
            ref={animation => {
            if (animation) {
              setTimeout(() => {
                animation.play();
              }, 500);
            }
            }}
        />
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.message}>Track your order in the Purchases tab.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)/explore')}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
    </TabScreenWrapper>
  );
};

export default OrderPurchased;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    marginTop: -20,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
  },
  message: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
