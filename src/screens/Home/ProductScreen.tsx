import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { API_URL } from '../../lib/api/config';
import axios from 'axios';
import DefaultImage from '../../assets/nike.jpg';

interface ProductDetails {
  id: string;
  name: string;
  imageUrl?: string;
  currency: string;
  minValue: string;
  maxValue: string;
  availableValues?: string[];
  denominationType?: 'fixed' | 'open';
  description?: string;
  website?: string;
  balanceCheckUrl?: string;
}

const ProductScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductScreen'>>();
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/gift-card/${productId}`);
      if (response.data.product) {
        setProduct(response.data.product);
        if (response.data.product.denominationType === 'fixed') {
          setSelectedAmount(response.data.product.availableValues?.[0] || null);
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Fallback to route params if API fails
      setProduct({
        id: productId,
        name: route.params.name,
        imageUrl: route.params.imageUrl,
        currency: route.params.currency,
        minValue: route.params.minValue,
        maxValue: route.params.maxValue,
        availableValues: route.params.availableValues,
        denominationType: route.params.denominationType,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const renderPriceOptions = () => {
    if (product.denominationType === 'fixed' && product.availableValues) {
      return (
        <View style={styles.priceOptionsContainer}>
          <Text style={styles.sectionTitle}>Select Amount</Text>
          <View style={styles.priceOptionsGrid}>
            {product.availableValues.map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.priceOption,
                  selectedAmount === value && styles.selectedPrice
                ]}
                onPress={() => setSelectedAmount(value)}
              >
                <Text style={[
                  styles.priceText,
                  selectedAmount === value && styles.selectedPriceText
                ]}>
                  {product.currency} {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    return (
      <View style={styles.priceOptionsContainer}>
        <Text style={styles.sectionTitle}>Amount Range</Text>
        <Text style={styles.rangeText}>
          {product.currency} {product.minValue} - {product.maxValue}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={product.imageUrl ? { uri: product.imageUrl } : DefaultImage}
          style={styles.card}
          resizeMode="cover"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.name}</Text>
        {product.description && (
          <Text style={styles.description}>{product.description}</Text>
        )}

        {renderPriceOptions()}

        <TouchableOpacity
          style={[styles.buyButton, !selectedAmount && styles.disabledButton]}
          onPress={() => Alert.alert('Coming Soon', 'Purchase functionality will be added.')}
          disabled={!selectedAmount && product.denominationType === 'fixed'}
        >
          <Text style={styles.buyButtonText}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  card: {
    width: 350,
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceOptionsContainer: {
    marginBottom: 20,
  },
  priceOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  priceOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedPrice: {
    backgroundColor: '#0066cc',
  },
  priceText: {
    fontSize: 16,
    color: '#333',
  },
  selectedPriceText: {
    color: '#fff',
  },
  rangeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;