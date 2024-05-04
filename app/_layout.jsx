import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const RootLayout = () => {
  
  // const [fontsLoaded, fontError]=useFonts({
  //   'outfit':require('../assets copy/fonts/Outfit-Regular.ttf'),
  //   'outfit-medium':require('../assets copy/fonts/Outfit-Medium.ttf'),
  //   'outfit-bold':require('../assets copy/fonts/Outfit-Bold.ttf'),
  
  // })
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='(tabs)' options={{
        headerShown:false
      }}/>
    </Stack>
  )
}

export default RootLayout