import {Tabs} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#9d07f3',
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
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={30}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={30}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="myModah"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons
                            name={focused ? 'information-circle' : 'information-circle-outline'}
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="bag"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'bag' : 'bag-outline'} color={color} size={30}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={30}/>
                    ),
                }}
            />
        </Tabs>
    );
}
