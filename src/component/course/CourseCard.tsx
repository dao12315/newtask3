import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import TextComponent from '../TextComponent';
import { CourseItem } from './types';
import { renderStarRating, getProgressColor } from '../../screens/Courses/utils/rating';

type Props = {
  item: CourseItem;
  onPress?: () => void;
};

export const CourseCard = ({ item, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <Image source={item.image} style={styles.image} />

      <View style={styles.content}>
        <TextComponent style={styles.title}>
          {item.title}
        </TextComponent>

        <View style={styles.ratingRow}>
          {renderStarRating(item.rating)}
          <TextComponent style={styles.level}>
            {item.level}
          </TextComponent>
        </View>

        <TextComponent style={styles.description}>
          {item.description}
        </TextComponent>

        <View style={styles.progressRow}>
          <TextComponent style={styles.progressText}>
            {item.progress}%
          </TextComponent>
          <TextComponent style={styles.status}>
            {item.status}
          </TextComponent>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: getProgressColor(item.progress),
                width: `${item.progress}%`,
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  card: {
    height: 150,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#c32f30',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  pressed: {
    opacity: 0.5,
  },

  image: {
    height: 140,
    width: 140,
    borderRadius: 12,
  },

  content: {
    flex: 1,
    gap: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: '500',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  level: {
    fontSize: 12,
    marginLeft: 4,
  },

  description: {
    fontSize: 12,
  },

  progressRow: {
    flexDirection: 'row',
    gap: 10,
  },

  progressText: {
    fontSize: 16,
    fontWeight: '500',
  },

  status: {
    fontSize: 12,
  },

  progressBarBg: {
    backgroundColor: '#e1e1e1',
    height: 15,
    borderRadius: 15,
  },

  progressBar: {
    height: 15,
    borderRadius: 15,
  },
});
