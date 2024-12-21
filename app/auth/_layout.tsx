// app/auth/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="signIn"
                options={{
                    headerShown: false,
                    title: 'Sign In',
                    // Add any other options needed
                }}
            />
            <Stack.Screen
                name="signUp"
                options={{
                    headerShown: true,
                    title: '',
                    // Add any other options needed
                }}
            />
        </Stack>
    );
}