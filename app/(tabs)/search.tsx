import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const suggestedImages = [
    require('../../assets/images/item1.png'),
    require('../../assets/images/itemDefault.png'),
];

const recentlyViewedImages = [
    require('../../assets/images/item1.png'),
    require('../../assets/images/itemDefault.png'),
    require('../../assets/images/itemDefault.png'),
    require('../../assets/images/itemDefault.png'),
    require('../../assets/images/itemDefault.png'),
    require('../../assets/images/itemDefault.png'),
];

export default function Search() {
    const router = useRouter();
    const [likedPosts, setLikedPosts] = useState([]);

    const toggleLike = (id) => {
        setLikedPosts((prev) =>
            prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
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

                {/* Main Content */}
                <ScrollView>
                    {/* Suggested for You */}
                    <View style={styles.suggestedContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Suggested for You</Text>
                            <Pressable onPress={() => router.push('/searchpages/suggested/seeAll')}>
                                <Text style={styles.seeAllText}>See All</Text>
                            </Pressable>
                        </View>
                        <View style={styles.suggestedImages}>
                            {suggestedImages.map((image, index) => (
                                <Pressable
                                    key={index}
                                    style={styles.suggestedImageWrapper}
                                    onPress={() => router.push(`/items/${index + 1}`)} // Navigate dynamically
                                >
                                    <Image
                                        source={image}
                                        style={styles.suggestedImage}
                                        resizeMode="cover"
                                    />
                                    <Pressable
                                        style={styles.heartButton}
                                        onPress={() => toggleLike(`suggested-${index}`)}
                                    >
                                        <Ionicons
                                            name={
                                                likedPosts.includes(`suggested-${index}`)
                                                    ? 'heart'
                                                    : 'heart-outline'
                                            }
                                            size={18}
                                            color={
                                                likedPosts.includes(`suggested-${index}`)
                                                    ? 'red'
                                                    : '#000'
                                            }
                                        />
                                    </Pressable>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Recently Viewed */}
                    <View style={styles.recentlyViewedContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recently Viewed</Text>
                            <Pressable onPress={() => router.push('/searchpages/recentlyViewed/seeAll')}>
                                <Text style={styles.seeAllText}>See All</Text>
                            </Pressable>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.recentlyViewedGrid}>
                                {recentlyViewedImages.map((image, index) => (
                                    <Pressable
                                        key={index}
                                        style={styles.recentlyViewedBox}
                                        onPress={() => router.push(`/items/${index + 1}`)} // Navigate dynamically
                                    >
                                        <Image
                                            source={image}
                                            style={styles.recentlyViewedImage}
                                            resizeMode="cover"
                                        />
                                        <Pressable
                                            style={styles.heartButton}
                                            onPress={() => toggleLike(`recentlyViewed-${index}`)}
                                        >
                                            <Ionicons
                                                name={
                                                    likedPosts.includes(`recentlyViewed-${index}`)
                                                        ? 'heart'
                                                        : 'heart-outline'
                                                }
                                                size={18}
                                                color={
                                                    likedPosts.includes(`recentlyViewed-${index}`)
                                                        ? 'red'
                                                        : '#000'
                                                }
                                            />
                                        </Pressable>
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    suggestedContainer: {
        flex: 1,
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAllText: {
        fontSize: 14,
        color: 'rgba(194,163,102,0.86)',
    },
    suggestedImages: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    suggestedImageWrapper: {
        position: 'relative',
        width: '49%',
        height: 225,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
    suggestedImage: {
        width: '100%',
        height: 225,
    },
    recentlyViewedContainer: {
        flex: 1,
    },
    recentlyViewedGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 500,
    },
    recentlyViewedBox: {
        width: 150,
        height: 150,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        position: 'relative',
    },
    recentlyViewedImage: {
        width: '100%',
        height: '100%',
    },
    heartButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
        padding: 2,
    },
});
