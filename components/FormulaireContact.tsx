import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // avec Expo
import SectionTitle from '@/components/SectionTitle';

interface FormulaireContactProps {
  onFormSubmit?: () => void;
}

const FormulaireContact: React.FC<FormulaireContactProps> = ({ onFormSubmit }) => {
  const [nom, setNom] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [objet, setObjet] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [focusedInput, setFocusedInput] = useState<string>('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(randomCode);
  };

  const handleSubmit = () => {
    if (!nom || !email || !objet || !message) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (captcha !== captchaCode) {
      Alert.alert('Erreur CAPTCHA', 'Le code saisi est incorrect.');
      generateCaptcha();
      setCaptcha('');
      return;
    }

    const subject = encodeURIComponent(`Objet: ${objet}`);
    const body = encodeURIComponent(
      `Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoUrl = `mailto:jah.informatique@gmail.com?subject=${subject}&body=${body}`;

    Linking.openURL(mailtoUrl)
      .then(() => {
        Alert.alert('Succès', 'Votre application mail va s’ouvrir.');
      })
      .catch(() => {
        Alert.alert('Erreur', 'Impossible d’ouvrir l’application mail.');
      });

    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  const handleCall = () => {
    Linking.openURL('tel:+212661729887');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:jah.informatique@gmail.com');
  };

  const handleLocation = () => {
    Linking.openURL('https://www.google.com/maps?q=Lot+al+Houssna+2+N%C2%B0697+Mhamid,+Marrakech');
  };

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={[styles.input, focusedInput === 'nom' && styles.inputFocused]}
        placeholder="Nom et prénom"
        value={nom}
        onChangeText={setNom}
        onFocus={() => handleFocus('nom')}
        onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
        placeholder="Votre email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, focusedInput === 'objet' && styles.inputFocused]}
        placeholder="Objet"
        value={objet}
        onChangeText={setObjet}
        onFocus={() => handleFocus('objet')}
        onBlur={handleBlur}
      />
      <TextInput
        style={[styles.input, styles.textArea, focusedInput === 'message' && styles.inputFocused]}
        placeholder="Je veux dire que..."
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        onFocus={() => handleFocus('message')}
        onBlur={handleBlur}
      />

      <Text style={styles.captchaLabel}>Entrer le texte dans l'image</Text>
      <View style={styles.captchaContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }, focusedInput === 'captcha' && styles.inputFocused]}
          placeholder="Code"
          value={captcha}
          onChangeText={setCaptcha}
          keyboardType="numeric"
          onFocus={() => handleFocus('captcha')}
          onBlur={handleBlur}
        />
        <TouchableOpacity style={styles.captchaBox} onPress={generateCaptcha}>
          <Text style={styles.captchaText}>{captchaCode}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>ENVOYER</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <SectionTitle title="Contact Information" />
        <Text style={styles.cardSubtitle}>
          Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.
        </Text>

        <View style={styles.contactItem}>
          <FontAwesome5 name="phone" size={18} color="black" />
          <TouchableOpacity onPress={handleCall}>
            <Text style={styles.contactText}>+212 6 61 72 98 87</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactItem}>
          <FontAwesome5 name="envelope" size={18} color="black" />
          <TouchableOpacity onPress={handleEmail}>
            <Text style={styles.contactText}>jah.informatique@gmail.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactItem}>
          <FontAwesome5 name="map-pin" size={18} color="black" />
          <TouchableOpacity onPress={handleLocation}>
            <Text style={styles.contactText}>Lot al Houssna 2 N°697 Mhamid, Marrakech</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FormulaireContact;

const styles = StyleSheet.create({
  form: { marginBottom: 32,
    paddingHorizontal: 16,
   },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  inputFocused: {
    borderColor: '#0066cc', // Couleur du bord quand l'input est en focus
    backgroundColor: '#f0f8ff', // Ajout d'une légère couleur d'arrière-plan pour l'effet de focus
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  captchaLabel: { fontWeight: 'bold' },
  captchaContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 16,
  },
  captchaBox: {
    backgroundColor: '#0000FF',
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    height: 45,
  },
  captchaText: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Card Style
  card: { marginTop: 32, padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  cardSubtitle: { fontSize: 14, marginBottom: 16, color: '#666' },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  contactText: { fontSize: 16, marginLeft: 10, color: '#0066cc' },
});