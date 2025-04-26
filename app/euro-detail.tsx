import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams,useRouter } from 'expo-router';
import DiplomeContact from '@/components/DiplomeContact'
const DetailEurop = () => {
  const { data } = useLocalSearchParams();
     const router = useRouter();
  const diplome = JSON.parse(typeof data === 'string' ? data : data[0]);
  const handleInscription = () => {
    router.push({
      pathname: '/Inscrire',
      params: {
        id: diplome?.id?.toString(),
        titre: diplome?.titre?.toString(),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{diplome.titre}</Text>

      <Text style={styles.sectionTitle}>🎯 Compétences visées :</Text>
      {diplome.competences_visees?.map((comp: string, index: number) => (
        <Text key={index} style={styles.bulletPoint}>• {comp}</Text>
      ))}

      <Text style={styles.sectionTitle}>📘 Modules :</Text>
      {diplome.modules?.map((mod: string, index: number) => (
        <Text key={index} style={styles.bulletPoint}>• {mod}</Text>
      ))}

      <Text style={styles.sectionTitle}>⏳ Durée :</Text>
      <Text style={styles.detailText}>{diplome.duree}</Text>

      <Text style={styles.sectionTitle}>🎓 Condition d'accès :</Text>
      <Text style={styles.detailText}>{diplome.condition_acces}</Text>

      <Text style={styles.sectionTitle}>👥 Effectif prévu :</Text>
      <Text style={styles.detailText}>{diplome.effectif_prevu}</Text>

      <Text style={styles.sectionTitle}>💼 Métiers visés :</Text>
      {diplome.metiers?.map((job: string, index: number) => (
        <Text key={index} style={styles.bulletPoint}>• {job}</Text>
      ))}

      <Text style={styles.sectionTitle}>📝 Pièces à fournir :</Text>
      {diplome.pieces_a_fournir?.map((piece: string, index: number) => (
        <Text key={index} style={styles.bulletPoint}>• {piece}</Text>
      ))}
      <View>
        <DiplomeContact />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleInscription}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailEurop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdfdfd',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bulletPoint: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
});