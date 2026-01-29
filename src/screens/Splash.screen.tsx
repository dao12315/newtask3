import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import type { RootStackParamList } from '../routes/Navigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth } from '@react-native-firebase/auth';
import { User, UserService } from '../services/todo.service';
import { AuthStorage } from '../stores/auth.storage';
import { AppUser } from '../models/app-user';
import { useUserStore } from '../stores/user.store';
import { normalizeUser } from '../utils/normalize-user';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        // 1️⃣ CHECK LOCAL STORAGE
        const storedUser = await AuthStorage.getUser();
        if (storedUser) {
          // 🔥 set store để Home dùng
          setUser(storedUser);

          navigation.replace('Home');
          return;
        }

        // 2️⃣ CHECK FIREBASE AUTH (fallback)
        const firebaseUser = getAuth().currentUser;

        if (firebaseUser?.email) {
          const dbUser = await UserService.getByEmail(firebaseUser.email);

          if (dbUser) {
            const appUser = normalizeUser(dbUser);

            // 🔥 sync lại storage + store
            await AuthStorage.saveUser(appUser);
            setUser(appUser);

            navigation.replace('Home');
            return;
          }
        }

        // 3️⃣ CHƯA ĐĂNG NHẬP
        navigation.replace('Welcome');
      } catch (err) {
        console.log('Splash error:', err);
        navigation.replace('Welcome');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation, setUser]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd0d6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  logo: { width: 500, height: 500, resizeMode: 'contain' },
});
