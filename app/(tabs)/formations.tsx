import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import DiplomesCard from "@/components/DiplomesCard";
import SectionTitle from "@/components/SectionTitle";
import { formationsApi } from "@/services/formations";
import FormationsCard from "@/components/FormationsCard";
export default function Formations() {
  const [expanded, setExpanded] = useState({}); 
  const [formationData, setFormationData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [professionnelleData, setProfessionnelleData] = useState([]);


  useEffect(() => {
    try {
      const fetchFormations = async () => {
        const res = await formationsApi.getFormations();
        if (res.status === 200) {
          setFormationData(res.data);
        }
      };
      fetchFormations();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (formationData.length > 0) {
      setQualificationData(
        formationData.filter(
          (formation: any) => formation.type === "qualifiantes"
        )
      );
      setProfessionnelleData(
        formationData.filter(
          (formation: any) => formation.type === "professionnelles"
        )
      );
    }
  }, [formationData]);

  
  const toggleExpand = (id: string) => {
    setExpanded((prev: any) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={styles.container}>
      <SectionTitle title="Notre Approche" color="#000077" />
      <Text style={styles.title}>
        <Text style={{ color: "#ea982b", textDecorationLine: "underline" }}>
          Construisez votre avenir
        </Text>{" "}
        avec l'éducation et des carrières sur 
      </Text>

      {qualificationData.length > 0 ? (   
        <View>
        <Text style={styles.formationFiliere}>Formations Qualification</Text>
          {qualificationData.map((formation: any) => (
            <FormationsCard
              key={formation.id}
              id={formation.id}
              titre={formation.titre}
              image={formation.image}
            />
          ))}
        </View>
      ) : (
        ""
      )}
      {professionnelleData.length > 0 ? (
        <View>
          <Text style={styles.formationFiliere}>Formations Professionnelles</Text>
          {professionnelleData.map((formation: any) => (
            <FormationsCard
              key={formation.id}
              id={formation.id}
              titre={formation.titre}
              image={formation.image}
            />
          ))}
        </View>
      ) : (
        ""
      )}
      
      
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000077",
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: 20,
  },
  formationFiliere: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000077",
    textAlign: "left",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    backgroundColor: "#ea982b",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  seeMoreButton: {
    marginVertical: 10,
  },
  seeMoreText: {
    color: "#000077",
    fontWeight: "500",
    textAlign: "right",
    textDecorationLine: "underline",
  },
  formationDescription: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#000",
    textAlign: "left",
  },
});
