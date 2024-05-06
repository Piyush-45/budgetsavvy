import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'
import ColorPicker from '../components/ColorPicker'
import { MaterialIcons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import { SupabaseClient } from '@supabase/supabase-js'
import { onCreateCategory, supabase } from '../utils/SupabaseConfig'
import { client } from '../utils/KindeConfig'
import { router } from 'expo-router'
const AddNewCategory = () => {

  const [selectedIcon, setSelectedIcon] = useState('IC')
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE)
  const [categoryName, setCategoryName] = useState()
  const [totalBudget, setTotalBudget] = useState()
  const [loading,setLoading]=useState(false);
 //!supbase 
  const onCreateCategory=async()=>{
    setLoading(true)
    const user = await client.getUserDetails()
    const{data,error} = await supabase.from('Category').insert({
      name:categoryName, 
      assigned_budget:totalBudget,
      color:selectedColor,
      icon:selectedIcon,
      created_by:user.email
    }).select()
    // setLoading(false)
  if(data){
    router.replace({
      pathname:'/category-detail',
      params:{
        categoryId:data[0].id
      }
    })
    setLoading(false)
  }
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F5EFE6' }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto' }}>
        <TextInput maxLength={2} style={[styles.iconInput, { backgroundColor: selectedColor }]} value={selectedIcon} onChangeText={(value) => setSelectedIcon(value)} />
        <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </View>

      {/*add categhory name and total budget section   */}
      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 20, gap: 4, borderColor: Colors.GRAY, borderWidth: 2, padding: 10, backgroundColor: Colors.WHITE }}>
        <MaterialIcons name='local-offer' size={24} color={"#0C0C0C"} />
        <TextInput placeholder='Category Name' style={{ width: '100%', fontSize: 20 }} value={categoryName} onChangeText={(text) => setCategoryName(text)} />
      </View>

      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 20, gap: 4, borderColor: Colors.GRAY, borderWidth: 2, padding: 10, backgroundColor: Colors.WHITE }}>
        <Foundation name='dollar' size={24} color={"#0C0C0C"} />
        <TextInput placeholder=' Total Budget' style={{ width: '100%', fontSize: 20 }} keyboardType='numeric' value={totalBudget} onChangeText={(text) => setTotalBudget(text)} />
      </View>

      <TouchableOpacity style={{ backgroundColor: Colors.PURPLE, marginTop: 20, padding: 10, borderBlockColor: 'black', borderWidth: 1, }}
        disabled={!categoryName || !totalBudget} onPress={onCreateCategory}>
        <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: '400', color: Colors.WHITE }}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddNewCategory


const styles = StyleSheet.create({
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE,

  },
})
