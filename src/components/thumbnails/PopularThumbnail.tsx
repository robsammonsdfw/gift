import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Nike from '../../assets/nike.jpg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";

const PopularThumbnail = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <TouchableOpacity 
            onPress={() => navigation.navigate('ProductScreen')}
            style={{ alignItems: 'center', alignSelf: 'flex-start', gap: 3 }}>
                <Image
                    resizeMode='cover'
                    source={Nike}
                    style={styles.thumbnail} />
                <Text>Nike</Text>
            </TouchableOpacity>
        </View>

    )
}

export default PopularThumbnail

const styles = StyleSheet.create({
    thumbnail: {
        width: 130,
        height: 80,
        borderRadius: 10,

    }
})