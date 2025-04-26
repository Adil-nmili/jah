import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from 'expo-router';

const Inscription = () => {
  const { titre } = useLocalSearchParams();
 

  const [nom, setNom] = useState('');
  const [cin, setCIN] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [niveau, setNiveau] = useState('');
  const [email, setEmail] = useState('');
  // const [photoCIN, setPhotoCIN] = useState<any>(null);
  // const [photoID, setPhotoID] = useState<any>(null);
  const [agree, setAgree] = useState(false);
  const [method, setMethod] = useState('');

  const pickFile = async (setFile: (file: any) => void) => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.assets && result.assets.length > 0) {
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!nom || !cin || !telephone || !niveau || !agree) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const subject = `Inscription de ${nom}`;
    const body = `
      Nom et Prénom: ${nom}
      Numéro de CIN: ${cin}
      Adresse: ${adresse}
      Téléphone: ${telephone}
      Niveau Scolaire: ${niveau}
      Email: ${email}
      Formation Choisie: ${titre}
      Méthode de paiement: ${method}
      `;
      // Photo CIN: ${photoCIN ? photoCIN.uri : 'Non fournie'}
      // Photo d'identité: ${photoID ? photoID.uri : 'Non fournie'}
    
    const emailLink = `mailto:jah.informatique@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(emailLink).catch((err) => {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le client de messagerie.');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Formulaire d'inscription</Text>
      

      <Text style={styles.label}>Nom et Prénom *</Text>
      <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Votre nom et prénom" />

      <Text style={styles.label}>Numéro de CIN *</Text>
      <TextInput style={styles.input} value={cin} onChangeText={setCIN} placeholder="Numéro de CIN" />

      <Text style={styles.label}>Adresse</Text>
      <TextInput style={styles.input} value={adresse} onChangeText={setAdresse} placeholder="Adresse" />

      <Text style={styles.label}>Numéro de téléphone *</Text>
      <TextInput style={styles.input} value={telephone} onChangeText={setTelephone} placeholder="Téléphone" keyboardType="phone-pad" />

      <Text style={styles.label}>Niveau Scolaire *</Text>
      {['Aucun', '3AF', '2ème Année BAC', 'BAC ou Plus'].map((option) => (
        <TouchableOpacity key={option} style={styles.radioOption} onPress={() => setNiveau(option)}>
          <Text>{niveau === option ? '🔘' : '⚪️'} {option}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Formation Choisie</Text>
      <TextInput style={[styles.input, { backgroundColor: '#eee' }]} value={titre as string} editable={false} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="exemple@email.com" />

      {/* Affichage de l'aperçu de la CIN */}
      {/* <Text style={styles.label}>Photo de la CIN :</Text>
      <TouchableOpacity style={styles.fileButton} onPress={() => pickFile(setPhotoCIN)}>
        <Text>📎 Sélectionner un fichier</Text>
      </TouchableOpacity> */}
      {/* {photoCIN && (
        <View style={styles.imagePreviewContainer}>
          <Text style={styles.fileName}>{photoCIN.name}</Text>
          <Image source={{ uri: photoCIN.uri }} style={styles.imagePreview} />
        </View>
      )} */}

      {/* Affichage de l'aperçu de la photo d'identité */}
      {/* <Text style={styles.label}>Photo d'identité :</Text>
      <TouchableOpacity style={styles.fileButton} onPress={() => pickFile(setPhotoID)}>
        <Text>📎 Sélectionner un fichier</Text>
      </TouchableOpacity>
      {photoID && (
        <View style={styles.imagePreviewContainer}>
          <Text style={styles.fileName}>{photoID.name}</Text>
          <Image source={{ uri: photoID.uri }} style={styles.imagePreview} />
        </View>
      )} */}

      <View style={styles.checkboxContainer}>
        <Checkbox value={agree} onValueChange={setAgree} />
        <Text style={{ marginLeft: 8 }}>J'accepte les règles de l'école *</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Inscrire</Text>
      </TouchableOpacity>

      <Text style={styles.paymentLabel}>Méthode de paiement :</Text>
      {['1 - paiement par RIB', '2 - paiement par Wafacash', '3 - paiement en espèces'].map((m, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.paymentOption, method === m && { backgroundColor: '#d1e7dd' }]}
          onPress={() => setMethod(m)}
        >
          <Text>{m}</Text>
        </TouchableOpacity>
      ))}
      {method === '1 - paiement par RIB' && (
        <Text style={styles.ribText}>
          🔴 Références bancaires (RIB) : N’utilisez jamais Compte bancaire Attijariwafa bank numéro 00745000010600200400421815.
        </Text>
      )}

      {method === '2 - paiement par Wafacash' && (
        <Text style={styles.ribText}>
          🟠 Nom du bénéficiaire : Nouiti Jamal
        </Text>
      )}

      {method === '3 - paiement en espèces' && (
        <Text style={styles.ribText}>
          🟢 Veuillez nous rendre visite à l'institution à l'adresse :{'\n'}
          Lot Houssna 2 Mhamid (côté de la mosquée Al Mouhcinine, Marrakech)
        </Text>
      )}

    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#0a3d62',
  },
  label: {
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  radioOption: {
    paddingVertical: 6,
  },
  fileButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  fileName: {
    fontStyle: 'italic',
    marginBottom: 15,
  },
  imagePreviewContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentLabel: {
    marginTop: 30,
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  paymentOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  ribText: {
    color: '#b22222',
    fontSize: 14,
    marginTop: 10,
  },
});

export default Inscription;
