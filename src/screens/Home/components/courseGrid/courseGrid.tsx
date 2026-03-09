import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../routes/Navigator';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type CourseScreen = 'ThuongGap' | 'BenhNen' | 'PhanBiet' | 'BenhNhi';

type CourseItem = {
  name: string;
  label: string;
  screen: CourseScreen;
};

const courseIcons: CourseItem[] = [
  { name: 'bandage', label: 'Thường gặp', screen: 'ThuongGap' },
  { name: 'heart-pulse', label: 'Bệnh nền', screen: 'BenhNen' },
  { name: 'brain', label: 'Phân biệt', screen: 'PhanBiet' },
  { name: 'human-child', label: 'Bệnh nhi', screen: 'BenhNhi' },
];

export const CourseGrid = () => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Khóa học</Text>

        <View style={styles.divider} />
      </View>

      <View style={styles.grid}>
        {courseIcons.map(item => (
          <Pressable
            key={item.label}
            onPress={() => navigation.navigate(item.screen)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <Icon name={item.name} size={100} color="#ffffff" />
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    padding: 10,
    overflow: 'hidden',
    gap: 10,
  },

  title: {
    color: '#c32f30',
    fontWeight: '600',
  },

  divider: {
    height: 0.5,
    backgroundColor: '#c32f30',
    marginVertical: 4,
    marginBottom: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '46%',
    height: '46%',
    borderRadius: 15,
    backgroundColor: '#c32f30',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '300',
  },

  pressed: {
    opacity: 0.7,
  },
});
