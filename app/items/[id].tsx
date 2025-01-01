import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ItemDetails() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Extract the dynamic `id` parameter

    // Mock data for item details
    const items = {
        1: { name: 'Item 1', description: 'Details about Item 1', price: '$20', size: 'M' },
        2: { name: 'Item 2', description: 'Details about Item 2', price: '$15', size: 'S' },
        3: { name: 'Item 3', description: 'Details about Item 3', price: '$25', size: 'L' },
    };

    const item = items[id] || { name: 'Unknown Item', description: 'No details available.', price: '$0', size: '-' };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backText}>Back</Text>
            </Pressable>

            {/* Item Details */}
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.details}>{`Price: ${item.price} | Size: ${item.size}`}</Text>
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
        marginBottom: 10,
    },
    details: {
        fontSize: 14,
        textAlign: 'center',
        color: '#444',
    },
});
