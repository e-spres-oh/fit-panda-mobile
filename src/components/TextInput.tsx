import * as React from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

import ErrorMessage from './ErrorMessage'


interface Props {
    label?: string,
    customStyles?: StyleProp<ViewStyle>
    required?: boolean,
    setValue: any
}

const CustomInputText: React.FC<Props & TextInputProps> = ({ setValue, required, label, customStyles, outlineStyle, ...rest }) => {

    const [text, setText] = React.useState<string | null>(null);

    const isError: boolean = required === true && text !== null && (text === undefined || text.length === 0 || text === ' ')

    React.useEffect(() => {
        if (!isError) {
            setValue(text);
        } else {
            setValue(null);
        }
    }, [text])

    return (
        <>
            <TextInput
                style={[styles.inputText, customStyles]}
                label={required === true ? `${label}*` : label}
                value={text === null ? '' : text}
                onChangeText={text => setText(text)}
                outlineStyle={[{ borderRadius: 5, backgroundColor: "white", borderWidth: 0 }, outlineStyle]}
                mode='outlined'
                {...rest}
            />
            {isError && (
                <ErrorMessage>
                    {`Please enter your ${label} (*)`}
                </ErrorMessage>
            )}
        </>
    );
};

export default CustomInputText;


const styles = StyleSheet.create({
    inputText: {
        width: "100%",
        backgroundColor: "white",
        marginBottom: 8,
    }
});