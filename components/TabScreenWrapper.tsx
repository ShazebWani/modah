import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';

const TabScreenWrapper = ({ children }) => {
  return (
    <LinearGradient
      colors={['#f3e5f5', '#ffffff']} // Light purple to white gradient
      style={styles.gradient}
    >
      <View style={styles.container}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default TabScreenWrapper;
