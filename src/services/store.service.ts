// services/store.service.ts

import { getApp } from '@react-native-firebase/app';
import { getDatabase, ref, get } from '@react-native-firebase/database';

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  stock?: number;
  status?: string;
}

export interface Product {
  id: string;
  name: string;
  images: string[];
  variants: ProductVariant[];
  isNew?: boolean;
}

class StoreService {
  // =====================================================
  // PRIVATE: Get database instance
  // =====================================================
  private getDb() {
    return getDatabase(getApp());
  }

  // =====================================================
  // GET ALL PRODUCTS + VARIANTS
  // =====================================================
  async getProducts(): Promise<Product[]> {
    try {
      const db = this.getDb();

      // Fetch song song products + variants
      const [productSnapshot, variantSnapshot] = await Promise.all([
        get(ref(db, 'products')),
        get(ref(db, 'product_variants')),
      ]);

      if (!productSnapshot.exists()) return [];

      const productsData = productSnapshot.val() || {};
      const variantsData = variantSnapshot.exists()
        ? variantSnapshot.val()
        : {};

      // =====================================================
      // Convert variants object → array + sanitize data
      // =====================================================
      const variantsArray: ProductVariant[] = Object.keys(variantsData)
        .map(key => ({
          id: key,
          ...variantsData[key],
          price: Number(variantsData[key]?.price),
        }))
        .filter(
          v =>
            v.productId &&
            typeof v.price === 'number' &&
            !isNaN(v.price),
        );

      // =====================================================
      // Group variants theo productId
      // =====================================================
      const variantMap: Record<string, ProductVariant[]> = {};

      variantsArray.forEach(variant => {
        if (!variantMap[variant.productId]) {
          variantMap[variant.productId] = [];
        }
        variantMap[variant.productId].push(variant);
      });

      // =====================================================
      // Merge products + variants
      // =====================================================
      const result: Product[] = Object.keys(productsData)
        .map(key => ({
          id: key,
          ...productsData[key],
          images: productsData[key]?.images || [],
          variants: variantMap[key] || [],
        }))
        .filter(product => product.variants.length > 0); 
        // Loại bỏ product không có variant

      return result;
    } catch (error) {
      console.log('Get products error:', error);
      return [];
    }
  }
}

export const storeService = new StoreService();