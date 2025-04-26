import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ListRenderItemInfo,
} from 'react-native';

import image1 from '@/assets/images/jahimage.png';
import image2 from '@/assets/images/diplome.png';

const { width } = Dimensions.get('window');

const images = [image1, image2];

const Aboutslider = (): JSX.Element => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }: ListRenderItemInfo<any>): JSX.Element => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Aboutslider;

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
