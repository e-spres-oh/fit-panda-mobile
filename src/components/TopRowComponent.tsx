import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { useUserStore } from '../hooks/useUserStore';

const TopRowComponent: React.FC = () => {
  const { user } = useUserStore();

  return (
    <View style={styles.topRow}>
      <Text style={styles.greetingText}>{`Salut, ${user?.name}`}</Text>
      <IconButton
        icon="dots-vertical"
        size={20}
        style={{ marginHorizontal: 0 }}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '3%',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TopRowComponent;
