import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { BACKEND_URL_IMAGES } from '@/utils/api';
import { homePageApi } from '@/services/homePage';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  image: { uri: string };
  title: string;
  description: string;
}

export function ImageSlider(): JSX.Element {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const flatListRef = useRef<FlatList<Slide> | null>(null);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await homePageApi.getSlider();
        if (res.status === 200) {
          const formattedSlides = (res.data.sliders || []).map((item: any) => ({
            id: item.id.toString(),
            image: { uri: BACKEND_URL_IMAGES + item.image },
            title: item.titre,
            description: item.description,
          }));
          
          setSlides(formattedSlides);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("API Error:", error.message);
        } else {
          console.error("API Error:", error);
        }
      }
    };

    fetchSlides();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (slides.length > 0) {
      startAutoSlide();
    }

    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [slides, activeSlide]);

  const startAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }

    autoSlideTimer.current = setInterval(() => {
      setActiveSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: nextSlide,
            animated: true,
          });
        }
        return nextSlide;
      });
    }, 5000); // 5 seconds
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.slideImage} />
      <View style={styles.slideContent}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === activeSlide ? styles.paginationDotActive : null,
          ]}
        />
      ))}
    </View>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeSlide) {
      setActiveSlide(index);
    }
  };

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {slides.length > 0 && renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    position: 'relative',
  },
  slide: {
    width,
    height: 200,
  },
  slideImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  slideContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  slideTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 8,
  },
  slideDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#ffffff',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#ffffff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
