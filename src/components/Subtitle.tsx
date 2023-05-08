import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { Colors } from '../constants';

interface SubtitleProps {
  subtitle: string;
  style?: StyleProp<TextStyle>;
}

const Subtitle: React.FC<SubtitleProps> = (props) => {
  const { subtitle, style } = props;
  return <Text style={[styles.subtitle, style]}>{subtitle}</Text>;
};

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.textLabel,
  },
});