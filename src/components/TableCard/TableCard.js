import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import styles from './TableCard.style';

const TableCard = ({title, onPress}) => {
  return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
  );
};

export default TableCard;
