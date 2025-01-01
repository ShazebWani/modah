import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mockPosts = [
    {
        id: 1,
        images: [require('../../assets/images/seller1.png')],
        price: '$20',
        size: 'M',
    },
    {
        id: 2,
        images: [require('../../assets/images/seller2.png')],
        price: '$15',
        size: 'S',
    },
    {
        id: 3,
        images: [require('../../assets/images/seller3.png')],
        price: '$25',
        size: 'L',
    },
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
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ScrollView>
                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <Ionicons name="search" size={20} color="#a0a0a0" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for items"
                        placeholderTextColor="#a0a0a0"
                    />
                </View>

                {/* Posts Section */}
                <View style={styles.postsContainer}>
                    {mockPosts.map((post) => (
                        <Pressable
                            key={post.id}
                            style={styles.post}
                            onPress={() => router.push(`/items/${post.id}`)}
                        >
                            <Image
                                source={post.images[0]}
                                style={styles.postImage}
                                resizeMode="cover"
                            />
                            <Pressable
                                style={styles.heartButton}
                                onPress={() => toggleLike(post.id)}
                            >
                                <Ionicons
                                    name={likedPosts.includes(post.id) ? 'heart' : 'heart-outline'}
                                    size={24}
                                    color={likedPosts.includes(post.id) ? 'red' : '#000'}
                                />
                            </Pressable>
                            <Text style={styles.postDetails}>{`${post.price} | Size: ${post.size}`}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Recently Viewed Slider */}
                <View style={styles.recentlyViewedContainer}>
                    <Text style={styles.sectionHeader}>Recently Viewed</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {mockPosts.map((post) => (
                            <Pressable
                                key={`recent-${post.id}`}
                                style={styles.recentPost}
                                onPress={() => router.push(`/items/${post.id}`)}
                            >
                                <Image
                                    source={post.images[0]}
                                    style={styles.recentPostImage}
                                    resizeMode="cover"
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
    postsContainer: {
        marginBottom: 20,
    },
    post: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    postImage: {
        width: '100%',
        height: 200,
    },
    heartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    postDetails: {
        padding: 10,
        fontSize: 14,
        color: '#333',
    },
    recentlyViewedContainer: {
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recentPost: {
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    recentPostImage: {
        width: 100,
        height: 100,
    },
});
