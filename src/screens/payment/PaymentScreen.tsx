import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getApp } from '@react-native-firebase/app';
import { getDatabase, ref, push, set } from '@react-native-firebase/database';
import { cartService } from '../../services/cart.service';
import { AuthStorage } from '../../stores/auth.storage';
import { Address, addressService } from '../../services/address.service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { items, total } = route.params;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  // Load address list
  useEffect(() => {
    const load = async () => {
      const data = await addressService.getAddresses();
      setAddresses(data);

      const defaultAddr = data.find(a => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id!);
      }
    };

    load();
  }, []);

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      Alert.alert('Thông báo', 'Vui lòng chọn địa chỉ');
      return;
    }

    try {
      setLoading(true);

      const selectedAddress = addresses.find(a => a.id === selectedAddressId);
      if (!selectedAddress) return;

      const user = await AuthStorage.getUser();
      if (!user) return;

      const db = getDatabase(getApp());
      const orderRef = push(ref(db, `orders/${user.uid}`));

      await set(orderRef, {
        items,
        total,
        address: selectedAddress,
        paymentMethod: 'COD',
        status: 'pending',
        createdAt: Date.now(),
      });

      // 🔥 xoá sản phẩm đã chọn
      const selectedIds = items.map((item: any) => item.id);
      await cartService.removeMultiple(selectedIds);

      Alert.alert('Thành công', 'Đặt hàng thành công');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xoá địa chỉ này?', [
      { text: 'Huỷ' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          await addressService.removeAddress(id);

          const updated = addresses.filter(a => a.id !== id);
          setAddresses(updated);

          if (selectedAddressId === id) {
            setSelectedAddressId(null);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={26} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>Thông Tin thanh toán</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container1}>
        {/* Địa chỉ */}
        <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>

        {addresses.length === 0 && (
          <Text style={{ color: '#777' }}>Bạn chưa có địa chỉ nào</Text>
        )}

        {addresses.map(item => {
          const selected = item.id === selectedAddressId;

          return (
            <Pressable
              key={item.id}
              style={[styles.addressCard, selected && styles.addressSelected]}
              onPress={() => setSelectedAddressId(item.id!)}
            >
              <View style={styles.radio}>
                {selected && <View style={styles.radioInner} />}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.addressLabel}>{item.label}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.address}</Text>
              </View>

              <Pressable onPress={() => handleDeleteAddress(item.id!)}>
                <Icon name="delete" size={22} color="red" />
              </Pressable>
            </Pressable>
          );
        })}

        <Pressable onPress={() => navigation.navigate('AddAddressScreen')}>
          <Text style={styles.addAddress}>+ Thêm địa chỉ mới</Text>
        </Pressable>

        {/* Payment */}
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

        <View style={styles.codBox}>
          <Text>Thanh toán khi nhận hàng (COD)</Text>
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalValue}>{total.toLocaleString()}đ</Text>
        </View>

        {/* Button */}
        <Pressable
          style={[
            styles.btn,
            (loading || !selectedAddressId) && {
              opacity: 0.6,
            },
          ]}
          disabled={loading || !selectedAddressId}
          onPress={handleCheckout}
        >
          <Text style={styles.btnText}>
            {loading ? 'Đang xử lý...' : 'Đặt hàng'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
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

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  label: {
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  codBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#990012',
    borderRadius: 10,
    backgroundColor: '#f9f2f2',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
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

  btn: {
    marginTop: 40,
    backgroundColor: '#990012',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },

  addressCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 12,
  },

  addressSelected: {
    borderColor: '#990012',
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#990012',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#990012',
  },

  addAddress: {
    color: '#990012',
    marginTop: 10,
    fontWeight: '600',
  },
  addressLabel: {
    fontWeight: '700',
    marginBottom: 4,
    fontSize: 15,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
