import React, { useState } from "react";
import { Stack } from "expo-router";
import SplashScreen from "./_splash";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  const [animationCompleted, setAnimationCompleted] = useState(false);

  const handleAnimationFinish = () => {
    setAnimationCompleted(true);
    router.replace("/auth/signIn"); // Navigate to sign-in screen
  };

  if (!animationCompleted) {
    return <SplashScreen onFinish={handleAnimationFinish} />;
  }

  return (
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
  );
}
