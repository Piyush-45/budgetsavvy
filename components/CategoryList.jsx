import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { useRouter } from 'expo-router'

const CategoryList = ({ categoryList }) => {
  const router = useRouter()

  const onCategoryClick = (category) => {
    router.push({
      pathname: '/category-detail',
      params: {
        categoryId: category.id
      }
    })
  }
  return (
    <View>
      {categoryList?.map((item, index) => {
        return (
            
          <TouchableOpacity key={index} onPress={()=>onCategoryClick(item)}>
            <View
              style={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: 8,
                backgroundColor: Colors.WHITE,
                padding: 10,
                borderRadius: 15,
              }}
            // Pass the onCategoryClick function here
            >
              <View
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'baseline',
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                    backgroundColor: item.color,
                    borderRadius: 15,
                    padding: 15,
                  }}
                >
                  {item.icon}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '70%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text style={{ fontWeight: '600', fontSize: heightPercentageToDP(3) }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontWeight: '300' }}>
                    {item.CategoryItems?.length} {`${item.CategoryItems?.length>1? "items": "item"}`} 
                  </Text>
                </View>
                <Text style={{ fontWeight: '700', fontSize: heightPercentageToDP(2.2) }}>
                  $5000
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>

  )
}

export default CategoryList