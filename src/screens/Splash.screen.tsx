import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import type { RootStackParamList } from '../routes/Navigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { UserService } from '../services/todo.service';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const user = auth().currentUser;

      if (user) {
        if (!user.email) {
          Alert.alert('Lỗi', 'Không lấy được email từ Google');
          return;
        }
        const dbUser = await UserService.getByEmail(user.email);
        if (!dbUser) {
          Alert.alert('Lỗi', 'Không lấy được dữ liệu người dùng');
          return;
        }
        navigation.replace('Home', { user: dbUser });
      } else {
        navigation.replace('Welcome');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

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

