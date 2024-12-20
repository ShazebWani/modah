import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="search" options={{ title: "Search" }} />
            <Tabs.Screen name="myModah" options={{ title: "My Modah" }} />
            <Tabs.Screen name="bag" options={{ title: "Bag" }} />
            <Tabs.Screen name="account" options={{ title: "Account" }} />
        </Tabs>
    );
}
