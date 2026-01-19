import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../services/todo.service';

const USER_KEY = 'AUTH_USER';

export const AuthStorage = {
  async saveUser(user: User) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser() {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async clear() {
    await AsyncStorage.removeItem(USER_KEY);
  },
};
