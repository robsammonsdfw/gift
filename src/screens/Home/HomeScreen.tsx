import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import PopularContainer from '../../components/home/PopularContainer';
import Cards from './Cards';

const HomeScreen = () => {
    return (
        <View style={{flex: 1}}>
            {/* <Header />
            <PopularContainer /> */}
            <Cards />
        </View>
    )
}

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <View>
                <Text style={styles.balanceTitle}>Balance</Text>
                <Text style={styles.balance}>$0.00</Text>
            </View>

            <TouchableOpacity style={styles.searchContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <Ionicons name="search" size={24} color="gray" />
                    <Text>Search</Text>
                </View>

            </TouchableOpacity>

        </View>
    )
}



export default HomeScreen

const styles = StyleSheet.create({
    headerContainer: {
        margin: 10,
        gap: 30
    },
    balance: {
        fontWeight: 'bold',
        fontSize: 30
    },
    balanceTitle: {
        fontWeight: 'bold'
    },
    searchContainer: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 10
    }
})