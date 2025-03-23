import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { fetchCartItems, removeFromCart } from "@/utils/firebaseDB";
import { getAuth } from "firebase/auth";
import { ref, onValue, get } from "firebase/database";
import { db } from "@/config/firebaseConfig";
import { CartItemType } from "@/types/type";
import { useRouter } from "expo-router";

const CartScreen = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [isCartTab, setIsCartTab] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      loadCartItems();
      const cartRef = ref(db, `carts/${user.uid}/items`);
      const unsubscribe = onValue(cartRef, async (snapshot) => {
        if (snapshot.exists()) {
          const cartData = snapshot.val();
          const updatedCartItems = await Promise.all(
            Object.entries(cartData).map(async ([cartId, cartItem]: any) => {
              const productSnapshot = await get(ref(db, `products/${cartItem.productId}`));
              const product = productSnapshot.exists() ? productSnapshot.val() : null;

              const sellerSnapshot = await get(ref(db, `sellers/${product?.sellerId}`));
              const seller = sellerSnapshot.exists() ? sellerSnapshot.val() : null;

              return {
                id: cartId,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                product,
                seller,
              };
            })
          );
          setCartItems(updatedCartItems);
        } else {
          setCartItems([]);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const loadCartItems = async () => {
    if (!user) return;
    const data = await fetchCartItems();
    setCartItems(data);
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleDeleteItem = (itemId: string) => {
    if (!user) return;
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await removeFromCart(itemId);
            loadCartItems();
          },
        },
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems[item.id])
      .reduce((acc, item) => acc + ((item.product.price || 0) * 1.05), 0)
      .toFixed(2);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* New Tab UI */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabButton, isCartTab && styles.activeTab]}
            onPress={() => setIsCartTab(true)}
          >
            <Text style={[styles.tabText, isCartTab && styles.activeText]}>Cart</Text>
          </TouchableOpacity>

          <View style={styles.tabDivider} />

          <TouchableOpacity
            style={[styles.tabButton, !isCartTab && styles.activeTab]}
            onPress={() => setIsCartTab(false)}
          >
            <Text style={[styles.tabText, !isCartTab && styles.activeText]}>Purchases</Text>
          </TouchableOpacity>
        </View>

        {isCartTab ? (
          cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Looks like your cart is empty!</Text>
              <TouchableOpacity onPress={() => router.replace("/(tabs)/explore")}>
                <Text style={styles.exploreText}>Explore Modah</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  {/* Seller Profile Pic */}
                  {item.seller && (
                    <Image source={{ uri: item.seller.profilePic }} style={styles.sellerImage} />
                  )}

                  {/* Price & Tax */}
                  {item.product && (
                    <View style={styles.priceContainer}>
                      <Text>{item.product.inCarts} left</Text>
                      <Text>${(item.product.price || 0).toFixed(2)}</Text>
                      <Text style={styles.taxText}>+${((item.product.price || 0) * 0.05).toFixed(2)}</Text>
                    </View>
                  )}

                  {/* Product Image */}
                  {item.product && (
                    <Image source={{ uri: item.product.images[0] }} style={styles.productImage} />
                  )}

                  {/* Placeholder for Seller Page */}
                  <TouchableOpacity style={styles.sellerButton}>
                    <Text style={styles.plusText}>+</Text>
                  </TouchableOpacity>

                  {/* Select & Delete */}
                  <View>
                    <Checkbox
                      status={selectedItems[item.id] ? "checked" : "unchecked"}
                      onPress={() => handleSelectItem(item.id)}
                    />
                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                      <Text style={styles.deleteText}>❌</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          )
        ) : (
          <Text style={styles.placeholderText}>Implement Purchase Functionality Later</Text>
        )}

        {/* Checkout Button */}
        {Object.values(selectedItems).some(Boolean) && (
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout: ${calculateTotal()}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  tabs: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  activeTab: {
    backgroundColor: "#000",
  },
  tabDivider: {
    width: 1,
    backgroundColor: "#ccc",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
  exploreText: {
    fontSize: 18,
    color: "blue",
    marginTop: 5,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sellerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  priceContainer: {
    flex: 1,
  },
  taxText: {
    color: "gray",
    fontSize: 12,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  sellerButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  plusText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deleteText: {
    color: "red",
    fontSize: 20,
  },
  checkoutButton: {
    backgroundColor: "green",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  placeholderText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default CartScreen;
