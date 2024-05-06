import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const RootLayout = () => {

  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),

  })
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' options={{
        headerShown: false
      }} />
      <Stack.Screen name='add-new-category'  options={{presentation:'transparentModal',animation:'fade_from_bottom', headerTitle:'Add New Category', headerShown:true }} />

      <Stack.Screen name='add-new-categoryItem'  options={{presentation:'transparentModal',animation:'slide_from_right', headerTitle:'Add New  Item', headerShown:true }} />

    </Stack>
  )
}

export default RootLayout