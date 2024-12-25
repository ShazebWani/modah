// app/auth/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="choice"
                options={{
                    headerShown: false,
                    title: 'Choice',
            }}
            />
            <Stack.Screen
                name="signIn"
                options={{
                    headerShown: false,
                    title: 'Sign In',
                }}
            />
            <Stack.Screen
                name="signUp"
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: '#c2a366',
                    title: '',
                }}
            />
        </Stack>
    );
}