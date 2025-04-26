import React from 'react';
import {Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DiplomeParCategorie = () => {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const categorie = JSON.parse(typeof data === 'string' ? data : data[0]);
  const diplomes = categorie.diplomes;

  const handleDiplomeClick = (diplome: any) => {
    router.push({
      pathname: '/euro-detail',
      params: {
        data: JSON.stringify(diplome),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎓 {categorie.categorie}</Text>
      {diplomes?.map((diplome: any, index: number) => (
        <TouchableOpacity key={index} style={styles.item} onPress={() => handleDiplomeClick(diplome)}>
          <Text style={styles.title}>• {diplome.titre}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default DiplomeParCategorie;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 16,
    color: '#007AFF',
  },
});
