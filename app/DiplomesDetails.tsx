import { diplomesApi } from '@/services/diplomes';
import { BACKEND_URL_IMAGES } from '@/utils/api';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Navigation } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Button } from 'react-native';

interface Diplome {
  id: number;
  nom: string;
  sousnom: string;
  description: string;
  competences: string;
  metieres: string;
  conditions_admission: string;
  duree: string;
  effectif: string;
  piece_a_fournir: string;
  reconnu_par_letat: string;
  niveau: string;
  filiere: string;
  type: string;
  image?: string;
  bourse: string | null;
}

export default function DiplomeDetails(): JSX.Element {
    const [diplome, setDiplome] = useState<Diplome | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchDiplome = async () => {
            try {
                setLoading(true);
                const response = await diplomesApi.getDiplomeById(id.toString());
                setDiplome(response.data);
            } catch (error) {
                console.error('Error fetching diplome:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDiplome();
    }, [id]);
    
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000077" />
            </View>
        );
    }

    if (!diplome) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Diplôme non trouvé</Text>
            </View>
        );
    }

    const renderInfoRow = (label: string, value: string | null) => {
        if (!value) return null;
        return (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        );
    };

    return (
        <>
            <Stack.Screen 
                options={{
                    title: "Détails du Diplôme",
                    headerStyle: {
                        backgroundColor: '#000077',
                    },
                    headerTintColor: '#fff',
                }} 
            />
            <ScrollView style={styles.container}>
                {diplome.image && (
                    <Image 
                        source={{ uri: `${BACKEND_URL_IMAGES}/${diplome.image}` }} 
                        style={styles.image} 
                    />
                )}
                <View style={styles.content}>
                    <Text style={styles.title}>{diplome.nom}</Text>
                    <Text style={styles.subtitle}>{diplome.sousnom}</Text>
                    
                    <View style={styles.infoSection}>
                        {renderInfoRow('Niveau', diplome.niveau)}
                        {renderInfoRow('Filière', diplome.filiere)}
                        {renderInfoRow('Type', diplome.type)}
                        {renderInfoRow('Durée', diplome.duree)}
                        {renderInfoRow('Effectif', diplome.effectif)}
                        {renderInfoRow('Conditions d\'admission', diplome.conditions_admission)}
                        {renderInfoRow('Reconnu par l\'État', diplome.reconnu_par_letat)}
                        {renderInfoRow('Bourse', diplome.bourse)}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.sectionText}>{diplome.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Compétences</Text>
                        <Text style={styles.sectionText}>{diplome.competences}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Métiers</Text>
                        <Text style={styles.sectionText}>{diplome.metieres}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pièces à fournir</Text>
                        <Text style={styles.sectionText}>{diplome.piece_a_fournir}</Text>
                    </View>
                    <View style={styles.sectionBtn}>
                    <Button
                        title="Inscription"
                        onPress={() => router.push('/Inscrire')}
                        color="#000077"
                    />
                    <Button
                        title="Retour"
                        onPress={() => router.back()}
                        color="#666"
                        
                    />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 0,
    },
    content: {
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000077',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    infoSection: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    infoLabel: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#000077',
    },
    infoValue: {
        flex: 2,
        fontSize: 14,
        color: '#333',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000077',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    sectionBtn: {
        flexDirection: 'column',
        marginTop: 20,
        gap: 10,
    },
});

