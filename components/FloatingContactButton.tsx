import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FloatingContactButton = () => {
  const router = useRouter();
  const scale = new Animated.Value(1);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Gérer l'animation de pression
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    router.push('/Contact');
  };

 

  return (
    <Animated.View
      style={styles.container}
    >
      <TouchableOpacity
        style={[styles.button, { width: 56, height: 56 }]} // Appliquer les dimensions
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={0.10}
      >
        <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    bottom:  55, // Position de départ du bouton, modifiable selon vos besoins
    right: 10,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#0000FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
});

export default FloatingContactButton;
