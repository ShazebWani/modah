import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { fetchSellers } from "@/utils/firebaseDB";

const HomeScreen = () => {
  const [sellers, setSellers] = useState<any[]>([]);

  useEffect(() => {
    const loadSellers = async () => {
      const data = await fetchSellers();
      console.log("Final Sellers Data:", data); // Debugging
      setSellers(data);
    };
    loadSellers();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <ScrollView>

        {/* Shop By Price */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Animated.View style={styles.shopByPriceContainer} entering={FadeInUp.duration(700)}>
            {["Under $10", "Under $20", "Under $50", "Under $100"].map((label, index) => (
              <TouchableOpacity key={index} style={styles.priceButton}>
                <Text style={styles.priceButtonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </ScrollView>

        {/* Banner */}
        <Animated.View style={styles.bannerContainer} entering={FadeIn.duration(700)}>
          <Image
            source={require("@/assets/images/theme.png")}
            style={styles.bannerImage}
          />
        </Animated.View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <Animated.View style={styles.gridContainer} entering={FadeIn.duration(700)}>
          <Link href="/explore" asChild>
            <TouchableOpacity style={styles.gridItem}>
              <Image source={require("@/assets/images/men.jpg")} style={styles.gridImage} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>Men</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/explore" asChild>
            <TouchableOpacity style={styles.gridItem}>
              <Image source={require("@/assets/images/women.jpg")} style={styles.gridImage} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>Women</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/explore" asChild>
            <TouchableOpacity style={styles.gridItem}>
              <Image source={require("@/assets/images/kids.jpg")} style={styles.gridImage} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>Kids</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/explore" asChild>
            <TouchableOpacity style={styles.gridItem}>
              <Image source={require("@/assets/images/other.jpg")} style={styles.gridImage} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>Other</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        {/* Sellers to Watch */}
        <Text style={styles.sectionTitle}>Sellers to Watch</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sellersContainer}>
          {sellers.length > 0 ? (
            sellers.map((seller, index) => (
              <Animated.View key={index} style={styles.sellerBox} entering={FadeInUp.duration(700)}>
                <TouchableOpacity>
                  <Image source={{ uri: seller.image }} style={styles.sellerImage} />
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>{seller.name}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))
          ) : (
            <Text style={styles.noSellersText}>No sellers available</Text>
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
