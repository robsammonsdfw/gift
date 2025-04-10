import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Text,
  RefreshControl,
  Dimensions 
} from 'react-native';
import CardThumbnail from '../../components/thumbnails/CardThumbnail';
import { API_URL } from '../../lib/api/config';
import axios from 'axios';

const { width } = Dimensions.get('window');
const COLUMN_GAP = 10;

interface GiftCard {
  id: string;
  name: string;
  imageUrl?: string;
  iconUrl?: string;
  currency: string;
  minValue: string;
  maxValue: string;
  availableValues: string[] | null;
  discount: string;
  categories: string[];
  isOrderable: boolean;
}

const GiftCards = () => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchGiftCards = async (cursor: string | null = null, refresh = false) => {
    if (loading || (!hasMore && !refresh)) return;

    setLoading(true);
    try {
      const url = cursor 
        ? `${API_URL}/api/gift-cards?cursor=${cursor}&limit=21`
        : `${API_URL}/api/gift-cards?limit=21`;

      const response = await axios.get(url);
      const newCards = response.data.products;
      
      if (refresh) {
        setGiftCards(newCards);
      } else {
        setGiftCards(prev => [...prev, ...newCards]);
      }
      
      setNextCursor(response.data.pagination.nextCursor);
      setHasMore(response.data.pagination.hasMore);
    } catch (error) {
      console.error('Error fetching gift cards:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setNextCursor(null);
    setHasMore(true);
    fetchGiftCards(null, true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore && nextCursor) {
      fetchGiftCards(nextCursor);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const renderGiftCard = ({ item }: { item: GiftCard }) => (
    <CardThumbnail
      name={item.name}
      imageUrl={item.imageUrl}
      id={item.id}
      currency={item.currency}
      minValue={item.minValue}
      maxValue={item.maxValue}
      isOrderable={item.isOrderable}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={giftCards}
        renderItem={renderGiftCard}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text>No gift cards available</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: COLUMN_GAP / 2,
    paddingTop: COLUMN_GAP,
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
});

export default GiftCards;