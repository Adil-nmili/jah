import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CardServices from '@/components/CardServices';
import SectionTitle from '@/components/SectionTitle';
import { useRouter } from 'expo-router';

const Formations: React.FC = () => {
  const router = useRouter();

  // Fonction pour gérer la navigation lors du clic sur les cartes
  const HandleFormationsQ = () => {
    router.push('/formationsProfessionnelles');  // Utilisation correcte de router.push pour naviguer
  };
  const HandleFormationsPro = () => {
    router.push('/formationsQualifiantes');  // Utilisation correcte de router.push pour naviguer
  };
  const HandleDeplomePro = () => {
    const diplomeData = {
      title: "Diplôme de la Formation Professionnelle Accrédité par l'Etat",
      image: require('@/assets/images/diplome.png'),
      description: "Description du diplôme...",
      modules: {
        "1ère Année": ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"],
        "2ème Année": ["Module 6", "Module 7", "Module 8", "Module 9", "Module 10"]
      }
    };
    router.push({
      pathname: '/DiplomsProfessionnelle',
      params: { diplome: JSON.stringify(diplomeData) }
    });
  };
  
  const HandleDeplomeEurop = () => {
    router.push('/DiplomsEuropeenne');
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionTitle title="Nos Formations" />
      {/* Carte pour Formations Qualifiantes */}
      <CardServices
        title="Formations Professionnelles"
        image={require('@/assets/images/formation.png')}
        onPress={() => HandleFormationsQ()} // Route pour Formations Qualifiantes
      />
      {/* Carte pour Formations Professionnelles */}
      <CardServices
        title="Formations Qualifiantes"
        image={require('@/assets/images/diplome.png')}
        onPress={() => HandleFormationsPro()} // Route pour Formations Professionnelles
      />
      <CardServices
        title="Diplôme de la Formation Professionnelle Accrédité par l'Etat"
        image={require('@/assets/images/diplome.png')}
        onPress={() => HandleDeplomePro()} // Route pour Formations Professionnelles
      />
      <CardServices
        title="Diplôme de la Fédération Européenne des Ecoles FEDE"
        image={require('@/assets/images/fede.png')}
        onPress={() => HandleDeplomeEurop()} // Route pour Formations Professionnelles
      />
    </ScrollView>
  );
};

export default Formations;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
});
