import React, { useRef, useState } from 'react';
import { Pressable, View, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../component/TextComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Navigator';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'OnBoarding'>;

export const DATA = [
  {
    id: '1',
    image: require('../../../src/assets/img/OnBoarding/onb_1.jpg'),
    title: 'Đào tạo online lý thuyết sơ cấp cứu',
    description:
      'Khóa học trực tuyến cung cấp kiến thức nền tảng về sơ cấp cứu, giúp học viên chủ động xử lý các tình huống khẩn cấp thường gặp trong đời sống.',
    oldPrice: '800.000đ',
    newPrice: '750.000đ',
    highlight: 'Ưu đãi người dùng mới',
  },
  {
    id: '2',
    image: require('../../../src/assets/img/OnBoarding/onb_2.jpg'),
    title: 'Đào tạo lý thuyết kết hợp thực hành cơ bản',
    description:
      'Chương trình đào tạo trực tiếp kết hợp giữa lý thuyết và thực hành cơ bản, giúp học viên rèn luyện kỹ năng sơ cấp cứu trong các tình huống thực tế.',
    oldPrice: '1.200.000đ',
    newPrice: '1.100.000đ',
    highlight: 'Ưu đãi người dùng mới',
  },
  {
    id: '3',
    image: require('../../../src/assets/img/OnBoarding/onb_3.jpg'),
    title: 'Đào tạo toàn diện thực hành nâng cao',
    description:
      'Khóa học chuyên sâu tập trung vào thực hành nâng cao, giúp nâng cao kỹ năng sơ cấp cứu và khả năng phối hợp xử lý tình huống khẩn cấp.',
    oldPrice: '1.800.000đ',
    newPrice: '1.700.000đ',
    highlight: 'Ưu đãi người dùng mới',
  },
];

const renderItem = ({ item }: any) => {
  return (
    <View
      style={{
        width: 320,
      }}
    >
      <View
        style={{
          height: '50%',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={item.image}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          height: '50%',
          padding: 20,
          gap: 5,
        }}
      >
        <TextComponent style={{ fontSize: 25, fontWeight: 500 }}>
          {item.title}
        </TextComponent>
        <TextComponent
          style={{ fontSize: 12, fontWeight: 400, lineHeight: 20 }}
        >
          {item.description}
        </TextComponent>

        <View
          style={{
            flexDirection: 'row',
            top: 10,
            gap: 10,
            alignItems: 'center',
          }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TextComponent
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  textDecorationLine: 'line-through',
                  color: '#686868',
                }}
              >
                {item.oldPrice}
              </TextComponent>
              <TextComponent style={{ fontSize: 16, fontWeight: 500 }}>
                {item.newPrice}
              </TextComponent>
            </View>
            <TextComponent
              style={{ fontSize: 15, fontWeight: 400, color: '#990012' }}
            >
              {item.highlight}
            </TextComponent>
          </View>
          <Pressable
            onPress={null}
            style={({ pressed }) => ({
              width: 100,
              height: 35,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#990012',
              justifyContent: 'center', // căn dọc
              alignItems: 'center',
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <TextComponent
              style={{ fontSize: 15, fontWeight: 400, color: '#990012' }}
            >
              Thông tin
            </TextComponent>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const { width } = Dimensions.get('window');

export default function OnBoardingScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goNext = () => {
    if (activeIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={10}
          >
            <Icon name="arrow-back" size={30} color="#990012" />
          </Pressable>
        </View>
        <View
          style={{
            height: '75%',
            width: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Gradient nền phía sau */}
          <LinearGradient
            colors={['rgb(255, 255, 255)', 'rgb(236, 202, 202)']}
            style={styles.fade}
          />
          <View
            style={{
              width: 320,
              flex: 1,
              maxHeight: '80%',
              alignSelf: 'center', // ✅ thêm
              backgroundColor: '#ffffff',
              borderRadius: 20,
              overflow: 'hidden',

              elevation: 8,
            }}
          >
            <FlatList
              ref={flatListRef}
              data={DATA}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              onMomentumScrollEnd={e => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x / (width * 0.8),
                );
                setActiveIndex(index);
              }}
            />
          </View>
          {/* MŨI TÊN TRÁI */}
          {activeIndex > 0 && (
            <Pressable
              onPress={goPrev}
              style={({ pressed }) => ({
                position: 'absolute',
                left: 15,
                top: '50%',
                transform: [{ translateY: -20 }],
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Icon name="chevron-left" size={28} color="#990012" />
            </Pressable>
          )}

          {/* MŨI TÊN PHẢI */}
          {activeIndex < DATA.length - 1 && (
            <Pressable
              onPress={goNext}
              style={({ pressed }) => ({
                position: 'absolute',
                right: 15,
                top: '50%',
                transform: [{ translateY: -20 }],
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Icon name="chevron-right" size={28} color="#990012" />
            </Pressable>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {DATA.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            ></View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffd0d6',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0baba',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: '#990012',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 80,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 16,
    height: 80,
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },

  list: {
    padding: 10,
    gap: 16,
  },

  fade: {
    position: 'absolute',
    top: 10,
    left: -80,
    right: -80,
    height: '85%',
    borderBottomRightRadius: 280,
    borderBottomLeftRadius: 280,
  },
});
