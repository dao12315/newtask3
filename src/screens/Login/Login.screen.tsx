import React from 'react';
import { Image, Pressable, Text, TextInput, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../component/TextComponent';
import { IMAGES } from '../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Navigator';
import { stylesLogin } from './login.styles';
import { useLogin } from './useLogin';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const {
    hidden,
    setHidden,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
  } = useLogin(navigation);

  return (
    <SafeAreaView style={stylesLogin.safe}>
      <View style={stylesLogin.container}>
        {/* HEADER */}
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={({ pressed }) => [
            stylesLogin.header,
            pressed && stylesLogin.pressed,
          ]}
        >
          <View style={stylesLogin.backIcon}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </View>

          <TextComponent variant="title" style={stylesLogin.headerTitle}>
            Đăng Nhập
          </TextComponent>
        </Pressable>

        {/* FORM */}
        <View style={stylesLogin.form}>
          <TextComponent variant="title" style={stylesLogin.welcome}>
            Chào mừng đến với
          </TextComponent>

          <TextComponent variant="title" style={stylesLogin.brand}>
            Medsiki
          </TextComponent>

          {/* EMAIL */}
          <View style={stylesLogin.group}>
            <TextComponent style={stylesLogin.label}>
              Email hoặc Số điện thoại
            </TextComponent>

            <View style={stylesLogin.inputWrapper}>
              <TextInput
                placeholder="example@example.com"
                placeholderTextColor="#965b61"
                style={stylesLogin.input}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={stylesLogin.group}>
            <TextComponent style={stylesLogin.label}>Mật Khẩu</TextComponent>

            <View style={stylesLogin.inputWrapper}>
              <TextInput
                secureTextEntry={hidden}
                placeholder="**********"
                placeholderTextColor="#965b61"
                style={stylesLogin.inputAbsolute}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={() => setHidden(h => !h)}
                style={({ pressed }) => [
                  stylesLogin.eyeIcon,
                  pressed && stylesLogin.pressed,
                ]}
              >
                <Icon
                  name={hidden ? 'visibility' : 'visibility-off'}
                  size={28}
                  color="#fff"
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                stylesLogin.forgot,
                pressed && stylesLogin.pressed,
              ]}
            >
              <TextComponent style={stylesLogin.forgotText}>
                Quên mật khẩu
              </TextComponent>
            </Pressable>

            <View style={stylesLogin.loginBtnWrap}>
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [
                  stylesLogin.loginBtn,
                  pressed && stylesLogin.pressed,
                ]}
              >
                <Text style={stylesLogin.loginText}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* DIVIDER */}
        <View style={stylesLogin.divider}>
          <View style={stylesLogin.line} />
          <TextComponent style={stylesLogin.orText}>
            Hoặc đăng nhập bằng
          </TextComponent>
          <View style={stylesLogin.line} />
        </View>

        {/* SOCIAL */}
        <View style={stylesLogin.social}>
          <Pressable
            style={({ pressed }) => [
              stylesLogin.socialBtn,
              pressed && stylesLogin.pressed,
            ]}
          >
            <Image source={IMAGES.facebook} style={stylesLogin.socialIconFb} />
            <TextComponent style={stylesLogin.socialText}>
              Facebook
            </TextComponent>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              stylesLogin.socialBtn,
              pressed && stylesLogin.pressed,
            ]}
            onPress={() => handleGoogleLogin(navigation)}
          >
            <Image source={IMAGES.google} style={stylesLogin.socialIconGg} />
            <TextComponent style={stylesLogin.socialText}>Google</TextComponent>
          </Pressable>
        </View>

        {/* REGISTER */}
        <View style={stylesLogin.register}>
          <TextComponent>Bạn chưa có tài khoản?</TextComponent>
          <Pressable
            style={({ pressed }) => pressed && stylesLogin.pressed}
            onPress={() => navigation.navigate('Register')}
          >
            <TextComponent style={stylesLogin.registerText}>
              Đăng ký
            </TextComponent>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
