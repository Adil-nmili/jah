import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import DiplomesCard from "@/components/DiplomesCard";
import SectionTitle from "@/components/SectionTitle";
import { diplomesApi } from "@/services/diplomes";

export default function DiplomesTab() {
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [expanded, setExpanded] = useState({}); // { [categoryId]: boolean }
  const [diplomeData, setDiplomeData] = useState([]);
  const [technicienData, setTechnicienData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [technicienSpecialiseData, setTechnicienSpecialiseData] = useState([]);
  const [licenceProfessionnelleData, setLicenceProfessionnelleData] = useState(
    []
  );
  const [masterProfessionnelData, setMasterProfessionnelData] = useState([]);

  useEffect(() => {
    try {
      const fetchDiplomes = async () => {
        const res = await diplomesApi.getDiplomes();
        if (res.status === 200) {
          setDiplomeData(res.data);
        }
      };
      fetchDiplomes();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (diplomeData.length > 0) {
      setTechnicienData(
        diplomeData.filter((diplome: any) => diplome.niveau === "Technicien")
      );
      setQualificationData(
        diplomeData.filter(
          (diplome: any) => diplome.niveau === "Qualification"
        )
      );
      setTechnicienSpecialiseData(
        diplomeData.filter(
          (diplome: any) => diplome.niveau === "Technicien Spécialisé"
        )
      );
      setLicenceProfessionnelleData(
        diplomeData.filter(
          (diplome: any) => diplome.niveau === "Licence Professionnelle"
        )
      );
      setMasterProfessionnelData(
        diplomeData.filter(
          (diplome: any) => diplome.niveau === "Master Professionnel"
        )
      );
    }
    console.log(diplomeData);
  }, [diplomeData]);

  const description = [
    {
      id: 1,
      titre: "Diplôme de Technicien Spécialisé",
      description:
        "Le diplôme de technicien spécialisé est une certification professionnelle de haut niveau, délivrée à l'issue d'une formation approfondie alliant théorie et pratique dans un domaine spécifique. Il vise à former des profils qualifiés, capables d'assumer des responsabilités techniques et parfois managériales au sein d'entreprises, d'administrations ou d'organisations diverses.",
    },
    {
      id: 2,
      titre: "Diplôme de Qualification",
      description:
        "Le diplôme de qualification est une reconnaissance officielle des compétences et des savoir-faire acquis dans un domaine professionnel précis. Il atteste que son titulaire possède les aptitudes nécessaires pour exercer un métier de manière efficace et autonome. Accessible aux candidats titulaires d’un niveau 9ᵉ année de l’enseignement fondamental (9 AEF) ou plus, ce diplôme est délivré à l’issue d’une formation technique ou professionnelle. Il constitue une véritable passerelle vers le marché de l’emploi et une étape essentielle dans la construction d’un parcours professionnel solide.",
    },
    {
      id: 3,
      titre: "Diplôme de Technicien",
      description:
        "Le diplôme de technicien est une certification professionnelle qui atteste l'acquisition de compétences techniques spécialisées dans un domaine donné. Il permet au titulaire de maîtriser des outils, des méthodes et des savoir-faire lui permettant d’intervenir efficacement dans des situations concrètes de travail. Ce diplôme est accessible aux candidats ayant un niveau 2ᵉ année du baccalauréat ou titulaires d’un diplôme de qualification. Il ouvre la voie à une insertion rapide sur le marché du travail, tout en permettant la poursuite éventuelle d’études supérieures dans le même secteur.",
    },
    {
      id: 4,
      titre: "Diplôme de Licence Professionnelle",
      description:
        "La licence professionnelle est une formation de niveau Bac+3 qui vise à préparer les étudiants à une insertion rapide et efficace dans le monde du travail. Conçue en étroite collaboration avec les secteurs professionnels, elle allie savoirs académiques et compétences pratiques à travers des stages, des projets concrets et des enseignements adaptés aux besoins du marché. Cette formation permet aux étudiants de se spécialiser dans un domaine précis, tout en acquérant une solide expérience professionnelle. Elle représente un véritable tremplin vers l’emploi ou la poursuite d’études supérieures, notamment en master professionnel.",
    },
    {
      id: 5,
      titre: "Diplôme de Master Professionnel",
      description:
        "Le master professionnel est une formation de niveau Bac+5 qui vise à former des cadres hautement qualifiés, capables de répondre aux exigences du monde de l’entreprise et des institutions. Alliant théorie avancée et pratique professionnelle, il permet aux étudiants d’approfondir leurs compétences techniques, managériales et opérationnelles dans un domaine spécifique. Grâce à une pédagogie orientée vers les projets, les stages en entreprise et l’intervention de professionnels, le master professionnel prépare efficacement à l’insertion dans des fonctions à responsabilité ou à la création d’entreprise. Il constitue un choix stratégique pour construire une carrière solide et évolutive.",
    },
  ];

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
        avec l'éducation et des carrières sur mesure
      </Text>

      {technicienSpecialiseData.length > 0 ? (
        <View>
          <Text style={styles.diplomeFiliere}>{description[0].titre}</Text>
          <Text
            numberOfLines={isHeroExpanded ? undefined : 3}
            style={styles.diplomeDescription}
          >
            {description[0].description}
          </Text>
          <TouchableOpacity
            onPress={() => setIsHeroExpanded(!isHeroExpanded)}
            style={styles.seeMoreButton}
          >
            <Text style={styles.seeMoreText}>
              {isHeroExpanded ? "Voir Moins" : "Voir Plus"}
            </Text>
          </TouchableOpacity>
          {technicienSpecialiseData.map((diplome: any) => (
            <DiplomesCard
              key={diplome.id}
              id={diplome.id}
              titre={diplome.nom}
              image={diplome.image}
            />
          ))}
        </View>
      ) : (
        ""
      )}
      {qualificationData.length > 0 ? (
        <View>
          <Text style={styles.diplomeFiliere}>{description[1].titre}</Text>
          <Text
            numberOfLines={isHeroExpanded ? undefined : 3}
            style={styles.diplomeDescription}
          >
            {description[1].description}
          </Text>
          <TouchableOpacity
            onPress={() => setIsHeroExpanded(!isHeroExpanded)}
            style={styles.seeMoreButton}
          >
            <Text style={styles.seeMoreText}>
              {isHeroExpanded ? "Voir Moins" : "Voir Plus"}
            </Text>
          </TouchableOpacity>
          {qualificationData.map((diplome: any) => (
            <DiplomesCard
              key={diplome.id}
              id={diplome.id}
              titre={diplome.nom}
              image={diplome.image}
            />
          ))}
        </View>
      ) : (
        ""
      )}
      {technicienData.length > 0 ? (
        <View>
          <Text style={styles.diplomeFiliere}>{description[2].titre}</Text>
          <Text
            numberOfLines={isHeroExpanded ? undefined : 3}
            style={styles.diplomeDescription}
          >
            {description[2].description}
          </Text>
          <TouchableOpacity
            onPress={() => setIsHeroExpanded(!isHeroExpanded)}
            style={styles.seeMoreButton}
          >
            <Text style={styles.seeMoreText}>
              {isHeroExpanded ? "Voir Moins" : "Voir Plus"}
            </Text>
          </TouchableOpacity>
          {technicienData.map((diplome: any) => (
            <DiplomesCard
              key={diplome.id}
              id={diplome.id}
              titre={diplome.nom}
              image={diplome.image}
            />
          ))}
        </View>
      ) : (
          ""
      )}
      {licenceProfessionnelleData.length > 0 ? (
        <View>
          <Text style={styles.diplomeFiliere}>{description[3].titre}</Text>
          <Text
            numberOfLines={isHeroExpanded ? undefined : 3}
            style={styles.diplomeDescription}
          >
            {description[3].description}
          </Text>
          <TouchableOpacity
            onPress={() => setIsHeroExpanded(!isHeroExpanded)}
            style={styles.seeMoreButton}
          >
            <Text style={styles.seeMoreText}>
              {isHeroExpanded ? "Voir Moins" : "Voir Plus"}
            </Text>
          </TouchableOpacity>
          {licenceProfessionnelleData.map((diplome: any) => (
            <DiplomesCard
              key={diplome.id}
              id={diplome.id}
              titre={diplome.nom}
              image={diplome.image}
            />
          ))}
        </View>
      ) : (
        ""
      )}
      {masterProfessionnelData.length > 0 ? (
        <View>
          <Text style={styles.diplomeFiliere}>{description[4].titre}</Text>
          <Text
            numberOfLines={isHeroExpanded ? undefined : 3}
            style={styles.diplomeDescription}
          >
            {description[4].description}
          </Text>
          <TouchableOpacity
            onPress={() => setIsHeroExpanded(!isHeroExpanded)}
            style={styles.seeMoreButton}
          >
            <Text style={styles.seeMoreText}>
              {isHeroExpanded ? "Voir Moins" : "Voir Plus"}
            </Text>
          </TouchableOpacity>
          {masterProfessionnelData.map((diplome: any) => (
            <DiplomesCard
              key={diplome.id}
              id={diplome.id}
              titre={diplome.nom}
              image={diplome.image}
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
  diplomeFiliere: {
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
  diplomeDescription: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#000",
    textAlign: "left",
  },
});
