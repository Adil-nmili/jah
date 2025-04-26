import { View, Image, StyleSheet, Text, ImageSourcePropType } from "react-native";
import cisco from '@/assets/images/cisco.png';
import fede from '@/assets/images/fede.png';
import fppa from '@/assets/images/fppa.png';
import office from '@/assets/images/office.jpg';
import LOGO from '@/assets/images/LOGO.jpg';

interface Partner {
  image: ImageSourcePropType;
  name: string;
}

const partners: Partner[] = [
  { image: cisco, name: 'Cisco' },
  { image: fede, name: 'FEDE' },
  { image: fppa, name: 'FPPA' },
  { image: office, name: 'Microsoft Office' },
  { image: LOGO, name: '' }
];

export default function Partenairs(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        JAH Informatique collabore avec des partenaires de renom pour offrir des formations de qualité reconnues internationalement.
      </Text>
      
      <View style={styles.partnersContainer}>
        {partners.map((partner, index) => (
          <View key={index} style={styles.partnerItem}>
            <Image source={partner.image} style={styles.partnerImage} resizeMode="contain" />
            {partner.name ? <Text style={styles.partnerName}>{partner.name}</Text> : null}
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
    marginBottom: 20,
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
    margin: 10,
    width: 100,
  },
  partnerImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  partnerName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
    textAlign: 'center',
  },
});

