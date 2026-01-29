import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppUser } from '../models/app-user';

const USER_KEY = 'AUTH_USER';

export const AuthStorage = {
  async saveUser(user: AppUser) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser(): Promise<AppUser | null> {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async clear() {
    await AsyncStorage.removeItem(USER_KEY);
  },
};
