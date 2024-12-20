import SplashScreen from "./_splash";
import React, { useState } from "react";
import { Slot, Stack, useRouter } from "expo-router";

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(true);
    const router = useRouter(); // Use router to navigate programmatically

    const handleAnimationFinish = () => {
        setShowSplash(false);
        router.replace("/auth/signIn"); // Navigate to the sign-in screen
    };

    return (
        <>
            {showSplash ? (
                <SplashScreen onFinish={handleAnimationFinish} />
            ) : (
                <Stack>
                    <Stack.Screen name="auth" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            )}
        </>
    );
}
