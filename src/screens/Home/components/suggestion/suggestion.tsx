import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { IMAGES } from '../../../../assets';

const suggestion = [
  {
    img: IMAGES.xulyvetbong,
    label: 'Cách xử lý vết bỏng tại nhà đơn giản hiệu quả dễ thực hiện',
    description: 'Sơ cứu vết bỏng kịp thời và đúng cách là biện pháp...',
  },
  {
    img: IMAGES.randoc,
    label: 'Phân biệt rắn đọc và rắn không độc cắn, cách sở cứu ban đầu',
    description:
      'Tùy theo từng loại rắn cắn sẽ có nhưng biểu hiện đặc trưng khác nhau',
  },
];

export const Suggestion = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gợi ý</Text>
        <Text style={styles.headerText}>Khác</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.list}>
        {suggestion.map((item, index) => (
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
    overflow: 'hidden',
  },

  title: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
  },

  description: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '300',
  },

  pressed: {
    opacity: 0.7,
  },
});
