import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import Animated, { FadeIn } from "react-native-reanimated";
import { fetchForYouProducts, fetchPopularProducts } from "@/utils/firebaseDB";
import { ProductType } from "@/types/type";

const ExploreScreen = () => {
  const [forYouProducts, setForYouProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadForYouProducts();
    loadPopularProducts();
  }, []);

  /** Fetch "For You" products */
  const loadForYouProducts = async () => {
    try {
      const data = await fetchForYouProducts();
      console.log("Fetched For You Products:", data);
      setForYouProducts(Object.values(data)); // Convert object to array
    } catch (error) {
      console.error("Error loading For You products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /** Fetch "Popular This Week" products */
  const loadPopularProducts = async () => {
    try {
      const data = await fetchPopularProducts();
      console.log("Fetched Popular Products:", data);
      setPopularProducts(Object.values(data)); // Convert object to array
    } catch (error) {
      console.error("Error loading Popular products:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <View style={{ flex: 1, paddingBottom: 5 }}>
        
        {/* Popular This Week */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>Popular This Week</Text>
          <FlatList
            data={popularProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeIn.duration(500)} style={styles.itemSpacing}>
                <ProductItem item={item} index={index} productType="popular" />
              </Animated.View>
            )}
          />
        </View>

        {/* For You */}
        <View>
          <Text style={styles.sectionTitle}>For You</Text>
          <FlatList
            data={forYouProducts}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeIn.duration(500)} style={styles.itemSpacing}>
                <ProductItem item={item} index={index} productType="forYou" />
              </Animated.View>
            )}
            ListFooterComponent={<View style={{ height: 260 }} />}
          />
        </View>
      </View>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  itemSpacing: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
