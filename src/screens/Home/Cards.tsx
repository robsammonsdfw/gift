import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import GiftCards from './GiftCards';
import PrepaidCard from './PrepaidCard';
import Donations from './Donations';
import Subscriptions from './Subscriptions';

const { width } = Dimensions.get('window');

interface Tab {
  key: string;
  title: string;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  { key: 'giftcards', title: 'Gift Cards', component: GiftCards },
  { key: 'prepaidcard', title: 'Prepaid Card', component: PrepaidCard },
  { key: 'donations', title: 'Donations', component: Donations },
  { key: 'subscriptions', title: 'Subscriptions', component: Subscriptions },
];

const Cards = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveTab(newIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => handleTabPress(index)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.title}
              </Text>
              {isActive && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {tabs.map((tab, index) => {
          const TabComponent = tab.component;
          return (
            <View key={tab.key} style={styles.screen}>
              <TabComponent />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  
    paddingTop: 16,
    backgroundColor: 'white',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {

    color: '#666',
    marginBottom: 5,
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '70%',
    backgroundColor: '#000',
  },
  screen: {
    width,
    flex: 1,
  },
});