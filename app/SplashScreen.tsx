import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('(tabs)'); // or your home screen route
    }, 3000); // show splash for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeInDown"
        source={require('../assets/images/LOGO.jpg')} 
        style={styles.logo}
        duration={1500}
      />
      <Animatable.Text animation="fadeInUp" style={styles.text} delay={500}>
        Bienvenue à notre app ✨
      </Animatable.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    color: '#333',
  },
});
