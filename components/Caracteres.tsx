import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
// import { ThemedText } from './ThemedText';
// import { ThemedView } from './ThemedView';

interface Caractere {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const caracteres: Caractere[] = [
  {
    id: 1,
    title: 'ÉQUIPE QUALIFIÉE ',
    description:
      'Une équipe ouverte , formee,motivee ,et compétente prête à relever les défis du projet pédagogique.',
    icon: 'people-sharp',
  },
  {
    id: 2,
    title: 'INFRASTRUCTURE ADAPTÉE',
    description: 'Des espaces équipés et bien agencés .',
    icon: 'repeat-outline',
  },
  {
    id: 3,
    title: 'COLLABORATION',
    description:
      'L\'école encourage les élèves à travailler en équipe et à collaborer les uns avec les autres, en développant des compétences sociales.',
    icon: 'shuffle-outline',
  },
  {
    id: 4,
    title: 'RESPECT',
    description:
      'Le respect des autres, ainsi que de soi-même constitue une orientation de première importance, renforçant le savoir de vivre ensemble.',
    icon: 'heart-outline',
  },
];

export default function Caracteres(): JSX.Element {
  return (
    <View style={styles.container}>
      {caracteres.map((caractere) => (
        <View key={caractere.id} style={styles.caracterCard}>
          <Ionicons
            name={caractere.icon}
            size={40}
            style={styles.caracterIcon}
          />
          <Text style={styles.caracterTitle}>{caractere.title}</Text>
          <Text style={styles.caracterDescription}>
            {caractere.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  caracterCard: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,

  },
  caracterIcon: {
    color: '#0000FF',
  },
  caracterTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2D2A35',
  },
  caracterDescription: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});
