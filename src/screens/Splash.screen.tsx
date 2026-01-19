import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import type { RootStackParamList } from '../routes/Navigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { UserService } from '../services/todo.service';
import { AuthStorage } from '../utils/auth.storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        //Check session local (email + google)
        const storedUser = await AuthStorage.getUser();
        if (storedUser) {
          navigation.replace('Home', { user: storedUser });
          return;
        }
        //Check firebase auth
        const firebaseUser = auth().currentUser;

        if (firebaseUser?.email) {
          const dbUser = await UserService.getByEmail(firebaseUser.email);

          if (dbUser) {
            await AuthStorage.saveUser(dbUser); //đồng bộ lại storage
            navigation.replace('Home', {user: dbUser})
            return;
          }
        }

        navigation.replace('Welcome');
      } catch (err) {
        console.log('Splash error: ', err)
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
