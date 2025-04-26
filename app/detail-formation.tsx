import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

export default function DetailFormation() {
  const { id, title, description, image } = useLocalSearchParams();
  const handleInscription = () => {
    router.push({
      pathname: '/Inscrire',
      params: {
        id: id?.toString(),
        titre: title?.toString(),
        description: description?.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: title as string,
          headerShown: true,
        }}
      />
      <ScrollView>
        <Image
          source={{ uri: image as string }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleInscription}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderBottomWidth:10,
    borderBottomColor:'#000',
    shadowColor:'#000',
    shadowOpacity:0.8,
    shadowRadius:10,
    shadowOffset:{width:0,height:10},
    elevation:10,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign:'right',
    
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginHorizontal:20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 