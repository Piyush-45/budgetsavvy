import { View, Text, StatusBar, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/SupabaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '../components/ProgressBar';

const CategoryDetail = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [categoryData, setCategoryData] = useState();
  const { categoryId } = useLocalSearchParams();

  useEffect(() => {
    getCategoryDetail();
  }, [categoryId]);

  useEffect(() => {
    if (categoryData) {
      const totalCost = categoryData.CategoryItems.reduce(
        (acc, item) => acc + item.cost,
        0
      );
      setTotalCost(totalCost);
    }
  }, [categoryData]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from('Category')
      .select('*, CategoryItems(*)')
      .eq('id', categoryId);
    setCategoryData(data[0]);
  };

  const onDeleteCategory = () => {
    Alert.alert('Are you Sure', 'Do you really want to Delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase
            .from('CategoryItems')
            .delete()
            .eq('category_id', categoryData.id);

          await supabase
            .from('Category')
            .delete()
            .eq('id', categoryData.id);
          ToastAndroid.show('Category Deleted!', ToastAndroid.SHORT);
          router.replace('/(tabs)');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 24 }}>
        <Stack.Screen options={{ headerShown: true, title: ` Category: ${categoryData?.name}` }} />
        <StatusBar barStyle={'dark-content'} />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 44, backgroundColor: categoryData?.color, padding: 10, borderRadius: 15 }}>
              {categoryData?.icon}
            </Text>
            <View>
              <Text style={{ fontSize: 24 }}>{categoryData?.name}</Text>
              <Text>{categoryData?.CategoryItems.length} Items</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onDeleteCategory()}>
            <Ionicons name="trash" size={24} color={'red'} />
          </TouchableOpacity>
        </View>
        <ProgressBar totalCost={totalCost} assignedBudget={categoryData?.assigned_budget} />

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 26, fontFamily: 'outfit-bold' }}>ItemList</Text>
          <View>
            {categoryData?.CategoryItems.map((item, index) => (
              <View
                key={index}
                style={{
                  marginVertical: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#836FFF',
                  padding: 14,
                  borderRadius: 25,
                }}
              >
                <Text style={{ fontFamily: 'outfit', fontWeight: '700', fontSize: 20, color: 'white' }}>
                  {item.name}
                </Text>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, color: 'white' }}>$ {item.cost}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Link
        href={{
          pathname: '/add-new-categoryItem',
          params: {
            categoryId: categoryId,
          },
        }}
        asChild
      >
        <TouchableOpacity style={{ position: 'absolute', bottom: '10%', right: '12%' }}>
          <Ionicons name="add-circle" size={60} color="black" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default CategoryDetail;