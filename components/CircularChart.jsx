import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CircularChart = () => {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1])
  const [sliceColor, setSliceColor] = useState([Colors.GRAY])

  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 4, }}>Total Estimate : <Text style={{ fontWeight: 'bold' }}>0$</Text></Text>
      <View >
        <PieChart
          widthAndHeight={widthAndHeight}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={'#FFF'}
          series={values}
        />
      </View>
      <View style={{display:'flex', flexDirection:'row',alignItems:'center', gap:4 }}>
        <MaterialCommunityIcons name='checkbox-blank-circle' size={20} color={Colors.GRAY} />
        <Text style={{fontSize:20}}>NA</Text>
      </View>
    </View>

  )
}

export default CircularChart

const styles = StyleSheet.create({

  container: {
    width: wp(90),
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 10,
    // top:hp(10)
  },
  subContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,

  },
})
