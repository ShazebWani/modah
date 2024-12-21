// app/_layout.tsx
import React, { useState } from "react";
import { Stack } from "expo-router";
import SplashScreen from "./splash";

export default function RootLayout() {
    const [animationCompleted, setAnimationCompleted] = useState(false);

    const handleAnimationFinish = (isCompleted: boolean) => {
        setAnimationCompleted(isCompleted);
    };

    if (!animationCompleted) {
        return <SplashScreen onFinish={handleAnimationFinish} />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}