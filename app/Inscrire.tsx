import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Linking, Platform, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { registerEtudiant } from '@/services/register';
import { Picker } from '@react-native-picker/picker';
import { formationsApi } from '@/services/formations';
import { diplomesApi } from '@/services/diplomes';

const steps = [
  { key: 'personal', label: 'Personal Info', icon: 'person' },
  { key: 'education', label: 'Education', icon: 'school' },
  { key: 'documents', label: 'Documents', icon: 'insert-drive-file' },
  { key: 'payment', label: 'Payment', icon: 'payment' },
];

export default function Inscription() {
  const [step, setStep] = useState(0);
  const [formations, setFormations] = useState([]);
  const [diplomes, setDiplomes] = useState([]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [sin, setSin] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [formation, setFormation] = useState('');
  const [photoSin, setPhotoSin] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [photoId, setPhotoId] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('');

  // Custom Alert Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await formationsApi.getFormations();
        setFormations(response.data);
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };

    const fetchDiplomes = async () => {
      try {
        const response = await diplomesApi.getDiplomes();
        setDiplomes(response.data);
      } catch (error) {
        console.error('Error fetching diplomes:', error);
      }
    };

    fetchFormations();
    fetchDiplomes();
  }, []);

  // File pickers
  const pickFile = async (setter: (file: any) => void) => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.assets && result.assets.length > 0) {
      setter(result.assets[0]);
    }
  };

  // Step navigation
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Submission
  const handleSubmit = async () => {
    if (!fullName || !phone || !sin || !email || !address || !schoolLevel || !formation) {
      setModalType('error');
      setModalMessage('Please fill all required fields.');
      setModalVisible(true);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('nom_complet', fullName);
      formData.append('telephone', phone);
      formData.append('sin', sin);
      formData.append('email', email);
      formData.append('adresse', address);
      formData.append('niveau_etude', schoolLevel);
      formData.append('formation_id', formation);
      if (photoSin) {
        formData.append('cin_image', {
          uri: photoSin.uri,
          type: photoSin.mimeType || 'image/jpeg',
          name: photoSin.name || 'cin_image.jpg',
        });
      }
      if (photoId) {
        formData.append('photo_id', {
          uri: photoId.uri,
          type: photoId.mimeType || 'image/jpeg',
          name: photoId.name || 'photo_id.jpg',
        });
      }
      formData.append('methode_paiement', paymentMethod);

      const response = await registerEtudiant.register(formData);
      setModalType('success');
      setModalMessage('Registration submitted!');
      setModalVisible(true);
    } catch (error) {
      console.log('Registration error:', error?.response?.data || error.message || error);
      setModalType('error');
      setModalMessage('Registration failed!');
      setModalVisible(true);
    }
  };

  // Stepper UI
  const Stepper = () => (
    <View style={styles.stepper}>
      {steps.map((s, idx) => (
        <View key={s.key} style={styles.stepItem}>
          <View style={[
            styles.stepCircle,
            step === idx ? styles.stepCircleActive : step > idx ? styles.stepCircleDone : {},
          ]}>
            <MaterialIcons name={s.icon as any} size={24} color={step >= idx ? '#fff' : '#aaa'} />
          </View>
          <Text style={[
            styles.stepLabel,
            step === idx ? styles.stepLabelActive : {},
          ]}>{s.label}</Text>
        </View>
      ))}
    </View>
  );

  // Custom Alert Modal Component
  const CustomAlert = ({ visible, message, type, onClose }: { visible: boolean, message: string, type: 'success' | 'error', onClose: () => void }) => (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalBox, type === 'success' ? styles.successBox : styles.errorBox]}>
          <Text style={styles.modalTitle}>{type === 'success' ? 'Success' : 'Error'}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
            <Text style={styles.modalBtnText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Ionicons name="person" size={18} color="#0077b6" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
              </View>
              <View style={styles.inputGroup}>
                <Ionicons name="call" size={18} color="#0077b6" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <FontAwesome5 name="id-card" size={16} color="#0077b6" style={styles.icon} />
                <TextInput style={styles.input} placeholder="SIN" value={sin} onChangeText={setSin} />
              </View>
              <View style={styles.inputGroup}>
                <MaterialIcons name="email" size={18} color="#0077b6" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <MaterialIcons name="home" size={18} color="#0077b6" style={styles.icon} />
              <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <MaterialIcons name="school" size={18} color="#0077b6" style={styles.icon} />
                <TextInput style={styles.input} placeholder="School Level" value={schoolLevel} onChangeText={setSchoolLevel} />
              </View>
              <View style={styles.inputGroup}>
                <MaterialIcons name="assignment" size={18} color="#0077b6" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Formation" value={formation} onChangeText={setFormation} />
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.label}>Photo SIN</Text>
            <TouchableOpacity style={styles.fileButton} onPress={() => pickFile(setPhotoSin)}>
              <Text>{photoSin ? (photoSin as any).name : 'Choose File'}</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Photo Identity</Text>
            <TouchableOpacity style={styles.fileButton} onPress={() => pickFile(setPhotoId)}>
              <Text>{photoId ? (photoId as any).name : 'Choose File'}</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.paymentTitle}>Payment Methods</Text>
            <View style={styles.paymentMethods}>
              <TouchableOpacity style={[styles.paymentBox, paymentMethod === 'rib' && styles.paymentBoxActive]} onPress={() => setPaymentMethod('rib')}>
                <Text style={styles.paymentBoxTitle}>1 - Payment by Rib</Text>
                <Text style={styles.paymentBoxText}>Bank References (RIB): <Text style={{ color: '#0077b6' }}>Nouti Jamal</Text>{'\n'}Compte bancaire Attijari Wafa Bank, numéro 00745000106200030042318</Text>
                <TouchableOpacity style={styles.showMoreBtn}><Text style={styles.showMoreText}>Show More</Text></TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.paymentBox, paymentMethod === 'wafacash' && styles.paymentBoxActive]} onPress={() => setPaymentMethod('wafacash')}>
                <Text style={styles.paymentBoxTitle}>2 - Payment by Wafacash</Text>
                <Text style={styles.paymentBoxText}>Name: <Text style={{ color: '#0077b6' }}>Nouti Jamal</Text></Text>
                <TouchableOpacity style={styles.showMoreBtn}><Text style={styles.showMoreText}>Show More</Text></TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.paymentBox, paymentMethod === 'cash' && styles.paymentBoxActive]} onPress={() => setPaymentMethod('cash')}>
                <Text style={styles.paymentBoxTitle}>3 - Payment in Cash</Text>
                <Text style={styles.paymentBoxText}>Please visit us at the institution at the address: <Text style={{ color: '#b22222' }}>Lo Houssna 2 Mhamid (côté de mosquée al Mouhcininie Marrakech)</Text></Text>
                <TouchableOpacity style={styles.showMoreBtn}><Text style={styles.showMoreText}>Show More</Text></TouchableOpacity>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <CustomAlert
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={() => setModalVisible(false)}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Registration Form</Text>
        <Stepper />
        <View style={styles.stepContent}>
          {renderStep()}
        </View>
        <View style={styles.stepNav}>
          {step > 0 && (
            <TouchableOpacity style={styles.navBtn} onPress={prevStep}>
              <Text style={styles.navBtnText}>Back</Text>
            </TouchableOpacity>
          )}
          {step < steps.length - 1 && (
            <TouchableOpacity style={styles.navBtn} onPress={nextStep}>
              <Text style={styles.navBtnText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: 'bold',
    color: '#0a3d62',
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 8,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: '#0077b6',
  },
  stepCircleDone: {
    backgroundColor: '#0EB582',
  },
  stepLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#0077b6',
    fontWeight: 'bold',
  },
  stepContent: {
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  fileButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
  },
  paymentTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#0a3d62',
    textAlign: 'center',
  },
  paymentMethods: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 18,
  },
  paymentBox: {
    backgroundColor: '#fffbe6',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
  },
  paymentBoxActive: {
    borderColor: '#0077b6',
    backgroundColor: '#e0f7fa',
  },
  paymentBoxTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  paymentBoxText: {
    fontSize: 13,
    marginBottom: 6,
  },
  showMoreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#0077b6',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  showMoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  navBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  navBtnText: {
    color: '#0077b6',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 300,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  successBox: {
    borderLeftWidth: 6,
    borderLeftColor: '#0EB582',
  },
  errorBox: {
    borderLeftWidth: 6,
    borderLeftColor: '#b22222',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0a3d62',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  modalBtn: {
    backgroundColor: '#0077b6',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
