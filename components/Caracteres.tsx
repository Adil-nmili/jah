import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { BACKEND_URL_IMAGES } from '@/utils/api';

interface Formation {
  id: string;
  titre: string;
  description: string;
  images: string[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Caracteres({ formations }: { formations: Formation }): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (formations.images && formations.images.length > 0) {
      startAutoScroll();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [formations.images]);

  const startAutoScroll = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % formations.images.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.caracterCard}>
        <Text style={styles.caracterTitle}>{formations.titre}</Text>
        
        <View style={styles.imageSliderContainer}>
          {formations.images && formations.images.length > 0 ? (
            <ScrollView 
              ref={scrollViewRef}
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setCurrentIndex(index);
              }}
            >
              {formations.images.map((imageUri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image 
                    source={{ uri: `${BACKEND_URL_IMAGES}${imageUri}` }} 
                    style={styles.image} 
                    resizeMode="cover" 
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noImageText}>No images available</Text>
          )}
        </View>
        <View style={styles.descriptionContainer}>
          <Text 
            style={styles.caracterDescription}
            numberOfLines={isExpanded ? undefined : 5}
          >
            {formations.description}
          </Text>
          <TouchableOpacity 
            onPress={() => setIsExpanded(!isExpanded)}
            style={styles.seeMoreButton}
          >
            <Text style={styles.seeMoreText}>
              {isExpanded ? 'See Less' : 'See More'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  caracterCard: {
    flexDirection: 'column',
    alignItems: 'center',

    marginBottom: 20,
  },
  caracterIcon: {
    color: '#0000FF',
  },
  caracterTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#2D2A35',
  },
  descriptionContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  caracterDescription: {
    fontSize: 12,
    color: '#000',
    textAlign: 'left',
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
  imageSliderContainer: {
    width: '100%',
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000077',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  imageWrapper: {
    width: SCREEN_WIDTH - 40, 
    height: 150,

  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  noImageText: {
    textAlign: 'center',
    color: '#666',
  },
});
