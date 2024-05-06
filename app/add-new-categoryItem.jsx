import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import colors from '../utils/colors'
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig'
import { decode } from "base64-arraybuffer"

const AddNewCategoryItem = () => {
  const { categoryId } = useLocalSearchParams()
  console.log(`Categoryid  ${categoryId}`)
  const placeholder = 'ttps://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [cost, setCost] = useState();
  const [note, setNote] = useState();


  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.7,
      base64: true
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);

    }
  }

  const onClickAdd = async () => {
    setLoading(true)
    const fileName = Date.now();
    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(fileName + '.png', decode(image), {
        contentType: 'image/png'
      });
    if (data) {
      const fileUrl = "https://qlbuqtbibxmihvzsvbvl.supabase.co/storage/v1/object/public/images/" + fileName + ".png";
      console.log(fileUrl)

      const { data, error } = await supabase
        .from('CategoryItems')
        .insert([{
          name: name,
          cost: cost,
          // url:url,
          // image: fileUrl,
          note: note,
          category_id: categoryId
        }]).select();
      ToastAndroid.show('New Item Added!!!', ToastAndroid.SHORT);
      console.log(data);
      setLoading(false);
      router.replace({
        pathname: '/category-detail',
        params: {
          categoryId: categoryId
        }
      })
    }



  }


  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1, padding: 20, }}>

      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ display: 'flex', gap: 20 }}>

            <TouchableOpacity onPress={() => onImagePick()}>
              <Image source={{ uri: previewImage }}
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: Colors.GRAY,
                  borderRadius: 15
                }}
              />
            </TouchableOpacity>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, borderColor: Colors.GRAY, borderWidth: 2, padding: 10, borderRadius: 14 }}>
              <Ionicons name='pricetag' size={24} color={colors.GRAY} />
              <TextInput placeholder='Item name' onChangeText={(value) => setName(value)} style={{ fontSize: 24, width: '100%' }} />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, borderColor: Colors.GRAY, borderWidth: 2, padding: 10, borderRadius: 14 }}>
              <FontAwesome name='dollar' size={24} color={colors.GRAY} />
              <TextInput placeholder='Item Cost' onChangeText={(value) => setCost(value)} style={{ fontSize: 24, width: '100%' }} keyboardType='number-pad' />
            </View>

            {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, borderColor: Colors.GRAY, borderWidth: 2, padding: 10, borderRadius: 14 }}>
  <Ionicons name='link' size={24} color={colors.GRAY} />
  <TextInput placeholder='Url' onChangeText={(value) => setUrl(value)} style={{ fontSize: 24, width: '100%' }} />
</View> */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, borderColor: Colors.GRAY, borderWidth: 2, padding: 10, borderRadius: 14 }}>
              <Ionicons name='pencil' size={24} color={colors.GRAY} />
              <TextInput placeholder='note' onChangeText={(value) => setNote(value)} style={{ fontSize: 24, width: '100%' }} />
            </View>
            <TouchableOpacity style={{ backgroundColor: Colors.PRIMARY, width: "100%", padding: 10, borderRadius: 14 }}  disabled={loading} onPress={()=>onClickAdd()} >
            {loading ? (
                  <ActivityIndicator size="large" color={Colors.BLACK} /> // show activity indicator when loading
                ) : (
                  <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Add Item</Text>
                )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default AddNewCategoryItem