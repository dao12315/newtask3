import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../services/todo.service';

const USER_KEY = 'AUTH_USER';

export const AuthStorage = {
  async saveUser(user: User) {
    console.log('📥 SAVE USER:', user);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser() {
    const raw = await AsyncStorage.getItem(USER_KEY);
    console.log('📤 GET USER RAW:', raw);
    return raw ? JSON.parse(raw) : null;
  },

  async clear() {
    console.log('🗑 CLEAR USER STORAGE');
    await AsyncStorage.removeItem(USER_KEY);
  },
};
