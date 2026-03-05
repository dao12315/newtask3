// services/cart.service.ts

import { getApp } from '@react-native-firebase/app';
import {
  getDatabase,
  ref,
  get,
  push,
  set,
  update,
  remove,
  child,
  runTransaction,
} from '@react-native-firebase/database';
import { AuthStorage } from '../stores/auth.storage';

export interface CartItem {
  id?: string;
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image?: string;
  createdAt: number;
}

type AddToCartInput = Omit<CartItem, 'createdAt' | 'quantity' | 'id'>;

class CartService {
  // =====================================================
  // PRIVATE: Get UID
  // =====================================================
  private async getUid(): Promise<string> {
    const user = await AuthStorage.getUser();

    if (!user) {
      console.log('[CART] ❌ No user logged in');
      throw new Error('User not logged in');
    }

    return user.uid;
  }

  // =====================================================
  // PRIVATE: Get database instance
  // =====================================================
  private getDb() {
    return getDatabase(getApp());
  }

  // =====================================================
  // PRIVATE: Get cart ref
  // Path: cart/{uid}
  // =====================================================
  private async getCartRef() {
    const uid = await this.getUid();
    const db = this.getDb();
    return ref(db, `cart/${uid}`);
  }

  // =====================================================
  // GET ALL CART ITEMS
  // =====================================================
  async getCart(): Promise<CartItem[]> {
    const cartRef = await this.getCartRef();
    const snapshot = await get(cartRef);

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));
  }

  // =====================================================
  // ADD TO CART (Transaction safe)
  // =====================================================
  async addToCart(item: AddToCartInput) {
    const cartRef = await this.getCartRef();
    const snapshot = await get(cartRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const existingKey = Object.keys(data).find(key => {
        return (
          data[key].productId === item.productId &&
          data[key].variantId === item.variantId
        );
      });

      if (existingKey) {
        const itemRef = child(cartRef, existingKey);

        await runTransaction(itemRef, current => {
          if (current) {
            current.quantity = (current.quantity || 0) + 1;
          }
          return current;
        });

        return;
      }
    }

    // Create new item
    const newRef = push(cartRef);

    await set(newRef, {
      ...item,
      quantity: 1,
      createdAt: Date.now(),
    });
  }

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================
  async updateQuantity(itemId: string, quantity: number) {
    const cartRef = await this.getCartRef();
    const itemRef = child(cartRef, itemId);

    if (quantity <= 0) {
      await remove(itemRef);
      return;
    }

    await update(itemRef, { quantity });
  }

  // =====================================================
  // REMOVE SINGLE ITEM
  // =====================================================
  async removeItem(itemId: string) {
    const cartRef = await this.getCartRef();
    const itemRef = child(cartRef, itemId);

    await remove(itemRef);
  }

  // =====================================================
  // REMOVE MULTIPLE ITEMS
  // =====================================================
  async removeMultiple(ids: string[]) {
    const cartRef = await this.getCartRef();
    const updates: Record<string, null> = {};

    ids.forEach(id => {
      updates[id] = null;
    });

    await update(cartRef, updates);
  }

  // =====================================================
  // CLEAR CART
  // =====================================================
  async clearCart() {
    const cartRef = await this.getCartRef();
    await remove(cartRef);
  }

  // =====================================================
  // CALCULATE TOTAL
  // =====================================================
  async getCartTotal(): Promise<number> {
    const items = await this.getCart();
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}

export const cartService = new CartService();