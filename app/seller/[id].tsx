import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SellerPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Extract the `id` from the route params

    // Temporary seller data
    const sellers = {
        1: { name: 'Seller One', description: 'Great products from Seller One!' },
        2: { name: 'Seller Two', description: 'Unique items from Seller Two!' },
        3: { name: 'Seller Three', description: 'Exclusive deals from Seller Three!' },
    };

    const seller = sellers[id] || { name: 'Unknown Seller', description: 'No details available.' };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>Back</Text>
            </Pressable>

            {/* Seller Details */}
            <Text style={styles.title}>{seller.name}</Text>
            <Text style={styles.description}>{seller.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    backText: {
        fontSize: 16,
        color: '#007BFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
});
