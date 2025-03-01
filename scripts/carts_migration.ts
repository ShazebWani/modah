import { ref, get, set } from "firebase/database";
import { db } from "../utils/firebaseDB"; // Ensure this path is correct

const migrateCarts = async () => {
  const cartsRef = ref(db, "carts");
  const snapshot = await get(cartsRef);

  if (!snapshot.exists()) {
    console.error("❌ No carts found.");
    return;
  }

  const oldCarts = snapshot.val();
  const updates: { [key: string]: any } = {};

  for (const userId in oldCarts) {
    const userCart = oldCarts[userId];
    const newItems: { [key: string]: any } = {};

    for (const productId in userCart.items) {
      // Convert numeric product ID to Firebase-friendly format
      const newProductId = `product_${productId}`;
      newItems[newProductId] = { ...userCart.items[productId] };
    }

    // Keep the cart under the same user ID but update product IDs
    updates[`carts/${userId}/items`] = newItems;
    console.log(`✅ Migrated cart for user: ${userId}`);
  }

  await set(ref(db), updates);
  console.log("🚀 Cart migration complete!");
};

migrateCarts();
