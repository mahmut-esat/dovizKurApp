import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

function AppInput({width = '80%', onSearch, ...otherProps}) {
  return (
    <View style={[styles.container, {width}]}>
      <TextInput
        style={styles.text}
        placeholderTextColor={'blue'}
        {...otherProps}
        onChangeText={text=>onSearch(text)}
      />
    </View>
  );
}

export default AppInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eceff1',
    flexDirection: 'row',
    padding: 2,
    marginVertical: 10,
    borderColor: '#e1bee7',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  text: {
    color: '#7b1fa2',
    fontSize: 18,
  },
});
