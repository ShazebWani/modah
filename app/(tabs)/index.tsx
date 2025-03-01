import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { fetchSellers } from "@/utils/firebaseDB";
import { SellerType } from "@/types/type";

const categoryImages: Record<string, any> = {
  Mens: require("@/assets/images/mens.jpg"),
  Womens: require("@/assets/images/womens.jpg"),
  Kids: require("@/assets/images/kids.jpg"),
  Other: require("@/assets/images/other.jpg"),
};


const HomeScreen = () => {
  const [sellers, setSellers] = useState<SellerType[]>([]);

  useEffect(() => {
    const loadSellers = async () => {
      const data = await fetchSellers();
      if (data) {
        setSellers(data);
      }
    };
    loadSellers();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <ScrollView>

        {/* Shop By Price */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Animated.View style={styles.shopByPriceContainer} entering={FadeInUp.duration(500)}>
            {["Under $10", "Under $20", "Under $50", "Under $100"].map((label, index) => (
              <Animated.View key={index} entering={FadeInUp.delay(index * 100).duration(500)}>
                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceButtonText}>{label}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>
        </ScrollView>

        {/* Theme */}
        <Animated.View style={styles.bannerContainer} entering={FadeIn.duration(700)}>
          <Image
            source={require("@/assets/images/theme.png")}
            style={styles.bannerImage}
          />
        </Animated.View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <Animated.View style={styles.gridContainer} entering={FadeInUp.duration(700)}>

        
        {["Mens", "Womens", "Kids", "Other"].map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.gridItem}
            onPress={() => router.push(`/explore?category=${category}`)}
          >
            <Animated.Image
              source={categoryImages[category]}
              style={styles.gridImage}
              entering={FadeInUp.delay(100).duration(700)}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>{category}</Text>
            </View>
          </TouchableOpacity>
        ))}

        </Animated.View>

        {/* Sellers to Watch */}
        <Text style={styles.sectionTitle}>Sellers to Watch</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sellersContainer}>
          {sellers.length > 0 ? (
            sellers.map((seller, index) => (
              <Animated.View 
                key={seller.id} 
                style={styles.sellerBox} 
                entering={FadeInUp.delay(index * 100).duration(500)}
              >
                <TouchableOpacity>
                  <Animated.Image 
                    source={{ uri: seller.image }}
                    style={styles.sellerImage} 
                    entering={FadeIn.duration(500)}
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>{seller.name}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))
          ) : (
            <Animated.View entering={FadeIn.duration(500)}>
              <Text style={styles.noSellersText}>No sellers available</Text>
            </Animated.View>
          )}
        </ScrollView>

      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  shopByPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 7,
    gap: 5,
  },
  priceButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    alignItems: "center",
    borderRadius: 5,
  },
  priceButtonText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 11,
  },
  bannerContainer: {
    marginHorizontal: 7,
    marginVertical: 10,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 7,
    color: Colors.black
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 7,
  },
  gridItem: {
    width: "48%",
    marginVertical: 5,
  },
  gridImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  sellerBox: {
    marginTop: 5,
    width: 120,
    marginHorizontal: 3,
  },
  sellerImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    color: Colors.black,
  },
  sellerText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
    color: Colors.black,
    width: 100,
  },
  sellersContainer: {
    paddingHorizontal: 4,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  overlayText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  noSellersText: {
    color: Colors.gray,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
