import database from '@react-native-firebase/database';
import { comparePassword, hasPassword } from '../utils/encoding.password';

export type User = {
  id: string;
  name: string | null | undefined;
  password: string;
  email: string | null | undefined;
  phoneNumber: number;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  avatar: string | null | undefined;
};

export class UserService {
  private static ref = database().ref(`/users`);

  //CREATE
  static async create(
    name: string,
    password: string,
    email: string,
    phoneNumber: number,
    dateOfBirth: number,
    avatar: string,
  ): Promise<any> {
    const hashedPassword = await hasPassword(password);
    const newRef = this.ref.push();
    await newRef.set({
      name,
      password: hashedPassword,
      email,
      phoneNumber,
      dateOfBirth,
      createAt: Date.now(),
      updateAt: Date.now(),
      status: true,
      avatar,
    });
    return newRef.key!;
  }

  //Check trùng Email
  static async isEmailExists(email: string): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase(); // chuẩn hóa khoảng trắng và chữ hoa

    const snapshot = await this.ref //gọi db users
      .orderByChild('email') // duyệt qua tất cả bản ghi trong users
      .equalTo(normalizedEmail) // lọc users có email = normalizedEmail
      .once('value'); // đọc 1 lần
    return snapshot.exists();
  }

  //lấy dữ liệu của Email
  static async getByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();

    const snapshot = await this.ref
      .orderByChild('email')
      .equalTo(normalizedEmail)
      .once('value');

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.val();
    const userId = Object.keys(data)[0];
    const dbUser = data[userId];

    return {
      id: userId,
      name: dbUser.name ?? null,
      email: dbUser.email ?? null,
      avatar: dbUser.avatar ?? null,
      password: dbUser.password ?? null,
      phoneNumber: dbUser.phoneNumber ?? null,
      dateOfBirth: dbUser.dateOfBirth ?? null,
      createdAt: new Date(dbUser.createAt),
      updatedAt: new Date(dbUser.updateAt),
      status: dbUser.status ?? true,
    };
  }

  //LOGIN
  static async login(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase(); // chuẩn hóa khoảng trắng và chữ hoa

    const snapshot = await this.ref //gọi db users
      .orderByChild('email') // duyệt qua tất cả bản ghi trong users
      .equalTo(normalizedEmail) // lọc users có email = normalizedEmail
      .once('value'); // đọc 1 lần
    console.log('📦 SNAPSHOT EXISTS:', snapshot.exists());

    if (!snapshot.exists()) {
      throw new Error('EMAIL_NOT_FOUND');
    }

    const data = snapshot.val();
    const userId = Object.keys(data)[0];
    const user = data[userId];
    console.log('👤 USER FROM DB:', userId, user);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('INVALID_PASSWORD');
    }

    if (user.status === false) {
      throw new Error('USER_DISABLED');
    }

    const result = {
      id: userId,
      ...user,
    };
    console.log('✅ LOGIN SUCCESS USER:', result);
    return result;
  }
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;

  const value = email.trim();

  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  return regex.test(value);
}

// ndhj mzmx azyl yjmd
