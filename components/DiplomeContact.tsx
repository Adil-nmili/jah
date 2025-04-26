import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const Contact = () => {
  const contact = {
    responsable: 'Prof Jamal NOUITI',
    email: 'jah.informatique@gmail.com',
    telephone: '05 24 37 16 19 / 06 61 72 98 87',
    whatsapp: 'https://wa.me/212661729887',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <Text style={styles.description}>Responsable de la filière : {contact.responsable}</Text>
      <Text style={styles.description}>Email : {contact.email}</Text>
      <Text style={styles.description}>Téléphone : {contact.telephone}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(contact.whatsapp)}>
        <Text style={styles.link}>📱 WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  description: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 8,
  },
});

export default Contact;
