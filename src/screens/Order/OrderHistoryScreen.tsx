import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getApp } from '@react-native-firebase/app';
import { getDatabase, ref, get, remove } from '@react-native-firebase/database';
import { AuthStorage } from '../../stores/auth.storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const OrderHistoryScreen = () => {
  const navigation = useNavigation<any>();

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const user = await AuthStorage.getUser();
    if (!user) return;

    const db = getDatabase(getApp());
    const snapshot = await get(ref(db, `orders/${user.uid}`));

    if (!snapshot.exists()) {
      setOrders([]);
      return;
    }

    const data = snapshot.val();

    const list = Object.keys(data)
      .map(key => ({
        id: key,
        ...data[key],
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    setOrders(list);
  };

  const handleDelete = async (id: string) => {
    const user = await AuthStorage.getUser();
    if (!user) return;

    Alert.alert('Xác nhận', 'Bạn muốn xoá đơn này?', [
      { text: 'Huỷ' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          const db = getDatabase(getApp());
          await remove(ref(db, `orders/${user.uid}/${id}`));
          loadOrders();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={26} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>Đơn mua</Text>
      </View>
      <View style={styles.container1}>
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{new Date(item.createdAt).toLocaleString()}</Text>

              <Text style={styles.total}>
                Tổng: {item.total.toLocaleString()}đ
              </Text>

              <Text style={styles.status}>Trạng thái: {item.status}</Text>

              <Pressable
                style={styles.deleteBtn}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={{ color: '#fff' }}>Xoá đơn</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  container1: { flex: 1, backgroundColor: '#fff', padding: 16 },
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
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  total: { fontWeight: '700', marginTop: 6 },
  status: { marginTop: 4, color: '#990012' },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: '#990012',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
});
