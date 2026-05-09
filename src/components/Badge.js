import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Badge({ label, color = '#7C3AED', textColor = '#FFFFFF', small = false }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }, small && styles.small]}>
      <Text style={[styles.label, { color: textColor }, small && styles.smallText]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  smallText: {
    fontSize: 10,
  },
});
