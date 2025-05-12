import { formationsApi } from '@/services/formations';
import { BACKEND_URL_IMAGES } from '@/utils/api';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Formation {
  id: number;
  titre: string;
  description: string;
  type: string;
  image?: string;
}

export default function FormationDetails(): JSX.Element {
    const [formation, setFormation] = useState<Formation | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchFormation = async () => {
            try {
                setLoading(true);
                const response = await formationsApi.getFormationById(id.toString());
                setFormation(response.data);
            } catch (error) {
                console.error('Error fetching formation:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFormation();
    }, [id]);
    
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000077" />
            </View>
        );
    }

    if (!formation) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Formation non trouvée</Text>
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
                    title: "Détails de la Formation",
                    headerStyle: {
                        backgroundColor: '#000077',
                    },
                    headerTintColor: '#fff',
                }} 
            />
            <ScrollView style={styles.container}>
                {formation.image && (
                    <Image 
                        source={{ uri: `${BACKEND_URL_IMAGES}/${formation.image}` }} 
                        style={styles.image} 
                    />
                )}
                <View style={styles.content}>
                    <Text style={styles.title}>{formation.titre}</Text>
                    
                    <View style={styles.infoSection}>
                        {renderInfoRow('Type', formation.type)}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.sectionText}>{formation.description}</Text>
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
        textTransform: 'capitalize',
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
        textTransform: 'capitalize',
    },
    infoValue: {
        flex: 2,
        fontSize: 14,
        color: '#333',
        textTransform: 'capitalize',
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
        textTransform: 'capitalize',
    },
    sectionBtn: {
        flexDirection: 'column',
        marginTop: 20,
        gap: 10,
    },
});

