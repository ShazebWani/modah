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
import { removeFromCart } from "@/utils/firebaseDB";
import { getAuth } from "firebase/auth";
import { ref, onValue, get } from "firebase/database";
import { db } from "@/config/firebaseConfig";
import { CartItemType } from "@/types/type";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Header from "@/components/Header";
import TabScreenWrapper from '@/components/TabScreenWrapper';
import { FontAwesome } from '@expo/vector-icons';

const CartScreen = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [isCartTab, setIsCartTab] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
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
                product: {
                  ...product,
                  title: product?.title, // Ensure title is included
                },
                seller: {
                  profilePic: seller?.profilePic,
                  name: seller?.name,
                },
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

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev };
      if (newSelectedItems[itemId]) {
        delete newSelectedItems[itemId];
      } else {
        newSelectedItems[itemId] = true;
      }
      return newSelectedItems;
    });
  };

  const handleDeleteItems = () => {
    if (!user) return;
    const itemsToDelete = Object.keys(selectedItems).filter((itemId) => selectedItems[itemId]);
    Alert.alert(
      "Remove Items",
      "Are you sure you want to remove the selected items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await Promise.all(itemsToDelete.map(async (itemId) => {
              await removeFromCart(itemId);
            }));
            setCartItems((prevItems) => prevItems.filter((item) => !selectedItems[item.id]));
            setSelectedItems({});
          },
        },
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + ((item.product.price || 0) * 1.05), 0)
      .toFixed(2);
  };

  return (
    <>
    <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
    <TabScreenWrapper>
    <SafeAreaView style={styles.safeContainer}>
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
      <View style={styles.container}>
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
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.cartItem,
                    isEditMode && styles.editMode,
                    selectedItems[item.id] && styles.selectedItem,
                    !isEditMode && styles.noBorder,
                  ]}
                  onPress={() => isEditMode && handleSelectItem(item.id)}
                  activeOpacity={isEditMode ? 1 : 0}
                >
                  {/* Top Row: Product Title and Seller Profile Pic */}
                  <View style={styles.topRow}>
                    <View style={styles.sellerInfo}>
                      <Image source={{ uri: item.seller.profilePic }} style={styles.sellerImage} />
                      <Text style={styles.productTitle} numberOfLines={1}>{item.product.title}</Text>
                    </View>
                  </View>

                  {/* Middle Row: Product Image, More Products Button, and Price */}
                  <View style={styles.middleRow}>
                    <View style={styles.imageContainer}>
                      <TouchableOpacity onPress={() => router.push(`/product-details/${item.productId}`)}>
                        <Image source={{ uri: item.product.images[0] }} style={styles.productImage} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.moreProductsButton}>
                        <Text style={styles.moreProductsText}>Explore More</Text>
                        <Text style={styles.moreProductsText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.leftText}>{item.product.inCarts} left</Text>
                      <Text>${(item.product.price || 0).toFixed(2)}</Text>
                      <Text style={styles.taxText}>+${((item.product.price || 0) * 0.05).toFixed(2)}</Text>
                    </View>
                  </View>

                  {/* Bottom Row: In Carts Info */}
                  <View style={styles.bottomRow}>
                    <Text style={styles.inCartsText}>{item.product.inCarts} people have this in their carts</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        ) : (
          <Text style={styles.placeholderText}>Implement Purchase Functionality Later</Text>
        )}

        {/* Checkout and Edit/Delete Buttons */}
        <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('/orders/order_purchased')}>
          <Text style={styles.checkoutText}>Checkout: ${calculateTotal()}</Text>
        </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              if (isEditMode) {
                if (Object.keys(selectedItems).length === 0) {
                  Alert.alert("No items selected", "Please select items to delete.");
                  return;
                }
                handleDeleteItems();
              } else {
                setIsEditMode(true);
              }
            }}
          >
            <FontAwesome name={isEditMode ? "trash" : "pencil"} size={24} color="white" />
          </TouchableOpacity>
          {isEditMode && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsEditMode(false);
                setSelectedItems({});
              }}
            >
              <FontAwesome name="times" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
    </TabScreenWrapper>
    </>
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
    marginTop: -10,
  },
  tabs: {
    flexDirection: "row",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 5,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.extraLightGray,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabDivider: {
    width: 1,
    backgroundColor: "#ccc",
  },
  tabText: {
    fontSize: 16,
    color: Colors.gray,
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
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  noBorder: {
    borderWidth: 0,
  },
  editMode: {
    borderColor: Colors.primary,
  },
  selectedItem: {
    backgroundColor: Colors.lightPurple,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  sellerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  leftText: {
    color: Colors.primary,
    fontSize: 14,
    marginBottom: 10,
  },
  taxText: {
    color: Colors.gray,
    fontSize: 12,
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  moreProductsButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderStyle: "dashed",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  moreProductsText: {
    fontSize: 12,
    textAlign: "center",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inCartsText: {
    fontSize: 12,
    color: "gray",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  editButton: {
    backgroundColor: Colors.lightPurple,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default CartScreen;
