import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#c2a366',
                tabBarInactiveTintColor: '#010101',
                tabBarShowLabel: false,
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false, // Hide header
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'home-sharp' : 'home-outline'}
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'search' : 'search-outline'}
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="myModah"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../assets/icons/mm-filled.png')
                                    : require('../../assets/icons/mm-outline.png')
                            }
                            style={{ width: 78, height: 32 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="bag"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'bag' : 'bag-outline'}
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
