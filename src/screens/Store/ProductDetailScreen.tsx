import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { storeService, Product } from '../../services/store.service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { cartService } from '../../services/cart.service';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('window');

type ParamList = {
  ProductDetail: {
    productId: string;
  };
};

const ProductDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const route = useRoute<RouteProp<ParamList, 'ProductDetail'>>();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;

    try {
      setAdding(true);

      await cartService.addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: product.images?.[0] ?? '',
      });

      navigation.navigate('CartScreen');
    } catch (error) {
      console.log('Add to cart error:', error);
    } finally {
      setAdding(false);
    }
  };

  // Load product theo id
  useEffect(() => {
    const loadProduct = async () => {
      const products = await storeService.getProducts();
      const found = products.find(p => p.id === productId) || null;

      setProduct(found);

      if (found?.variants?.length) {
        setSelectedVariantId(found.variants[0].id);
      }

      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  const selectedVariant =
    product?.variants.find(v => v.id === selectedVariantId) || null;

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#c00" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Không tìm thấy sản phẩm</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView overScrollMode="never" stickyHeaderIndices={[0]}>
        {/* Header */}
        <View>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={10}
            >
              <Icon name="arrow-back" size={30} color="#fff" />
            </Pressable>
            <Text style={styles.headerTitle}>Thông Tin</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.productName}>{product.name}</Text>

          {/* Image slider */}
          <FlatList
            data={product.images || []}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setActiveIndex(index);
            }}
          />

          {/* Indicator */}
          <View style={styles.dotContainer}>
            {product.images?.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {selectedVariant
                ? `${selectedVariant.price.toLocaleString()}đ`
                : 'Liên hệ'}
            </Text>
          </View>

          {/* Variant options */}
          <Text style={styles.sectionTitle}>Tùy chọn</Text>

          <View style={styles.variantRow}>
            {product.variants.map(variant => {
              const isActive = variant.id === selectedVariantId;

              return (
                <Pressable
                  key={variant.id}
                  onPress={() => setSelectedVariantId(variant.id)}
                  style={[
                    styles.variantBtn,
                    isActive && styles.variantBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.variantText,
                      isActive && styles.variantTextActive,
                    ]}
                  >
                    {variant.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Giới thiệu sản phẩm</Text>

          <Text style={styles.description}>
            Sản phẩm chất lượng cao, an toàn và tiện lợi khi sử dụng.
          </Text>

          {/* Order button */}
          <Pressable
            style={[styles.orderBtn, adding && { opacity: 0.7 }]}
            disabled={adding}
            onPress={handleAddToCart}
          >
            {adding ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.orderText}>Đặt hàng</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    padding: 16,
  },

  productName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    height: 80,
    justifyContent: 'center',
  },
  image: {
    width: width - 32,
    height: 220,
    borderRadius: 12,
    resizeMode: 'cover',
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#990012',
  },

  priceContainer: {
    marginTop: 12,
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },

  variantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 👈 cho phép xuống dòng
    gap: 10,
  },

  variantBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#990012',
  },

  variantBtnActive: {
    backgroundColor: '#990012',
  },

  variantText: {
    color: '#990012',
  },

  variantTextActive: {
    color: '#fff',
  },

  description: {
    color: '#444',
    lineHeight: 20,
  },

  orderBtn: {
    backgroundColor: '#990012',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },

  orderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
