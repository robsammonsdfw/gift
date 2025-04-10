import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeHeaderLeft = () => {
  return (
    <View>
      <Text style={styles.title}>Gift It</Text>
    </View>
  )
}

export default HomeHeaderLeft

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 25
    }
})