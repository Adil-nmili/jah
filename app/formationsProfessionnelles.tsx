import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import data from '../data/formationData.json';
import SectionTitle from '@/components/SectionTitle';

type Formation = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const screenWidth = Dimensions.get('window').width;

const FormationPro = () => {
  const router = useRouter();
  const formationsPros: Formation[] = data.formationsPros;
  
  const handlePress = (formation: Formation) => {
    router.push({
      pathname: "/detail-formation" as const,
      params: {
        id: formation.id.toString(),
        title: formation.title,
        description: formation.description,
        image: formation.image,
      },
    });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <SectionTitle title="Formations Professionnelles" />
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/images/background (2).png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <FlatList
          data={formationsPros}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={renderHeader}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              delay={index * 150}
              duration={600}
              useNativeDriver
            >
              <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(223, 229, 227, 0.3)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
 
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'justify',
    padding: 10,
  },
});

export default FormationPro;