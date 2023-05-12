import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../constants';

interface Props {
    valueSetter: any
    options: {
        inputLabelText?: string
        inputText: string
    }[]
}


const VerticalButtons: React.FC<Props> = ({ valueSetter, options }) => {

    const [optionIndex, setOptionIndex] = React.useState<number>(0);

    return (
        <View style={styles.inputFieldsContainer}>
            {options.map((item, index) => (
                <View
                    key={index}
                >

                    {
                        item.inputLabelText && (
                            <Text style={styles.inputLabel}>
                                {item.inputLabelText}
                            </Text>
                        )
                    }

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { width: '100%' },
                            index === optionIndex && styles.checked
                        ]}
                        onPress={() => {
                            setOptionIndex(index);
                            valueSetter(item.inputText);
                        }}
                    >
                        <Text
                            style={[
                                styles.text,
                                index === optionIndex && styles.checked
                            ]}
                        >{item.inputText}</Text>
                    </TouchableOpacity >

                </View>
            ))
            }
        </View>
    )
}


const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 15,
        marginHorizontal: 50,
        textAlign: 'center',
        color: Colors.textLabel,
    },
    button: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        marginTop: 5,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666B78',
    },
    checked: {
        backgroundColor: '#D3E0F8',
        color: 'black',
    },
    inputFieldsContainer: {
        flex: 4,
        height: '100%',
    },
})

export default VerticalButtons;