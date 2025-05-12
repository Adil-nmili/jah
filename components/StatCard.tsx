import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  target: number;
  label: string;
  duration?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, target, label, duration = 3000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 50));
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [target, duration]);

  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={40} color="#1D4ED8" />
      <Text style={styles.countText}>{count}+</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '30%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginTop: 6,
  },
  label: {
    fontSize: 14,
    color: '#EA580C',
  },
});

export default StatCard;
