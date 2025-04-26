import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView,  TouchableOpacity } from 'react-native';
import { useLocalSearchParams ,useRouter } from 'expo-router';
import DiplomeContact from '@/components/DiplomeContact'


const DiplomeDetail = () => {
   const router = useRouter();
  const { diplome } = useLocalSearchParams();
  const diplomeData = JSON.parse(decodeURIComponent(diplome as string));
  const handleInscription = () => {
    router.push({
      pathname: '/Inscrire',
      params: {
        id: diplomeData?.id?.toString(),
        titre: diplomeData?.titre?.toString(),
      },
    });
  };
  const renderModule = ({ item }: { item: string }) => (
    <Text style={styles.moduleItem}>• {item}</Text>
  );

  const renderCell = (title: string, content: React.ReactNode) => (
    <View style={styles.cell}>
      <Text style={styles.cellTitle}>{title}</Text>
      <View>
        <Text style={styles.cellContent}>{content}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image */}
      {renderCell('Image', <Image source={{ uri: diplomeData.image }} style={styles.image} />)}

      {/* Titre du diplôme */}
      {renderCell(' ', <Text style={styles.title}>{diplomeData.titre}</Text>)}

      {/* Bourse */}
      {diplomeData.bourse && renderCell('Bourse', <Text style={styles.highlight}>{diplomeData.bourse}</Text>)}

      {/* Compétences visées */}
      {renderCell('Compétences visées', <Text style={styles.description}>{diplomeData.competences_visees}</Text>)}

      {/* Programme de formation - 1ère Année */}
      {diplomeData.modules["1ère Année"] && renderCell('1ère Année', (
        <View style={styles.moduleBlock}>
          <FlatList
            data={diplomeData.modules["1ère Année"]}
            renderItem={renderModule}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      ))}

      {/* Programme de formation - 2ème Année */}
      {diplomeData.modules["2ème Année"] && renderCell('2ème Année', (
        <View style={styles.moduleBlock}>
          <FlatList
            data={diplomeData.modules["2ème Année"]}
            renderItem={renderModule}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      ))}

      {/* Condition d'accès */}
      {diplomeData.condition_acces && renderCell('Condition d’accès', <Text style={styles.description}>{diplomeData.condition_acces}</Text>)}

      {/* Métiers */}
      {diplomeData.metiers && Array.isArray(diplomeData.metiers) && renderCell('Métiers', (
        <View style={styles.listContent}>
          {diplomeData.metiers.map((metier:string , index: number) => (
            <Text key={index as number} style={styles.bulletItem}>• {metier}</Text>
          ))}
        </View>
      ))}

      {/* Pièces à fournir */}
      {diplomeData.pieces_a_fournir && Array.isArray(diplomeData.pieces_a_fournir) && renderCell('Pièces à Fournir', (
        <View style={styles.listContent}>
          {diplomeData.pieces_a_fournir.map((piece :string, index:number) => (
            <Text key={index} style={styles.bulletItem}>• {piece}</Text>
          ))}
        </View>
      ))}
     < View
>
<DiplomeContact/>
 <TouchableOpacity style={styles.button} onPress={handleInscription}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  highlight: {
    fontSize: 16,
    color: '#0a7',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  bulletItem: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 3,
  },
  tableContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  tableColumn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  listContent: {
    marginLeft: 20,
  },
  moduleItem: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  link: {
    color: '#0066cc',
    fontSize: 16,
    marginTop: 8,
  },
  cell: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  cellTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cellContent: {
    fontSize: 16,
    color: '#555',
  },
  moduleBlock: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default DiplomeDetail;
