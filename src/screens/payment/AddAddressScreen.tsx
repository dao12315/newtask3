import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addressService } from '../../services/address.service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddAddressScreen = () => {
  const navigation = useNavigation<any>();

  const [label, setLabel] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!label.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);

      await addressService.addAddress({
        label,
        phone,
        address,
        isDefault,
      });

      Alert.alert('Thành công', 'Đã thêm địa chỉ');

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể thêm địa chỉ');
    } finally {
      setLoading(false);
    }
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

        <Text style={styles.headerTitle}>Chọn địa chỉ</Text>
      </View>

      <Text style={styles.label}>Loại địa chỉ</Text>
      <TextInput
        placeholder="Ví dụ: Nhà riêng / Văn phòng"
        value={label}
        onChangeText={setLabel}
        style={styles.input}
      />

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        placeholder="Nhập địa chỉ chi tiết"
        value={address}
        onChangeText={setAddress}
        style={[styles.input, { minHeight: 80 }]}
        multiline
      />

      {/* Default toggle (chỉ lưu true/false, service của bạn chưa xử lý default logic) */}
      <Pressable
        style={styles.defaultRow}
        onPress={() => setIsDefault(prev => !prev)}
      >
        <View style={[styles.checkbox, isDefault && styles.checked]} />
        <Text>Đặt làm địa chỉ mặc định</Text>
      </Pressable>

      <Pressable
        style={[styles.btn, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={handleSave}
      >
        <Text style={styles.btnText}>
          {loading ? 'Đang lưu...' : 'Lưu địa chỉ'}
        </Text>
      </Pressable>
    </View>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
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
  },

  defaultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#990012',
    marginRight: 10,
    borderRadius: 4,
  },

  checked: {
    backgroundColor: '#990012',
  },

  btn: {
    marginTop: 40,
    backgroundColor: '#990012',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
