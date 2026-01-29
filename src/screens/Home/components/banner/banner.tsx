import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../../../routes/Navigator';
import { IMAGES } from '../../../../assets';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const Banner = () => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.cacBuocCapCuu}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.contentBox}>
          <Text style={styles.title}>Cơ hội thực hành</Text>
          <Text style={styles.title}>kỹ năng sơ cấp cứu</Text>

          <View style={styles.divider} />

          <Text style={styles.description}>
            Góp phần phòng tránh tai nạn thương tích và giảm thiểu hậu quả tai
            nạn ở cộng đồng.
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate('OnBoarding')}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Tìm hiểu thêm</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },

  contentBox: {
    flex: 3,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    justifyContent: 'center',
    padding: 15,
  },

  title: {
    color: '#c32f30',
    fontWeight: '700',
  },

  divider: {
    height: 1.5,
    backgroundColor: '#c32f30',
    marginVertical: 8,
  },

  description: {
    color: '#c32f30',
    fontWeight: '500',
  },

  button: {
    flex: 1,
    width: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c32f30',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.5,
  },
});
