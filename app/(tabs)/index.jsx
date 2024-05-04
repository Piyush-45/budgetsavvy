import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getData, storeData } from '../../utils/services'
import { useRouter } from 'expo-router'
import { client } from '../../utils/KindeConfig'
import { supabase } from '../../utils/SupabaseConfig'
import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x'
import Header from '../../components/Header'
import Colors from '../../constants/Colors'
import CircularChart from '../../components/CircularChart'
// import { TouchableOpacity } from 'react-native'

const index = () => {
  const router = useRouter()
  const checkUserAuth = async () => {
    const result = await getData('login')
    if (result !== 'true') {
      router.replace('login')
    }

    console.log('result', result)
  }
  useEffect(() => {
    checkUserAuth()
    getCategoryList()
  }, [])

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      router.replace('/login')
      await storeData('login', 'false')

    }
  };

  const getCategoryList = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from('Category')
      .select('*')
      .eq('name', user.id); // assuming you want to filter categories by the current user

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      console.log('Category data:', data);
    }
  };

  return (
    // <SafeAreaView>

    <View>
      <StatusBar barStyle={'dark-content'} translucent={true} />
      <View style={{ padding: 20, paddingTop: 50, backgroundColor: Colors.PRIMARY, height: 150 }}>
        <Header />
        <View >
        </View>
        <CircularChart />
      </View>
    </View>

  )
}

export default index