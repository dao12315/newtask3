import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { IMAGES } from '../../../../assets';

const news = [
  {
    img: IMAGES.baoyagi,
    label: 'Bão Yagi vừa qua, bão khác lại đến',
    description: 'Kỹ năng phòng chống, ứng phó trong, trước và sau bão',
  },
  {
    img: IMAGES.pccc,
    label: 'Nâng cao hiệu quả công tác phòng cháy chữa cháy',
    description:
      'Tập huấn nghiệp vụ công tác phòng cháy chữa cháy cho trường học. Tập huấn nghiệp vụ công tác phòng cháy chữa cháy cho trường học. Tập huấn nghiệp vụ công tác phòng cháy chữa cháy cho trường học',
  },
];

export const News = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tin tức</Text>
        <Text style={styles.headerText}>Khác</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.list}>
        {news.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.pressed,
            ]}
          >
            <Image source={item.img} style={styles.image} />

            <View style={styles.content}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.title}
              >
                {item.label}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.description}
              >
                {item.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    color: '#c32f30',
    fontWeight: '600',
  },

  divider: {
    height: 0.5,
    backgroundColor: '#c32f30',
    marginVertical: 4,
    marginBottom: 10,
  },

  list: {
    gap: 10,
  },

  item: {
    height: 75,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#c32f30',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 5,
    overflow: 'hidden',
  },

  image: {
    height: 65,
    width: 65,
    borderRadius: 12,
    borderWidth: 0.4,
  },

  content: {
    flex: 1,
  },

  title: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
  },

  description: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '200',
  },

  pressed: {
    opacity: 0.5,
  },
});
