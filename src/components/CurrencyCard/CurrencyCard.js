import React from 'react';
import {View, Text} from 'react-native';

import styles from './CurrencyCard.style';

const CurrencyCard = ({currency}) => {

  return (
    <View style={styles.container}>
      <View style={styles.inner_container_name}>
        <Text style={styles.text_name}>{currency.children[1].value}</Text>
      </View>
      <View style={styles.inner_container}>
        <Text style={styles.text_name}>{currency.attributes.Kod}</Text>
      </View>
      <View style={styles.inner_container}>
        <Text style={styles.text}>{currency.children[3].value}</Text>
      </View>
      <View style={styles.inner_container}>
        <Text style={styles.text}>{currency.children[4].value}</Text>
      </View>
    </View>
  );
};

export default CurrencyCard;
