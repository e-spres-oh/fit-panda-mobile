import * as React from 'react';
import { Text } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native/types';
import { StyleSheet } from 'react-native';

interface Props {
    customStyles?: StyleProp<ViewStyle>
    children?: string
}

const Title: React.FC<Props> = ({ customStyles, children }) => {
    return (
        <Text style={[styles.title, customStyles]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center",
    },
})

export default Title