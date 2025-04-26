import React from 'react';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';
import FormulaireContact from '@/components/FormulaireContact';
// import ContactMaps from '@/components/ContactMaps';
import SectionTitle from '@/components/SectionTitle';
import Footer from '@/components/Footer';

const Contact = (): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <Image source={require('@/assets/images/LOGO.jpg')} style={styles.logo} />
      <Text style={styles.subHeader}>Nous aimerions parler avec vous.</Text>

      <FormulaireContact />
      <SectionTitle title="Localisation" />
      {/* <ContactMaps /> */}

      <Footer />
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#111',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 24,
    color: '#555',
    textAlign: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 100,
  },
});
