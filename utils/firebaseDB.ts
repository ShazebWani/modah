import { db } from "@/config/firebaseConfig";
import { ref, set, push, get, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { ProductType, SellerType } from "@/types/type";

const auth = getAuth();

/** Fetch all products */
export const fetchProducts = async () => {
  try {
    const snapshot = await get(ref(db, "products"));
    if (!snapshot.exists()) {
      console.log("No products found in Firebase");
      return [];
    }

    const productsData = snapshot.val();
    console.log("🔥 Raw Products from Firebase:", productsData);

    return Object.keys(productsData).map((key) => ({
      id: key,
      ...productsData[key],
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


/** Add a new product */
export const addProduct = async (product: ProductType): Promise<void> => {
  const newProductRef = push(ref(db, "products"));
  await set(newProductRef, product);
};

/** Update an existing product */
export const updateProduct = async (productId: string, updatedData: Partial<ProductType>): Promise<void> => {
  await update(ref(db, `products/${productId}`), updatedData);
};

/** Delete a product */
export const deleteProduct = async (productId: string): Promise<void> => {
  await remove(ref(db, `products/${productId}`));
};

/** Fetch all sellers */
export const fetchSellers = async (): Promise<SellerType[]> => {
  try {
    const snapshot = await get(ref(db, "sellers"));
    if (!snapshot.exists()) return [];

    const sellersData = snapshot.val() as Record<string, SellerType>;
    
    return Object.entries(sellersData).map(([id, seller]) => ({
      ...seller,
      id,
    }));
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return [];
  }
};


/** Fetch product details by ID */
export const fetchProductDetails = async (id: string): Promise<ProductType | null> => {
  try {
    const snapshot = await get(ref(db, `products/${id}`));
    return snapshot.exists() ? (snapshot.val() as ProductType) : null;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

/** Fetch all notifications */
export const fetchNotifications = async (): Promise<Record<string, unknown>> => {
  try {
    const snapshot = await get(ref(db, "notifications"));
    return snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {};
  }
};

/** Fetch current user's cart items */
export const fetchCartItems = async (): Promise<Record<string, unknown>> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated.");
      return {};
    }

    const snapshot = await get(ref(db, `carts/${user.uid}/items`));
    return snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return {};
  }
};

/** Fetch "For You" products */
export const fetchForYouProducts = async () => {
  try {
    const snapshot = await get(ref(db, "products"));
    if (!snapshot.exists()) return [];
    
    const allProducts = snapshot.val();
    return Object.keys(allProducts)
      .filter((key) => allProducts[key].forYou === true)
      .map((key) => ({
        id: key,
        ...allProducts[key],
      }));
  } catch (error) {
    console.error("Error fetching For You products:", error);
    return [];
  }
};


/** Fetch "Popular This Week" products */
export const fetchPopularProducts = async () => {
  try {
    const snapshot = await get(ref(db, "products"));
    if (!snapshot.exists()) return [];
    
    const allProducts = snapshot.val();
    return Object.keys(allProducts)
      .filter((key) => allProducts[key].popular === true)
      .map((key) => ({
        id: key,
        ...allProducts[key],
      }));
  } catch (error) {
    console.error("Error fetching Popular This Week products:", error);
    return [];
  }
};

