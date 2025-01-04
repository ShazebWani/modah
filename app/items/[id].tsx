import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    Dimensions,
} from 'react-native';
import { Rating } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window'); // Full screen width

export default function ItemDetails() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Extract dynamic `id`
    const [currentSlide, setCurrentSlide] = useState(0);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const items = {
        1: {
            name: 'White Nike Shoes',
            description: 'Clean white Nike shoes perfect for any occasion.',
            price: '$70',
            size: 'US 10',
            category: 'Shoes',
            condition: 'Brand New',
            posted: '1 DAY AGO',
            seller: "Shazeb's Shop",
            location: 'Atlanta, Georgia',
            rating: '5 stars',
        },
    };

    const item = items[id] || {
        name: 'Default Item',
        description: 'No details available.',
        price: '$0',
        size: '-',
        category: 'Uncategorized',
        condition: 'Unknown',
        posted: 'N/A',
        seller: 'Unknown Seller',
        location: 'Unknown Location',
        rating: '-',
    };

    const images = [require('../../assets/images/item1.png'), require('../../assets/images/itemDefault.png')];
    const sellerImages = [
        require('../../assets/images/seller1.png'),
        require('../../assets/images/seller2.png'),
        require('../../assets/images/seller3.png'),
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Pressable onPress={() => router.push('/(tabs)/bag')}>
                    <Ionicons name="bag-outline" size={24} color="#000" />
                </Pressable>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView>
                {/* Image Slider */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={(e) => {
                        const slideIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                        setCurrentSlide(slideIndex);
                    }}
                    scrollEventThrottle={16}
                >
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={image} style={styles.itemImage} />
                            <Pressable
                                style={styles.saveButton}
                                onPress={() => setSaved(!saved)}
                            >
                                <Ionicons
                                    name="bookmark"
                                    size={24}
                                    color={saved ? 'yellow' : 'white'}
                                />
                            </Pressable>
                            <Pressable
                                style={styles.likeButton}
                                onPress={() => setLiked(!liked)}
                            >
                                <Ionicons
                                    name="heart"
                                    size={24}
                                    color={liked ? 'red' : 'white'}
                                />
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.slideIndicator}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicatorDot,
                                currentSlide === index && styles.activeIndicatorDot,
                            ]}
                        />
                    ))}
                </View>

                {/* Item Description */}
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>
                        {item.name} · {item.category}
                    </Text>
                    <Text style={styles.itemSubDetails}>
                        Men · Size {item.size} · {item.condition}
                    </Text>
                    <View style={styles.divider} />

                    {/* Seller Details */}
                    <View style={styles.sellerInfo}>
                        <Image
                            source={require('../../assets/images/profilePic.png')}
                            style={styles.profilePic}
                        />
                        <View>
                            <Text style={styles.sellerName}>{item.seller}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />

                    {/* Seller Account Info */}
                    <View style={styles.sellerAccount}>
                        <Image
                            source={require('../../assets/images/profilePic.png')}
                            style={styles.profilePic}
                        />
                        <View>
                            <Text style={styles.sellerName}>Sold by {item.seller}</Text>
                            <Text style={styles.sellerLocation}>{item.location}</Text>
                            <Rating
                                imageSize={20}
                                readonly
                                startingValue={5} // Example: Hardcoded 5 stars
                                tintColor="#f2f2f2" // Background color of the rating container
                                ratingColor='#c2a366' // Color of the filled stars
                                style={styles.sellerRating}
                            />
                        </View>
                        <Pressable style={styles.visitShopButton}>
                            <Text style={styles.visitShopText}>Visit Shop</Text>
                        </Pressable>
                    </View>
                    <View style={styles.divider} />

                    {/* Recommendations */}
                    <Text style={styles.sectionHeader}>You May Also Like</Text>
                    <View style={styles.recommendedGrid}>
                        {[...Array(6)].map((_, index) => (
                            <View key={index} style={styles.recommendedItemWrapper}>
                                <Image
                                    source={require('../../assets/images/itemDefault.png')}
                                    style={styles.recommendedItem}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Similar Sellers */}
                    <Text style={styles.sectionHeader}>Similar Sellers</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {sellerImages.map((image, index) => (
                            <Pressable
                                key={index}
                                onPress={() => router.push(`/seller/${index + 1}`)}
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

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.bottomActions}>
                    <Pressable style={styles.offerButton}>
                        <Text style={styles.buttonText}>Offer $65</Text>
                    </Pressable>
                    <Pressable style={styles.buyButton}>
                        <Text style={styles.buttonText}>Buy</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    itemImage: {
        width,
        height: 350,
    },
    imageWrapper: {
        position: 'relative',
    },
    slideIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
    },
    indicatorDot: {
        width: 8,
        height: 8,
        backgroundColor: '#ccc',
        borderRadius: 4,
        margin: 4,
    },
    activeIndicatorDot: {
        backgroundColor: 'rgba(194,163,102,1)',
    },
    saveButton: {
        position: 'absolute',
        top: 10,
        right: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 15,
    },
    likeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 15,
    },
    itemDetails: {
        padding: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSubDetails: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 5,
    },
    sellerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 10,
    },
    sellerName: {
        fontSize: 15,
        fontWeight: 'semibold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
    },
    sellerAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    sellerLocation: {
        fontSize: 14,
        color: '#666',
    },
    visitShopButton: {
        backgroundColor: '#000',
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    visitShopText: {
        color: '#fff',
        fontSize: 14,
    },
    sellerRating: {
        marginTop: 2, // Space above the rating
        alignSelf: 'flex-start', // Ensure it aligns with the text
    },
    sectionHeader: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#888',
        marginBottom: 8,
    },
    recommendedGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    recommendedItemWrapper: {
        width: '30%',
        marginBottom: 10,
    },
    recommendedItem: {
        width: '100%',
        height: 100,
        borderRadius: 10,
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
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomActions: {
        flexDirection: 'row',
    },
    offerButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    buyButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
});
