import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import SectionTitle from '@/components/SectionTitle';
import Footer from '@/components/Footer';
import Aboutslider from '@/components/Aboutslider';
import Albums from '@/components/Albums';


export default function AproposNous(): JSX.Element {
  const [showMoreFrench, setShowMoreFrench] = useState<boolean>(false);
  // const [showMoreArabic, setShowMoreArabic] = useState<boolean>(false);

  const scrollRef = useRef<ScrollView>(null);
  const handleToggleFrenchText = () => {
    if (showMoreFrench) {
      // Revenir en haut de la section texte
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
    setShowMoreFrench(!showMoreFrench);
  };

  return (
    <ScrollView 
    ref={scrollRef}
    showsVerticalScrollIndicator={false}
    style={styles.container}>
      <Aboutslider />
      <View style={styles.contentContainer}>
        {/* Section Française */}
        <View style={styles.textFrame}>
          <Text style={styles.frameText}>
            Bonjour à toutes et à tous, Je suis le <Text style={{ fontWeight: 'bold' }}>Dr Jamal Nouiti,</Text> directeur de l'établissement Jah de la formation professionnelle à Marrakech.
          </Text>

          {showMoreFrench && (
            <>
              <Text style={styles.frameText}>
                Comme vous le savez, la formation professionnelle a commencé à s'imposer sur le marché du travail et est devenue le principal pilier de la promotion de l'économie nationale, et cela en parallèle avec le développement technologique et scientifique.
              </Text>
              <Text style={styles.frameText}>
                Créée en 2006 et accréditée par l'État, l'école Jah de formation professionnelle délivre des diplômes qui permettent à ses étudiants d'intégrer le monde du travail, que ce soit dans le secteur public ou le secteur privé, ou de créer leurs propres projets tout en leur donnant tous les atouts nécessaires à la réussite.
              </Text>
              <Text style={styles.frameText}>
                L'établissement vous propose des diplômes agréés par l'état; qualification opérateur de saisi, technicien, technicien spécialisé, licence professionnelle, et master professionnel dans le domaine de l'administration, de la gestion des entreprises et de l'informatique.
              </Text>
              <Text style={styles.frameText}>
                L'établissement dispense également des formations professionnelles dans divers domaines : informatique, gestion, développement humain et accompagnement, machines de forage et excavateurs, chargeuses sur pneus et chariots élévateurs, journalisme, stylisme et couture, pâtisserie, secourisme, "Cupping Therapy“ ou la thérapie par les ventouses (Hijama), esthétique et cosmétologie, formation de professeurs d'éducation physique, préparateur physique, assistant(e) médical(e), système de sécurité incendie et prévention, langues vivantes, cours de soutien et de renforcement....
              </Text>
              <Text style={styles.frameText}>
                L'établissement occupe une place privilégiée auprès des diplômés en leur assurant le suivi et l'accompagnement nécessaires pour la réalisation de leurs projets, pour ce faire, l'école diversifie les moyens pour maintenir un contact permanent avec les lauréats comme elle organise des réunions et des séances gratuites pour la sensibilisation et l'orientation.
                L'établissement Jah garantit aux étudiants des stages sur terrain, des visites d'entreprises, et des activités culturelles , touristiques et sportives.
              </Text>
            </>
          )}
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={handleToggleFrenchText}
          >
            <Text style={styles.readMoreButtonText}>
              {showMoreFrench ? 'Voir moins' : 'Lire la suite'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <SectionTitle title="NOS ALBUMS" />
      <View>
        <Text style={styles.moreText}>
          Bienvenue sur notre page d'albums scolaires ! Parcourez nos souvenirs les plus précieux en photos, de moments de camaraderie aux réalisations académiques.
        </Text>
      </View>
      <Albums />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
    marginTop: 5,
    textAlign: 'left',
  },
  contentContainer: {
    padding: 15,
  },
  textFrame: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  frameText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'left',
    marginBottom: 15,
  },
  moreText: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  readMoreButton: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  readMoreButtonText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arabicButton: {
    alignItems: 'flex-end',
  },
});
