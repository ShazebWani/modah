import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

export default function Index() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // can add initialization logic here
        // For example, checking if user is already logged in
        const prepare = async () => {
            try {
                // Add any async initialization here
                // const isLoggedIn = await checkAuthStatus();
                // if (isLoggedIn) {
                //     return <Redirect href="/(tabs)" />;
                // }
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
            }
        };

        prepare();
    }, []);

    if (!isReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Redirect to auth by default
    return <Redirect href="/auth/signIn" />;
}