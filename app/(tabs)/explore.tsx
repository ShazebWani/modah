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
import { fetchProducts, fetchSaleProducts } from "@/utils/firebaseDB";

const ExploreScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProducts();
    loadPopularProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    console.log("Final Fetched Products:", data);
    setProducts(data);
    setIsLoading(false);
  };

  const loadPopularProducts = async () => {
    const data = await fetchSaleProducts();
    console.log("Final Fetched Sale Products:", data);
    setPopularProducts(data);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
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
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeIn.duration(500)} style={styles.itemSpacing}>
                <ProductItem item={item} index={index} productType="sale" />
              </Animated.View>
            )}
          />
        </View>

        {/* For You */}
        <View>
          <Text style={styles.sectionTitle}>For You</Text>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeIn.duration(500)} style={styles.itemSpacing}>
                <ProductItem item={item} index={index} productType="regular" />
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
