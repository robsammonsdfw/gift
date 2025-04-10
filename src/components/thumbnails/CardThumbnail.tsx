import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import DefaultImage from '../../assets/nike.jpg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";

const { width } = Dimensions.get('window');
const COLUMN_GAP = 10;
const NUM_COLUMNS = 3;
const CARD_WIDTH = (width - (COLUMN_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

interface CardThumbnailProps {
  name: string;
  imageUrl?: string;
  id: string;
  currency: string;
  minValue: string;
  maxValue: string;
  isOrderable: boolean;
  denominationType?: 'fixed' | 'open';
  availableValues?: string[];
}

const CardThumbnail: React.FC<CardThumbnailProps> = ({
  name,
  imageUrl,
  id,
  currency,
  minValue,
  maxValue,
  isOrderable,
  denominationType = 'open',
  availableValues = []
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const imageSource = imageUrl && imageUrl !== '' 
    ? { uri: imageUrl }
    : DefaultImage;

  // Truncate name to 8 characters and add ellipsis if longer
  const truncatedName = name.length > 8 ? `${name.slice(0, 8)}...` : name;

  const handleNavigation = () => {
    navigation.navigate('ProductScreen', {
      productId: id,
      name,
      imageUrl,
      currency,
      minValue,
      maxValue,
      denominationType,
      // Only include availableValues if it's a fixed denomination
      ...(denominationType === 'fixed' && { availableValues })
    });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        onPress={handleNavigation}
        style={styles.container}
        disabled={!isOrderable}
      >
        <Image
          source={imageSource}
          style={[styles.thumbnail, !isOrderable && styles.disabledImage]}
          resizeMode='cover'
          defaultSource={DefaultImage}
        />
        <Text style={styles.name}>{truncatedName}</Text>
        <Text style={styles.price}>
          {currency} {minValue} - {maxValue}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: COLUMN_GAP / 2,
    marginBottom: COLUMN_GAP,
  },
  container: {
    alignItems: 'center',
    gap: 3,
  },
  thumbnail: {
    width: CARD_WIDTH, 
    height: 80,
    borderRadius: 10,
  },
  disabledImage: {
    opacity: 0.5,
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: '#666',
  },
});

export default CardThumbnail;