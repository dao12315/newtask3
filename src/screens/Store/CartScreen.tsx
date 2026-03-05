import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { cartService, CartItem } from '../../services/cart.service';

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    const data = await cartService.getCart();
    setItems(data);
    setSelectedIds([]); // reset selection khi reload
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, []),
  );

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const updateQuantityLocal = async (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      await cartService.removeItem(itemId);
      setItems(prev => prev.filter(i => i.id !== itemId));
      setSelectedIds(prev => prev.filter(i => i !== itemId));
      return;
    }

    await cartService.updateQuantity(itemId, newQty);

    setItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity: newQty } : i)),
    );
  };

  const total = items
    .filter(item => selectedIds.includes(item.id!))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectedItems = items.filter(item => selectedIds.includes(item.id!));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>Giỏ Hàng</Text>

        {/* Nút Đơn hàng */}
        <Pressable
          style={styles.orderHistoryBtn}
          onPress={() => navigation.navigate('OrderHistoryScreen')}
        >
          <Icon name="receipt-long" size={22} color="#fff" />
        </Pressable>
      </View>

      <Text style={styles.countText}>{items.length} sản phẩm</Text>

      {items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={{ color: '#777' }}>Giỏ hàng của bạn đang trống</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id!}
          contentContainerStyle={{ paddingBottom: 160 }}
          renderItem={({ item }) => {
            const checked = selectedIds.includes(item.id!);

            return (
              <View style={styles.card}>
                {/* Checkbox */}
                <Pressable
                  style={[styles.checkbox, checked && styles.checkboxActive]}
                  onPress={() => toggleSelect(item.id!)}
                >
                  {checked && <Icon name="check" size={16} color="#fff" />}
                </Pressable>

                <Image
                  source={{
                    uri: item.image || 'https://via.placeholder.com/100',
                  }}
                  style={styles.image}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.variant}>{item.variantName}</Text>
                  <Text style={styles.price}>
                    {item.price.toLocaleString()}đ
                  </Text>

                  {/* Quantity */}
                  <View style={styles.qtyRow}>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() =>
                        updateQuantityLocal(item.id!, item.quantity - 1)
                      }
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </Pressable>

                    <Text style={styles.qtyValue}>{item.quantity}</Text>

                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() =>
                        updateQuantityLocal(item.id!, item.quantity + 1)
                      }
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <Pressable onPress={() => updateQuantityLocal(item.id!, 0)}>
                  <Icon name="close" size={20} color="#c00" />
                </Pressable>
              </View>
            );
          }}
        />
      )}

      {/* Footer */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng tiền</Text>
            <Text style={styles.totalValue}>{total.toLocaleString()}đ</Text>
          </View>

          <Pressable
            style={[
              styles.orderBtn,
              (loading || selectedIds.length === 0) && {
                opacity: 0.6,
              },
            ]}
            disabled={loading || selectedIds.length === 0}
            onPress={() =>
              navigation.navigate('PaymentScreen', {
                items: selectedItems,
                total,
              })
            }
          >
            <Text style={styles.orderText}>Đặt hàng</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },

  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backBtn: {
    position: 'absolute',
    left: 16,
    height: 80,
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  orderHistoryBtn: {
    position: 'absolute',
    right: 16,
    height: 80,
    justifyContent: 'center',
  },
  countText: {
    padding: 16,
    color: '#777',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },

  name: { fontWeight: '600' },

  variant: { color: '#990012', marginTop: 2 },

  price: {
    fontWeight: '700',
    marginTop: 6,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8dada',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: { fontSize: 18, fontWeight: '700' },

  qtyValue: { marginHorizontal: 12 },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#990012',
  },
  orderBtn: {
    backgroundColor: '#990012',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  orderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#990012',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  checkboxActive: {
    backgroundColor: '#990012',
  },
});
