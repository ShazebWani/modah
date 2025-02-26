import { db } from "@/config/firebaseConfig";
import { ref, set, push, get, remove, update } from "firebase/database";

// Fetch regular products
export const fetchProducts = async () => {
    try {
      const snapshot = await get(ref(db, "products"));
      //console.log("Fetched Products:", snapshot.val()); // Debugging
      return snapshot.exists() ? Object.values(snapshot.val()) : [];
    } catch (error) {
      //console.error("Error fetching products:", error);
      return [];
    }
  };
// Add a new product
export const addProduct = async (product: any) => {
  const newProductRef = push(ref(db, "products"));
  await set(newProductRef, product);
};

// Update a product
export const updateProduct = async (productId: string, updatedData: any) => {
  await update(ref(db, `products/${productId}`), updatedData);
};

// Delete a product
export const deleteProduct = async (productId: string) => {
  await remove(ref(db, `products/${productId}`));
};

// Fetch all sellers
export const fetchSellers = async () => {
    try {
      const snapshot = await get(ref(db, "sellers"));
      //console.log("Raw Firebase Data (Sellers):", snapshot.val()); // Debugging
  
      if (snapshot.exists()) {
        return Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...(value as object),
        }));
      }
      return [];
    } catch (error) {
      //console.error("Error fetching sellers:", error);
      return [];
    }
  };
  // Fetch sale products
  export const fetchSaleProducts = async () => {
    try {
      const snapshot = await get(ref(db, "saleProducts"));
      //console.log("Fetched Sale Products:", snapshot.val()); // Debugging
      return snapshot.exists() ? Object.values(snapshot.val()) : [];
    } catch (error) {
      //console.error("Error fetching sale products:", error);
      return [];
    }
  };

  // Fetch product details by ID
export const fetchProductDetails = async (id: string, productType: string) => {
    try {
      const path = productType === "sale" ? `saleProducts/${id}` : `products/${id}`;
      const snapshot = await get(ref(db, path));
  
      //console.log(`Fetched Product (${id}):`, snapshot.val()); // Debugging
  
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      //console.error("Error fetching product:", error);
      return null;
    }
  };

  // Fetch product notifications
  export const fetchNotifications = async () => {
    try {
      const snapshot = await get(ref(db, "notifications"));
  
      if (!snapshot.exists()) {
        console.error("No notifications found in Firebase.");
        return [];
      }
  
      const data = snapshot.val();
      const notificationsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
  
      console.log("Final Notifications Data:", notificationsArray);
      return notificationsArray;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };
  
  // Fetch product notifications
  export const fetchCartItems = async () => {
    try {
      const snapshot = await get(ref(db, "cart"));
  
      if (!snapshot.exists()) {
        console.error("No cart items found in Firebase.");
        return [];
      }
  
      const data = snapshot.val();
      const cartArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
  
      console.log("Final Cart Data:", cartArray);
      return cartArray;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };