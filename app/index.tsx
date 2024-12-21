// Basic Implementation
import { Redirect } from 'expo-router';

export default function Index() {
    return <Redirect href="/(tabs)" />;
}

// // // More Sophisticated Implementation with Loading State
// // import { Redirect } from 'expo-router';
// // import { View, ActivityIndicator } from 'react-native';
// // import { useEffect, useState } from 'react';
//
// export default function Index() {
//     const [isReady, setIsReady] = useState(false);
//
//     useEffect(() => {
//         // You can add any initialization logic here
//         // For example, checking authentication status
//         // or loading necessary data
//         const prepare = async () => {
//             try {
//                 // Add any async initialization here
//                 // await loadInitialData();
//                 // await checkAuthStatus();
//             } catch (e) {
//                 console.warn(e);
//             } finally {
//                 setIsReady(true);
//             }
//         };
//
//         prepare();
//     }, []);
//
//     if (!isReady) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }
//
//     // Once ready, redirect to the tabs
//     return <Redirect href="/(tabs)" />;
// }