import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
    options: string[]
    setValue: any
    value: string
}

const CustomSegmentedButtons: React.FC<Props> = ({ options, value, setValue }) => {

    const [optionIndex, setOptionIndex] = useState<number>(options.indexOf(value));


    const items = options.map((item, index) => {
        return {
            label: item,
            value: item,
            index: index
        };
    });

    const numButtons = items.length;
    const buttonWidth = `${100 / numButtons}%`;

    return (

        <View style={styles.container}>
            {
                items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            { width: buttonWidth },
                            index === 0 && styles.firstButton,
                            index === numButtons - 1 && styles.lastButton,
                            index === optionIndex && styles.checked
                        ]}
                        onPress={() => {
                            setOptionIndex(index);
                            setValue(item.value);
                        }}
                    >
                        <Text
                            style={[
                                styles.text,
                                index === optionIndex && styles.checked
                            ]}
                        >{item.label}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'white',
        padding: 12,
    },
    firstButton: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    lastButton: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666B78',
    },
    checked: {
        backgroundColor: '#D3E0F8',
        color: 'black',
    }
})

export default CustomSegmentedButtons