import {
  getDatabase,
  ref,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  get,
} from '@react-native-firebase/database';
import { getApp } from '@react-native-firebase/app';

import { comparePassword, hasPassword } from '../utils/encoding.password';

export type User = {
  uid: string;
  name: string | null;
  password: string;
  email: string | null;
  phoneNumber: number;
  dateOfBirth: number;
  createdAt: number;
  updatedAt: number;
  status: boolean;
  avatar: string | null;
};

export class UserService {
  private static db = getDatabase(getApp());

  // ================= CREATE =================
  static async create(
    uid: string,
    name: string,
    password: string,
    email: string,
    phoneNumber: number,
    dateOfBirth: number,
    avatar: string,
  ): Promise<string> {
    const hashedPassword = await hasPassword(password);
    const now = Date.now();

    await set(ref(this.db, `users/${uid}`), {
      uid,
      name,
      password: hashedPassword,
      email: email.trim().toLowerCase(),
      phoneNumber,
      dateOfBirth,
      createdAt: now,
      updatedAt: now,
      status: true,
      avatar,
    });

    return uid;
  }

  // ================= CHECK EMAIL =================
  static async isEmailExists(email: string): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase();

    const q = query(
      ref(this.db, 'users'),
      orderByChild('email'),
      equalTo(normalizedEmail),
    );

    const snapshot = await get(q);
    return snapshot.exists();
  }

  // ================= GET BY EMAIL =================
  static async getByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();

    const q = query(
      ref(this.db, 'users'),
      orderByChild('email'),
      equalTo(normalizedEmail),
    );

    const snapshot = await get(q);
    if (!snapshot.exists()) return null;

    const data = snapshot.val();
    const userId = Object.keys(data)[0];
    const u = data[userId];

    return {
      uid: userId,
      name: u.name ?? null,
      email: u.email ?? null,
      avatar: u.avatar ?? null,
      password: u.password,
      phoneNumber: u.phoneNumber,
      dateOfBirth: u.dateOfBirth,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      status: u.status ?? true,
    };
  }

  // ================= UPDATE =================
  static async update(
    userId: string,
    data: Partial<{
      name: string | null;
      email: string | null;
      phoneNumber: number | null;
      dateOfBirth: number | null;
      avatar: string | null;
      status: boolean;
    }>,
    userStore: any,
  ): Promise<void> {
    if (!userId) throw new Error('USER_ID_REQUIRED');

    await update(ref(this.db, `users/${userId}`), {
      ...data,
      updatedAt: Date.now(),
    });

    const { name, phoneNumber, dateOfBirth } = data;

    userStore.setProfile({
      name,
      phoneNumber,
      dateOfBirth,
    });
  }

  // ================= LOGIN =================
  static async login(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();

    const q = query(
      ref(this.db, 'users'),
      orderByChild('email'),
      equalTo(normalizedEmail),
    );

    const snapshot = await get(q);
    if (!snapshot.exists()) {
      throw new Error('EMAIL_NOT_FOUND');
    }

    const data = snapshot.val();
    const userId = Object.keys(data)[0];
    const user = data[userId];

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('INVALID_PASSWORD');
    if (user.status === false) throw new Error('USER_DISABLED');

    return {
      uid: userId,
      name: user.name ?? null,
      email: user.email ?? null,
      avatar: user.avatar ?? null,
      password: user.password,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      status: user.status,
    };
  }
}

// ================= UTILS =================
export function isValidEmail(email: string): boolean {
  if (!email) return false;

  const value = email.trim();
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  return regex.test(value);
}
