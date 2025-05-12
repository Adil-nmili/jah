import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Objectif {
  id: number;
  title: string;
  number: number;
  icon: string;
}

const objectifs: Objectif[] = [
  {
    id: 1,
    title: "Formations",
    number: 22,
    icon: "newspaper-outline",
  },
  {
    id: 2,
    title: "Etudiants",
    icon: "book",
    number: 2200,
  },
  {
    id: 3,
    title: "Diplômats",
    icon: "medal-outline",
    number: 1600,
  },
];

export default function ObjectifCard(): JSX.Element {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {objectifs.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={[
            styles.objectifCard, 
            hoveredCard === item.id && styles.objectifCardHover
          ]} 
          onPress={() => setHoveredCard(item.id)}
          onPressIn={() => setHoveredCard(item.id)}
          onPressOut={() => setHoveredCard(null)}
        >
          <Ionicons 
            name={item.icon as any} 
            size={40} 
            style={[
              styles.objectifCardIcon, 
              hoveredCard === item.id && styles.objectifCardIconHover
            ]}
          />
          <Text style={styles.objectifCardText}>+{item.number}</Text>
          <Text style={styles.objectifCardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  objectifCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f28c07',
    padding: 10,
    width: '48%',
    borderWidth: 2,
    borderColor: '#f28c07',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  objectifCardText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  objectifCardIcon: {
    color: '#fff',
  },
  objectifCardHover: {
    backgroundColor: '#f28c07',
  },
  objectifCardIconHover: {
    color: '#fff',
  },
});
