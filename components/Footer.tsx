import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

type RoutePath = '/' | '/diplomes' | '/formations' | '/albums' | '/contact';

export default function Footer(): JSX.Element {
  const router = useRouter();

  const handleEmailPress = (): void => {
    Linking.openURL('mailto:jah.informatique@gmail.com');
  };

  const handlePhonePress = (phone: string): void => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleLocationPress = (): void => {
    Linking.openURL('https://maps.google.com/?q=Lo+Houssna+2+Mhamid+Marrakech');
  };

  const handleRoutePress = (route: string): void => {
    router.push(route as any);
  };
  const handleFbIconPress = (): void => {
    Linking.openURL('https://www.facebook.com/EcoleJahInformatique');
  }
  const handleInstaIconPress = (): void => {
    Linking.openURL('https://www.instagram.com/jahinformatiqueplus/');
  }
  const handleYoutubeIconPress = (): void => {
    Linking.openURL('https://www.youtube.com/@jahinformatique');
  }
  const handleURLroute = (url: string): void => {
    Linking.openURL(url);
  }

  return (
    <View style={styles.footer}>
      {/* Jah Informatiques Plus Section */}
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/EcoleJahInformatique')}>
            <FontAwesome name="map-marker"  size={20} color="#0EB582" />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Jah Informatiques Plus</Text>
        </View>
        <Text style={styles.description}>
          JAH INFORMATIQUE PLUS est une école de formation professionnelle privée.
        </Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity 
          onPress={() => handleFbIconPress()}
          style={styles.socialButton}>
            <FontAwesome name="facebook" size={24} color="#0EB582" />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => handleYoutubeIconPress()}
          style={styles.socialButton}>
            <FontAwesome name="youtube-play" size={24} color="#0EB582" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Liens Rapides Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liens Rapides</Text>
        <TouchableOpacity onPress={() => handleRoutePress('/')}>
          <Text style={styles.link}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleRoutePress('/formations')}>
          <Text style={styles.link}>Formations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRoutePress('/albums')}>
          <Text style={styles.link}>Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRoutePress('/Contact')}>
          <Text style={styles.link}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Contactez-Nous Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contactez-Nous</Text>
        <TouchableOpacity onPress={handleEmailPress} style={styles.contactItem}>
          <FontAwesome name="envelope" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.contactText}>jah.informatique@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLocationPress} style={styles.contactItem}>
          <FontAwesome name="map-marker" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.contactText}>Lo Houssna 2 Mhamid (coté de mosquée al mohcininie Marrakech)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePhonePress('+212524371619')} style={styles.contactItem}>
          <FontAwesome name="phone" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.contactText}>+212 5 24 37 16 19</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePhonePress('+212661729887')} style={styles.contactItem}>
          <FontAwesome name="phone" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.contactText}>+212 6 61 72 98 87</Text>
        </TouchableOpacity>
      </View>

      {/* Liens Utiles Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liens Utiles</Text>
        <TouchableOpacity style={styles.concateTextIcon} onPress={() => handleURLroute('https://www.facebook.com/profile.php?id=100086303923903')}>
          <FontAwesome name="facebook" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.link}>Ecole Jah Marrakech Département Santé et Beauté</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.concateTextIcon} onPress={() => handleURLroute('https://www.facebook.com/EcoleJahModeliste')}>
          <FontAwesome name="facebook" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.link}>Ecole JAH Marrakech Modélisme Stylisme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.concateTextIcon} onPress={() => handleURLroute('https://www.facebook.com/EcoleJahEPS')}>
          <FontAwesome name="facebook" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.link}>Ecole JAH Education Physique et Sportive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.concateTextIcon} onPress={() => handleURLroute('https://www.facebook.com/profile.php?id=100086481996373')}>
          <FontAwesome name="facebook" size={16} color="#0EB582" style={styles.contactIcon} />
          <Text style={styles.link}>Ecole JAH des Métiers Marrakech</Text>
        </TouchableOpacity>
      </View>

      {/* Copyright Section */}
      <View style={styles.copyright}>
        <Text style={styles.copyright}>
          Copyright © {new Date().getFullYear()} Jah Informatique Plus -All Right Reserved
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#E8F5F1',
    padding: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#333333',
    marginBottom: 15,
    marginLeft: 8,
    backgroundColor: 'transparent',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  socialButton: {
    marginRight: 15,
  },
  link: {
    fontSize: 14,
    color: '#666666',
    // marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  contactItem: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 10,
    marginTop: 3,
  },
  contactText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 20,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  copyrightText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    backgroundColor: 'transparent',
  },
  concateTextIcon: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    marginBottom: 12,
  },
}); 