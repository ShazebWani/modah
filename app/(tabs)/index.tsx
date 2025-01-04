import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ScrollView,
    Image, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

StatusBar.setBarStyle('dark-content');

const sellerImages = [
    require('../../assets/images/seller1.png'),
    require('../../assets/images/seller2.png'),
    require('../../assets/images/seller3.png'),
];

export default function HomePage() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView>

                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchInputWrapper}>
                        <Ionicons name="search" size={20} color="#a0a0a0" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for items"
                            placeholderTextColor="#a0a0a0"
                        />
                    </View>
                    <Pressable onPress={() => router.push('/(tabs)/bag')}>
                        <Ionicons name="bag-outline" size={24} color="#000" />
                    </Pressable>
                </View>

                {/* Horizontal Tabs */}
                <View style={styles.tabs}>
                    {['Under $10', 'Under $20', 'Under $50', 'Under $100'].map((tab, index) => (
                        <Pressable
                            key={index}
                            style={styles.tab}
                            onPress={() => router.push(`/homepages/under${tab.replace(/\D/g, '')}`)}
                        >
                            <Text style={styles.tabText}>{tab}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Image Banner */}
                <Image
                    source={require('../../assets/images/home-banner.png')}
                    style={styles.banner}
                    resizeMode="cover"
                />

                {/* Shop By Category */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Shop By Category</Text>
                    {['Men', 'Women', 'Kids', 'Everything Else'].map((category, index) => (
                        <Pressable
                            key={index}
                            style={styles.categoryRow}
                            onPress={() =>
                                router.push(`/homepages/${category.toLowerCase().replace(/\s+/g, '')}`)
                            }
                        >
                            <Text style={styles.categoryText}>{category}</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                        </Pressable>
                    ))}
                </View>

                {/* Sellers To Watch */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>SELLERS TO WATCH</Text>
                    <Text style={styles.subtitle}>The shops you should know about</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {sellerImages.map((image, index) => (
                            <Pressable
                                key={index}
                                onPress={() => router.push(`/seller/${index + 1}`)} // Example: Navigate to a seller's page
                                style={styles.sellerButton}
                            >
                                <Image
                                    source={image}
                                    style={styles.sellerImage}
                                />
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex: 1,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    tab: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 1,
        padding: 3,
        borderRadius: 6,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    tabText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    banner: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
    },
    section: {
        marginBottom: 15,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    categoryText: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 15,
        color: '#888',
        marginBottom: 8,
    },
    sellerImage: {
        width: 225,
        height: 140,
        borderRadius: 10,
        marginRight: 10,
    },
    sellerButton: {
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,
    },
});
