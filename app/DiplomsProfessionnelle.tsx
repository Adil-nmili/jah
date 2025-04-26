import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import diplomesProfessionnelle from '@/data/formationData.json';
import { useRouter } from 'expo-router';

const DiplomePro = () => {
  const router = useRouter();
  const diplomes = diplomesProfessionnelle.diplomesProfessionnelle;

  const handlePress = (diplome: any) => {
    router.push({
      pathname: '/diplome-detail',
      params: {
        diplome: JSON.stringify(diplome),
      },
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/background (2).png')}
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {diplomes.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 150}
            duration={600}
            useNativeDriver
          >
            <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.titre}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.competences_visees}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default DiplomePro;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'rgba(223, 229, 227, 0.56)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
