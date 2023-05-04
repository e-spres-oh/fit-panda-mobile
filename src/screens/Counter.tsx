import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  initialCount: number;
}

const Counter: React.FC<Props> = ({ title, initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}: {count}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Counter;
