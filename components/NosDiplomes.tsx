import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import formationData from '@/data/formationData.json';

interface Diplome {
  id: string;
  titre: string;
  duree: string;
  icone: string;
}

export default function NosDiplomes(): JSX.Element {
  const [diplomes, setDiplomes] = useState<Diplome[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setDiplomes(
      formationData.diplomes.map((diplome) => ({
        ...diplome,
        id: String(diplome.id),
      }))
    );
  }, []);

  

  return (
    <View style={styles.container}>
      {diplomes.map((diplome) => (
        <TouchableOpacity
          key={diplome.id}
          style={[
            styles.diplomeCard,
            hoveredCard === diplome.id && styles.diplomeCardHover
          ]}
          
          onPressIn={() => setHoveredCard(diplome.id)}
          onPressOut={() => setHoveredCard(null)}
        >
          <Ionicons
            name={diplome.icone as any}
            size={40}
            color="#0000FF"
            style={styles.icon}
          />
          <Text style={styles.diplomeTitle}>{diplome.titre}</Text>
          <Text style={styles.diplomeDuree}>{diplome.duree}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  diplomeCard: {
    width: '48%',
    backgroundColor: '#F0FDFA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  diplomeCardHover: {
    backgroundColor: '#0EB582',
  },
  diplomeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  diplomeDuree: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  icon: {
    marginBottom: 8,
  },
});
