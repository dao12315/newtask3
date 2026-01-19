import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  Text,
} from 'react-native';
import type { RootStackParamList } from '../routes/Navigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/img/medsiki-login.png')}
        style={styles.logo}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: 300,
            gap: 30,
          }}
        >
          <Text
            style={{
              color: '#000000ff',
              fontSize: 12,
              fontWeight: '400',
              textAlign: 'center',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Pressable
            onPress={() => navigation.navigate("Login")}
              style={({ pressed }) => [
                {
                  width: 200,
                  height: 50,
                  backgroundColor: '#c32f30',
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                },
                pressed && { opacity: 0.5 },
              ]}
            >
              <Text
                style={{ color: '#ffcfd6', fontSize: 20, fontWeight: '500' }}
              >
                Đăng nhập
              </Text>
            </Pressable>
            <Pressable
            onPress={() => navigation.navigate("Register")}

              style={({ pressed }) => [
                {
                  height: 50,
                  width: 200,
                  backgroundColor: '#ffcfd6',
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                },
                pressed && { opacity: 0.5 },
              ]}
            >
              <Text
                style={{ color: '#c32f30', fontSize: 20, fontWeight: '500' }}
              >
                Đăng kí
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  logo: { width: 320, height: 320, resizeMode: 'contain', bottom: 27 },
});
