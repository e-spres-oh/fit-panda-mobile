import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  buttons: Array<string>;
  doSomethingAfterClick: Function;
} 

export const ButtonGroup = ({ buttons, doSomethingAfterClick }: Props) => {
  const [clickedId, setClickedId] = useState(0);
  const handleClick = (item: string, id: number) => {
    setClickedId(id);
    doSomethingAfterClick(item);
  };
  return (
    <View style={styles.container}>
      {buttons.map((buttonLabel, index) => {
        return (
          <TouchableOpacity
            onPress={() => handleClick(buttonLabel, index)}
            key={index}
            style={[
              index === clickedId ? styles.buttonActive : styles.button,
              index === 0 ? { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 } : {},
              index === 1 ? { borderTopRightRadius: 10, borderBottomRightRadius: 10 } : {},
            ]}
          >
            <Text style={index === clickedId ? styles.textActive : styles.text}>{buttonLabel}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        flexDirection: 'row',
        width: '90%',
  },
    button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#E6E8EC',
  },
  buttonActive: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3E0F8',
    borderWidth: 0.5,
    borderColor: '#E6E8EC',
  },
  text: {
    color: 'gray',
  },
  textActive: {
    color: 'black',
  },
});
