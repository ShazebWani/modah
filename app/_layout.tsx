import React, {useEffect, useState} from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "./splash";


export default function RootLayout() {
    const [animationCompleted, setAnimationCompleted] = useState(false);

    const handleAnimationFinish = (isCompleted: boolean) => {
        setAnimationCompleted(isCompleted);

    };

    return (
        <>
            <StatusBar style={"dark"} />
            {!animationCompleted ? (
                <SplashScreen onFinish={handleAnimationFinish} />
            ) : (
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="auth" />
                    <Stack.Screen name="(tabs)" />
                </Stack>
            )}
        </>
    );
}
