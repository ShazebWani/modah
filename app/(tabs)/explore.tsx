import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import Animated, { FadeIn } from "react-native-reanimated";
import { fetchForYouProducts, fetchPopularProducts, fetchProducts } from "@/utils/firebaseDB";
import { ProductType } from "@/types/type";

const ExploreScreen = () => {
  const { category } = useLocalSearchParams(); // Get category from URL

  const [products, setProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  /** Loads products based on category filter or default */
  const loadProducts = async () => {
    setIsLoading(true);

    if (category) {
      // Load all products and filter by category
      const allProducts = await fetchProducts();
      const filteredProducts = allProducts.filter(
        (product) => product.mainCategory === category
      );

      // Load popular products and filter by category
      const allPopular = await fetchPopularProducts();
      const filteredPopular = allPopular.filter(
        (product) => product.mainCategory === category
      );

      setProducts(filteredProducts);
      setPopularProducts(filteredPopular);
    } else {
      // Load For You & Popular without filtering
      const [forYou, popular] = await Promise.all([
        fetchForYouProducts(),
        fetchPopularProducts(),
      ]);

      setProducts(forYou);
      setPopularProducts(popular);
    }

    setIsLoading(false);
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
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeIn.duration(500)} style={styles.itemSpacing}>
                <ProductItem item={item} index={index} productType="popular" />
              </Animated.View>
            )}
          />
        </View>

      {/* For You OR Category Filtered Products */}
      <View>
          <Text style={styles.sectionTitle}>
            {category ? `${category} Collection` : "For You"}
          </Text>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id}
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
