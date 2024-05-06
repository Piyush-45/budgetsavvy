import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { useEffect, useState } from 'react';

export const ProgressBar = ({ totalCost, assignedBudget }) => {
  const [percTotal, setPercTotal] = useState(0);

  useEffect(() => {
    calculateTotalPerc();
  }, [totalCost, assignedBudget]);

  const calculateTotalPerc = () => {
    let perc = (totalCost / assignedBudget) * 100;
    if (perc > 100) {
      perc = 100;
    }
    setPercTotal(perc);
  };

  return (
    <View>
      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>${totalCost}</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>Total Budget: ${assignedBudget}</Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View style={[styles.progressBarSubContainer, { width: percTotal + '%' }]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  amountContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
  },
  progressBarMainContainer: {
    width: '100%',
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 7,
  },
  progressBarSubContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    height: 15,
  },
});