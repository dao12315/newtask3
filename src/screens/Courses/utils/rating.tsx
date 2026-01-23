import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export const renderStarRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const maxStars = 5;

  return Array.from({ length: maxStars }, (_, i) => {
    if (i < fullStars) {
      return <Icon key={i} name="star" size={18} color="#f1c40f" />;
    }

    if (i === fullStars && hasHalfStar) {
      return <Icon key={i} name="star-half" size={18} color="#f1c40f" />;
    }

    return <Icon key={i} name="star-border" size={18} color="#f1c40f" />;
  });
};

export const getProgressColor = (progress: number) => {
  if (progress === 100) return '#1abc9c';
  if (progress >= 50) return '#f1c40f';
  if (progress > 0) return '#3498db';
  return '#bdc3c7';
};

