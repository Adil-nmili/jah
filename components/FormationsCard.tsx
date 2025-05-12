import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_URL_IMAGES } from '@/utils/api';
import { useRouter } from 'expo-router';
interface FormationsCardProps {
  titre: string;
  image: string;
  id: number;
}

export default function FormationsCard({ titre, image, id }: FormationsCardProps): JSX.Element {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <Image source={{ uri: `${BACKEND_URL_IMAGES}/${image}` }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{titre}</Text>
        <TouchableOpacity
          onPress={() => {
            router.push({
                pathname: "/FormationDetails",
                params: {
                  id: id.toString(),
                },
            });
          }}
          style={styles.button}
          >
            <Text style={styles.buttonText}>
            <Ionicons
              name="pricetags"
              size={12}
              style={{ marginRight: 5 }}
              color="#000077"
            /> 
            En savoir plus
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 110,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: "100%",
    borderRadius: 5,
    objectFit: "cover",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000077",
    textAlign: "left",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  button: {
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#000077",
    fontWeight: "normal",
    textDecorationLine: "underline",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    
  },
});
