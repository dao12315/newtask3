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
} from '@react-native-firebase/database';
import { AuthStorage } from '../stores/auth.storage';

export interface Address {
  id?: string;
  label: string;
  phone: string;
  address: string;
  isDefault: boolean;
  createdAt: number;
}

class AddressService {
  // =====================================================
  // PRIVATE: Get current user uid
  // =====================================================
  private async getUid(): Promise<string> {
    const user = await AuthStorage.getUser();
    if (!user) throw new Error('User not logged in');
    return user.uid;
  }

  // =====================================================
  // PRIVATE: Get database instance
  // =====================================================
  private getDb() {
    return getDatabase(getApp());
  }

  // =====================================================
  // PRIVATE: Get user address ref
  // =====================================================
  private async getRef() {
    const uid = await this.getUid();
    const db = this.getDb();
    return ref(db, `users/${uid}/addresses`);
  }

  // =====================================================
  // GET ALL ADDRESSES
  // =====================================================
  async getAddresses(): Promise<Address[]> {
    try {
      const addressRef = await this.getRef();
      const snapshot = await get(addressRef);

      if (!snapshot.exists()) return [];

      const data = snapshot.val();

      return Object.keys(data)
        .map(key => ({
          id: key,
          ...data[key],
        }))
        .sort((a, b) => b.createdAt - a.createdAt); // newest first
    } catch (error) {
      console.log('getAddresses error:', error);
      return [];
    }
  }

  // =====================================================
  // ADD ADDRESS
  // =====================================================
  async addAddress(input: Omit<Address, 'id' | 'createdAt'>) {
    try {
      const addressRef = await this.getRef();

      // If new address is default -> remove old default
      if (input.isDefault) {
        const snapshot = await get(addressRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const updates: Record<string, any> = {};

          Object.keys(data).forEach(key => {
            if (data[key].isDefault) {
              updates[`${key}/isDefault`] = false;
            }
          });

          if (Object.keys(updates).length > 0) {
            await update(addressRef, updates);
          }
        }
      }

      // Create new push ref
      const newAddressRef = push(addressRef);

      await set(newAddressRef, {
        ...input,
        isDefault: input.isDefault ?? false,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.log('addAddress error:', error);
      throw error;
    }
  }

  // =====================================================
  // REMOVE ADDRESS
  // =====================================================
  async removeAddress(id: string) {
    try {
      const addressRef = await this.getRef();
      const childRef = child(addressRef, id);

      await remove(childRef);
    } catch (error) {
      console.log('removeAddress error:', error);
      throw error;
    }
  }

  // =====================================================
  // SET DEFAULT ADDRESS
  // =====================================================
  async setDefault(id: string) {
    try {
      const addressRef = await this.getRef();
      const snapshot = await get(addressRef);

      if (!snapshot.exists()) return;

      const data = snapshot.val();
      const updates: Record<string, any> = {};

      Object.keys(data).forEach(key => {
        updates[`${key}/isDefault`] = key === id;
      });

      await update(addressRef, updates);
    } catch (error) {
      console.log('setDefault error:', error);
      throw error;
    }
  }

  // =====================================================
  // UPDATE ADDRESS
  // =====================================================
  async updateAddress(id: string, input: Partial<Address>) {
    try {
      const addressRef = await this.getRef();
      const childRef = child(addressRef, id);

      await update(childRef, input);
    } catch (error) {
      console.log('updateAddress error:', error);
      throw error;
    }
  }
}

export const addressService = new AddressService();