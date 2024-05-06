import { View, Text, StatusBar, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getData, storeData } from '../../utils/services'
import { Link, useRouter } from 'expo-router'
import { client } from '../../utils/KindeConfig'
import { supabase } from '../../utils/SupabaseConfig'
import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x'
import Header from '../../components/Header'
import Colors from '../../constants/Colors'
import CircularChart from '../../components/CircularChart'
import { Ionicons } from '@expo/vector-icons'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import CategoryList from '../../components/CategoryList'
// import { TouchableOpacity } from 'react-native'

const index = () => {
  const [categoryList, setCategoryList] = useState()
  const [loading, setLoading] = useState(false);
  //! getting category list from supabase
  const getCategoriesList = async () => {
    setLoading(true)
    const user = await client.getUserDetails()
    let { data: CategoryList, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('created_by', user.email)
    // console.log(Category)
    setCategoryList(CategoryList)
    CategoryList && setLoading(false)

  }
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
    getCategoriesList()
    // 
  }, [])

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      router.replace('/login')
      await storeData('login', 'false')

    }
  };


  return (

    <View style={{ flex: 1,  }}>
      <View style={{
        paddingTop: heightPercentageToDP(6),
        paddingHorizontal: 20,
        backgroundColor: Colors.PRIMARY,
        height: heightPercentageToDP(20)
      }}>
        <Header />
      </View>
      <View style={{
        paddingTop: 30,
        marginTop: -75,
      }}>
        <CircularChart categoryList={categoryList}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 25 }}
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoriesList()}
            refreshing={loading} />}>
        <View style={{
          paddingVertical: 2,
          paddingHorizontal: 10,
        }}>
          <CategoryList categoryList={categoryList} />
        </View>

      </ScrollView>
      <View style={styles.addCategory}>
        <Link href={'/add-new-category'}>
          <Ionicons name='add-circle' size={52} color={"black"} />
        </Link>
      </View>
    </View>

  )
}

export default index

const styles = StyleSheet.create({
  addCategory: {

    position: 'absolute',
    right: '5%',
    bottom: heightPercentageToDP(1)
    // bottom:heightPercentageToDP(-70)
  }
})


// ?This prop allows you to attach a RefreshControl component to the ScrollView. The RefreshControl component provides a pull-to-refresh functionality, typically used to fetch new data from a server.

// ?Inside the refreshControl prop, we have:

{/* ?<RefreshControl>: This is a core component in React Native that provides a pull-to-refresh functionality. */}
// ?onRefresh={() => getCategoriesList()}: This prop is a function that will be called when the user initiates a refresh action (by pulling down on the ScrollView). In this case, it calls the getCategoriesList function, which presumably fetches new data.
// ?refreshing={loading}: This prop is a boolean that indicates whether the refresh operation is currently in progress or not. In this case, it's bound to the loading variable, which likely manages the loading state of the data fetching process