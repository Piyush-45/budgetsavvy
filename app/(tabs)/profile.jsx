import { View, Text, StatusBar, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { client } from '../../utils/KindeConfig'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons';
import colors from '../../utils/colors'
import { router } from 'expo-router'
const profile = () => {

  const [user, setUser] = useState();
  useEffect(() => {
    getUserData();
  }, [])

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  }

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      router.replace('/login')
      await storeData('login', 'false')
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <StatusBar barStyle={'dark-content'} />
        <View style={{ display: 'flex', padding: 20 }}>

          {/* Header */}
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <View style={{ borderWidth: 3, borderColor: Colors.ORANGE, padding: 2, borderRadius: 99 }}>
              <Image source={{ uri: user?.picture }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,

                }}
              />
            </View>
            <View style={{ display: 'flex', gap: 2 }}>
              <Text style={{ fontSize: 14, color: Colors.GRAY }}>Username</Text>
              <Text style={{ fontSize: 24, fontFamily: 'outfit-semibold' }}>{user?.given_name}</Text>
            </View>
            <EvilIcons name="pencil" size={44} color="black" style={{ position: 'absolute', right: 20 }} />
            {/*  */}
          </View>
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: '30%', width:'90%', alignSelf:'center' }}>
        <TouchableOpacity style={{backgroundColor:colors.PRIMARY,width:'100%', padding:14}} onPress={handleLogout}>
          <Text style={{fontSize:24, textAlign:'center', color:colors.WHITE}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default profile