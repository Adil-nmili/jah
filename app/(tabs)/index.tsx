import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { ImageSlider } from "@/components/ImageSlider";
import SectionTitle from "@/components/SectionTitle";
import NosDiplomes from "@/components/NosDiplomes";
import ObjectifCard from "@/components/ObjectifCard";
import Caracteres from "@/components/Caracteres";
import Partenairs from "@/components/Partenairs";
import Footer from "@/components/Footer";
import { useRouter } from "expo-router";
import { BACKEND_URL_IMAGES } from "@/utils/api";
import { useEffect, useState } from "react";
import { homePageApi } from "@/services/homePage";
import StatCard from "@/components/StatCard";

interface Diplome {
  id: string;
  titre: string;
  description: string;
  icone: string;
}

interface HeroSection {
  titre: string;
  description: string;
  image: string;
}

interface Partenaire {
  id: string;
  nom: string;
  image: string;
}

interface Formation {
  id: string;
  titre: string;
  description: string;
  images: string[];
}
interface Diplome {
  id: string;
  titre: string;
  description: string;
  images: string[];
} 
interface HomePageData {
  heroEntrer: HeroSection;
  diplome: Diplome[];
  partenaires: Partenaire[];
  formations: Formation;
  diplomes: Diplome;
}

// the home page
export default function TabOneScreen() {
  const router = useRouter();
  const [homePage, setHomePage] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await homePageApi.getHomePage();
        if (res.status === 200) {
          const parsedData: HomePageData = {
            heroEntrer: res.data.entrer ? JSON.parse(res.data.entrer) : null,
            diplome: Array.isArray(res.data.diplomes)
              ? res.data.diplomes
              : JSON.parse(res.data.diplomes),
            partenaires: Array.isArray(res.data.partenaires)
              ? res.data.partenaires
              : JSON.parse(res.data.partenaires),
            formations: res.data.formations_details ? res.data.formations_details : null,
            diplomes: res.data.slider_diplomes  ? res.data.slider_diplomes : null,
          };
          setHomePage(parsedData);
          setError(null);
        } else {
          setError("Failed to fetch data from server");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => window.location.reload()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageSlider />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="school-outline" size={30} color="#000077" />
            <Text style={styles.title}>JAH INFORMATIQUE PLUS</Text>
          </View>
          <SectionTitle
            
            title={
              homePage?.heroEntrer?.titre || "Bienvenue à JAH Informatique"
            }
          />

          <View style={{ marginBottom: 20 }}>
            <Image
              source={
                homePage?.heroEntrer?.image
                  ? { uri: BACKEND_URL_IMAGES + homePage.heroEntrer.image }
                  : require("@/assets/images/LOGO.jpg")
              }
              style={styles.heroImage}
              resizeMode="cover"
              alt="Entrer Image"
            />
            <View style={styles.heroDescriptionContainer}>
              <Text 
                style={styles.heroDescription}
                numberOfLines={isHeroExpanded ? undefined : 5}
              >
                {homePage?.heroEntrer?.description || "Chargement..."}
              </Text>
              <TouchableOpacity 
                onPress={() => setIsHeroExpanded(!isHeroExpanded)}
                style={styles.seeMoreButton}
              >
                <Text style={styles.seeMoreText}>
                  {isHeroExpanded ? 'Voir Moins' : 'Voir Plus'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.statContainer}>
          <StatCard icon="ribbon-outline" target={87} label="Certificates" />
          <StatCard icon="school-outline" target={2100} label="Etudiants" />
          <StatCard icon="book-outline" target={1000} label="Formations" />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/about")}
            style={{
              backgroundColor: "#000077",
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#000077",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={styles.btnPlusText}>En Savoir Plus</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/formations")}
            style={{
              backgroundColor: "#EA982B",
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#EA982B",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={styles.btnPlusText}>Explorer les formations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepContainer}>
          <SectionTitle color="#000077" title="NOS DIPLÔMES" />
          <NosDiplomes diplome={homePage?.diplome || []} />
        </View>

        <View style={styles.stepContainer}>
          <SectionTitle color="#000077" title="Objectif de l'école" />
          <Text style={styles.objectifText}>
            Dispenser une formation de qualité aux participants motivés par une
            volonté d'évoluer dans leur carrière professionnelle. Assurer des
            formations dans des filières sélectives et répondant aux besoins des
            entreprises
          </Text>
          <ObjectifCard />
        </View>

        <View>
          <SectionTitle  title="Diplôme Officiel et Reconnu par l'Etat" />
          <Caracteres formations={homePage?.formations || { id: '', titre: '', description: '', images: [] }} />
        </View>
        <View>
          <SectionTitle  title="Obtenez Votre Diplôme" />
          <Caracteres formations={homePage?.diplomes || { id: '', titre: '', description: '', images: [] }} />
        </View>

        <View>
          <SectionTitle title="NOS PARTENAIRES" />
          <Partenairs partenaires={homePage?.partenaires || []} />
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#000077",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#0000FF",
    padding: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  heroImage: {
    width: 350,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
    minWidth: 300,
    objectFit: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#000077",
  },
  heroDescriptionContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  heroDescription: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textTransform: "capitalize",
    marginTop: 10,
    lineHeight: 14,
  },
  seeMoreButton: {
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  seeMoreText: {
    color: '#000077',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    letterSpacing: 1,
  },
  btnPlus: {
    backgroundColor: "#0000FF",
    color: "#fff",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,

    marginHorizontal: "auto",
  },
  btnPlusText: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  stepContainer: {
    fontSize: 12,
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  objectifText: {
    textAlign: "center",
    marginBottom: 20,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
  },
});
