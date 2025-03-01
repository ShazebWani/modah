import { db } from "@/config/firebaseConfig";
import { ref, set, push, get, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { ProductType, SellerType, CartItemType } from "@/types/type";

const auth = getAuth();

/** Fetch all products */
export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    const snapshot = await get(ref(db, "products"));
    if (!snapshot.exists()) {
      console.warn("No products found in Firebase");
      return [];
    }

    const productsData = snapshot.val();
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

    return Object.entries(sellersData).map(([id, sellerData]) => ({
      id,
      name: sellerData.name,
      image: sellerData.image,
      profilePic: sellerData.profilePic || "", // Ensure profilePic always exists
      location: sellerData.location || "Unknown", // Default location if missing
      rating: sellerData.rating || 0, // Default rating if missing
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

/** Fetch current user's cart items */
export const fetchCartItems = async (): Promise<CartItemType[]> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("❌ User not authenticated.");
      return [];
    }

    // Get user's cart items
    const cartSnapshot = await get(ref(db, `carts/${user.uid}/items`));

    // ✅ If the cart is empty, return an empty array instead of undefined
    if (!cartSnapshot.exists()) {
      console.log("🛒 Cart is empty for this user.");
      return [];
    }

    const cartData = cartSnapshot.val();
    console.log("🔥 Raw Cart Data:", cartData);

    // Fetch product and seller details for each cart item
    const cartItemsTemp = await Promise.all(
      Object.entries(cartData).map(async ([cartId, cartItem]: any) => {
        if (!cartItem.productId) {
          console.warn(`⚠️ Cart item ${cartId} has no productId.`);
          return null;
        }

        // Fetch product details
        const productSnapshot = await get(ref(db, `products/${cartItem.productId}`));
        if (!productSnapshot.exists()) {
          console.warn(`❌ Product with ID ${cartItem.productId} not found.`);
          return null; // Skip this product
        }

        const product: ProductType = productSnapshot.val();

        // Fetch seller details
        const sellerSnapshot = await get(ref(db, `sellers/${product.sellerId}`));
        const seller: SellerType | null = sellerSnapshot.exists() ? sellerSnapshot.val() : null;

        return {
          id: cartId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          product: {
            title: product.title,
            price: product.price,
            stock: product.stock,
            inCarts: product.inCarts,
            images: product.images,
          },
          seller: {
            profilePic: seller?.profilePic || "",
          },
        };
      })
    );

    // ✅ Remove any null values from the final cart items list
    const cartItems: CartItemType[] = cartItemsTemp.filter((item): item is CartItemType => item !== null);
    
    return cartItems;
  } catch (error) {
    console.error("❌ Error fetching cart items:", error);
    return [];
  }
};
/** Fetch "For You" products */
export const fetchForYouProducts = async (): Promise<ProductType[]> => {
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
export const fetchPopularProducts = async (): Promise<ProductType[]> => {
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

/** Remove item from cart */
export const removeFromCart = async (productId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    await remove(ref(db, `carts/${user.uid}/items/${productId}`));
    console.log(`🗑️ Item ${productId} removed from cart`);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

/** Add item to cart */
export const addToCart = async (productId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    console.error("❌ User not authenticated.");
    return;
  }

  if (!productId || typeof productId !== "string") {
    console.error(`❌ Invalid productId: ${productId}`);
    return;
  }

  console.log(`🛒 Attempting to add product ${productId} to cart...`);

  const cartRef = ref(db, `carts/${user.uid}/items/${productId}`);

  try {
    const cartSnapshot = await get(cartRef);
    if (cartSnapshot.exists()) {
      const existingQuantity = cartSnapshot.val().quantity || 1;
      await update(cartRef, { quantity: existingQuantity + 1 });
    } else {
      await set(cartRef, { productId, quantity: 1 });
    }

    console.log(`✅ Successfully added product ${productId} to cart`);
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
  }
};

