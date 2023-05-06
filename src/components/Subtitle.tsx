import * as React from 'react';
import { Text } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native/types';
import { StyleSheet } from 'react-native';

interface Props {
    customStyles?: StyleProp<ViewStyle>
    children?: React.ReactNode
}

const Subtitle: React.FC<Props> = ({ customStyles, children }) => {
    return (
        <Text style={[styles.subtitle, customStyles]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        marginTop: 12,
        paddingLeft: 35,
        paddingRight: 35,
        marginBottom: 32,
        color: "#666B78",
    },
})

export default Subtitle