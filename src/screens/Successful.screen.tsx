import React, { useState } from 'react';
import { Image, Pressable, TextInput, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextComponent from '../component/TextComponent';
import { IMAGES } from '../assets';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Successful'>;

export default function SuccessfulScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              // TODO: navigation.goBack()
            }}
            style={({ pressed }) => [
              styles.headerBack,
              pressed && styles.pressed,
            ]}
            hitSlop={10}
          ></Pressable>

          <TextComponent variant="title" style={styles.headerTitle}>
            Tạo Tài Khoản
          </TextComponent>
        </View>

        <View style={styles.form}>
          <View style={styles.buttonWrap}>
            <TextComponent
              style={{ color: '#20bf55', fontSize: 30, fontWeight: 500 }}
            >
              Chúc mừng
            </TextComponent>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={IMAGES.success}
              style={{ width: 150, height: 150 }}
            />
          </View>
          <View style={styles.buttonWrap}>
            <TextComponent
              style={{ color: '#20bf55', fontSize: 20, fontWeight: 500 }}
            >
              Bạn đã tạo tài khoản thành công
            </TextComponent>
          </View>
          <View style={styles.buttonWrap}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <TextComponent style={styles.primaryButtonText}>
                Đăng nhập
              </TextComponent>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffd0d6',
  },

  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  pressed: {
    opacity: 0.6,
  },

  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  headerBack: {
    position: 'absolute',
    left: 16,
    height: 80,
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 28,
  },

  form: {
    top: 150,
    paddingVertical: 20,
    gap: 20,
  },

  field: {
    gap: 8,
  },

  fieldLabel: {
    fontSize: 18,
    fontWeight: '500',
  },

  fieldBox: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#fed1d6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fieldInput: {
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
    color: '#990012',
  },

  policyBlock: {
    gap: 6,
  },

  policyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },

  policyLink: {
    color: '#990012',
    fontWeight: '500',
  },

  buttonWrap: {
    alignItems: 'center',
    height: 50,
  },

  primaryButton: {
    width: 200,
    height: 50,
    borderRadius: 35,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 4,
  },

  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#CFCFCF',
  },

  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666',
  },

  socialRow: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  socialButton: {
    flex: 1,
    height: 60,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIconFb: {
    position: 'absolute',
    left: 10,
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  socialIconGg: {
    position: 'absolute',
    left: 12,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  socialText: {
    fontSize: 16,
    color: '#000',
  },
});
