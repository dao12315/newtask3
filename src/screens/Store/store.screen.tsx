import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeService } from '../../services/store.service';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { cartService } from '../../services/cart.service';

interface Product {
  id: string;
  name: string;
  images: string[];
  variants: {
    id: string;
    name: string;
    price: number;
  }[];
  isNew?: boolean;
}

const StoreScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [cartCount, setCartCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      cartService.getCart().then(items => {
        setCartCount(items.length);
      });
    }, []),
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storeService.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);
  const renderItem = ({ item }: { item: Product }) => {
    const prices =
      item.variants?.map(v => Number(v.price)).filter(p => !isNaN(p)) || [];

    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const isMultiple = prices.length > 1;

    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            productId: item.id,
          })
        }
      >
        {item.isNew && (
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>Mới</Text>
          </View>
        )}

        <Image
          source={{
            uri: item.images?.[0] || 'https://via.placeholder.com/100',
          }}
          style={styles.image}
        />

        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {prices.length === 0
              ? 'Liên hệ'
              : isMultiple
              ? `${minPrice.toLocaleString()}đ - ${maxPrice.toLocaleString()}đ`
              : `${minPrice.toLocaleString()}đ`}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Title */}
        <Text style={styles.headerTitle}>Cửa Hàng</Text>

        {/* Cart Icon */}
        <Pressable
          style={styles.cartButton}
          onPress={() => navigation.navigate('CartScreen')}
          hitSlop={10}
        >
          <Icon name="shopping-cart" size={26} color="#fff" />
        </Pressable>
      </View>

      {/* Product list */}
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Đang tải...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 16,
            gap: 10,
          }}
          contentContainerStyle={{
            padding: 16,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },

  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  cartButton: {
    position: 'absolute',
    right: 16,
    height: 80,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#ffdede',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
    elevation: 3,
    marginHorizontal: 4,
  },

  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  price: {
    fontSize: 12,
    fontWeight: '700',
    marginRight: 6,
  },

  oldPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    color: '#555',
  },

  deleteBtn: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },

  ribbon: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#990012',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 2,
  },

  ribbonText: {
    color: '#fff',
    fontSize: 12,
  },

  bottomBar: {
    height: 70,
    backgroundColor: '#ffe5e5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tabItem: {
    alignItems: 'center',
  },

  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#990012',
  },

  callWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    top: -25,
  },

  callButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
