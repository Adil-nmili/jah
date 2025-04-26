import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image as RNImage,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window');

const Albums = (): JSX.Element => {
  const [images] = useState<any[]>([
    require('../assets/albums/1.jpeg'),
    require('../assets/albums/2.jpeg'),
    require('../assets/albums/3.jpeg'),
    require('../assets/albums/4.jpeg'),
    require('../assets/albums/5.jpeg'),
    require('../assets/albums/6.jpeg'),
    require('../assets/albums/8.jpeg'),
    require('../assets/albums/9.jpeg'),
    require('../assets/albums/acc.jpg'),
    require('../assets/albums/engines9.jpg'),
    require('../assets/albums/hijama2.jpg'),
    require('../assets/albums/image1.jpg'),
    require('../assets/albums/image2.jpg'),
    require('../assets/albums/isaafat1.jpg'),
    require('../assets/albums/isaafat3.jpg'),
    require('../assets/albums/isaafat2.jpg'),
    require('../assets/albums/isaafat7.jpg'),
    require('../assets/albums/modelisme1.jpg'),
    require('../assets/albums/modelisme01.jpg'),
    require('../assets/albums/modelisme1.jpg'),
    require('../assets/albums/modeliste6.jpg'),
    require('../assets/albums/modeliste8.jpg')
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openModal = (index: number): void => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setModalVisible(false);
  };

  const visibleImages = images.slice(0, 4);
  const extraCount = images.length - 4;

  const zoomImages = images.map((img) => ({
    uri: RNImage.resolveAssetSource(img).uri,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {visibleImages.map((img, index) => {
          const isLastImageWithMore = index === 3 && images.length > 4;
          return (
            <TouchableOpacity key={index} onPress={() => openModal(index)}>
              <View style={styles.overlayContainer}>
                <Image source={img} style={styles.image} />
                {isLastImageWithMore && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>+{extraCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <ImageViewing
        images={zoomImages}
        imageIndex={selectedIndex}
        visible={modalVisible}
        onRequestClose={closeModal}
        swipeToCloseEnabled
        presentationStyle="overFullScreen"
      />
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: (width - 40) / 2,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  overlayContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 150,
    width: (width - 40) / 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconClose: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 10,
  },
});
