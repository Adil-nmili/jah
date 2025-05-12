import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Diplome {
  id: string;
  titre: string;
  description: string;
  icone: string;
}

export default function NosDiplomes({ diplome }: { diplome: Diplome[] }): JSX.Element {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [diplomes, setDiplomes] = useState<Diplome[]>([]);

  useEffect(() => {
    if (diplome) {
      setDiplomes(diplome);
    }
  }, [diplome]);

  return (
    <View style={styles.container}>

      { diplomes.length > 0 ? diplomes.map((dip) => (
        <TouchableOpacity
          key={dip.id}
          style={[
            styles.diplomeCard,
            hoveredCard === dip.id && styles.diplomeCardHover
          ]}
          onPressIn={() => setHoveredCard(dip.id)}
          onPressOut={() => setHoveredCard(null)}
        >
          <Ionicons
            name={dip.icone ? dip.icone as any : 'book-outline'}
            size={40}
            color="#0000FF"
            style={styles.icon}
          />
          <Text style={styles.diplomeTitle}>{dip.titre}</Text>
          <Text style={styles.diplomeDuree}>{dip.description}</Text>
        </TouchableOpacity>
      )) : <Text style={styles.noDiplome}>Aucun diplôme trouvé</Text>}
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
  noDiplome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000070',
    textAlign: 'center',
    backgroundColor: '#F0FDFA',
    padding: 16,
    borderRadius: 12,
  },
});
