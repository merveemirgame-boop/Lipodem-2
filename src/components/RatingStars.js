import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RatingStars({ rating, max = 5 }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: max }, (_, i) => (
        <Text key={i} style={[styles.star, i < rating ? styles.filled : styles.empty]}>
          ★
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    marginRight: 1,
  },
  filled: {
    color: '#F59E0B',
  },
  empty: {
    color: '#D1D5DB',
  },
});
