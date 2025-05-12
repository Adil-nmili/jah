import { View, Image, StyleSheet, Text } from "react-native";

import { BACKEND_URL_IMAGES } from "@/utils/api";
interface Partner {
  image: string;
  nom: string;
}



export default function Partenairs({ partenaires }: { partenaires: Partner[] }): JSX.Element {


  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        JAH Informatique collabore avec des partenaires de renom pour offrir des formations de qualité reconnues internationalement.
      </Text>
      
      <View style={styles.partnersContainer}>
        {partenaires.map((partner, index) => (
          <View key={index} style={styles.partnerItem}>
            <Image source={{ uri: `${BACKEND_URL_IMAGES}/${partner.image}` }} style={styles.partnerImage} resizeMode="contain" />
            {partner.nom ? <Text style={styles.partnerName}>{partner.nom}</Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
  partnersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  partnerItem: {
    alignItems: 'center',
   
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  partnerImage: {
    width: '100%',
    height: '75%',
    marginBottom: 1,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

