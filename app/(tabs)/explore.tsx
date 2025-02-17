import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "@/types/type";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import Animated, { FadeIn } from "react-native-reanimated";

const ExploreScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts();
    getPopularProducts();
  }, []);

  const getProducts = async () => {
    const LOCAL_IP = "10.91.58.228";
    const URL = `http://${LOCAL_IP}:8000/products`;
    const response = await axios.get(URL);

    setProducts(response.data);
    setIsLoading(false);
  };

  const getPopularProducts = async () => {
    const LOCAL_IP = "10.91.58.228";
    const URL = `http://${LOCAL_IP}:8000/saleProducts`;
    const response = await axios.get(URL);

    setPopularProducts(response.data);
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
          <View style={styles.forYouContainer}></View>
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
  forYouContainer: {
    flex: 1,
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
},
});
