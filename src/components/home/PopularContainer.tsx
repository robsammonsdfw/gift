import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PopularThumbnail from '../thumbnails/PopularThumbnail'

const PopularContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular</Text>

      <PopularThumbnail />
    </View>
  )
}

export default PopularContainer

const styles = StyleSheet.create({
    container: {
        margin: 10,
        gap: 10
    },
    title: {
        fontWeight: 'bold'
    }
})