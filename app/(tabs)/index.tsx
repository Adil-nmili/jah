import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ImageSlider } from '@/components/ImageSlider';
import SectionTitle from '@/components/SectionTitle';
import NosDiplomes from '@/components/NosDiplomes';
import ObjectifCard from '@/components/ObjectifCard';
import Caracteres from '@/components/Caracteres';
import Partenairs from '@/components/Partenairs';
import Footer from '@/components/Footer';
import { useRouter } from 'expo-router';

import { useEffect, useState } from 'react';

import { homePageApi } from '@/services/homePage';



// the home page
export default function TabOneScreen() {
  const router = useRouter()
  const [homePage, setHomePage] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homePageApi.getHomePage();
        if (res.status === 200) {
          console.log(res.data.entrer.titre);
          setHomePage(JSON.parse(res.data));
        } else {
          console.error("Error fetching data:", res.statusText);
        }
      
      } catch (error) {
        if (error instanceof Error) {
          console.error("API Error:", error.message);
        } else {
          console.error("API Error:", error);
        }
      }
    };

    fetchData();
  }, []); 
 

  return (
    <ScrollView style={styles.container}>
      <ImageSlider />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <SectionTitle title={homePage?.entrer.titre} />
          

          <Text style={{ textAlign: "center" }}>
            Découvrez nos formations en informatique, gestion, stylisme,
            pâtisserie, et bien plus encore !
          </Text>
        </View>
        {/* ///End of Hero section/// */}
        <View style={styles.stepContainer}>
          <TouchableOpacity 
          onPress={()=>router.push('/about')}
          style={styles.btnPlus}>
            <Text style={styles.btnPlusText}>Plus</Text>
          </TouchableOpacity>
        </View>

      {/* Diplome section  */}

        <View style={styles.stepContainer}>
          <SectionTitle title="NOS DIPLÔMES"/>
          <NosDiplomes />
        </View>

        {/* Object section */}

        <View style={styles.stepContainer}>
          <SectionTitle title="Objectif de l'école"/>
          <Text style={{textAlign:"center"}}>
          Dispenser une formation de qualité aux participants motivés par une volonté d'évoluer dans leur carrière professionnelle.
          Assurer des formations dans des filières sélectives et répondant aux besoins des entreprises
          </Text>
          <Image source={require('@/assets/images/image3.jpg')} resizeMode="contain" alt="Nos Objectif" style={styles.objectifImage}/>
          <ObjectifCard />
        </View>
        <View>
          <SectionTitle title="CE QUI NOUS CARACTÉRISE ?" />
          <Caracteres /> 
           </View>
           <View>
            <SectionTitle title="NOS PARTENAIRES"/>
            <Partenairs />
           </View>
      </View>
      
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  btnPlus : {
    backgroundColor: '#0000FF',
    color:'#fff',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    width: 100,
    marginHorizontal:"auto"
  },
  btnPlusText:{
    color: "#fff",
    textAlign:"center"

  },
  stepContainer: {
    fontSize: 12,
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  objectifImage:{
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginVertical: 20,
  }
});
