import * as React from 'react';
import { Button, ButtonProps} from 'react-native-paper';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
    children: React.ReactNode
    onPress?: () => void
    customStyles?: StyleProp<ViewStyle>
    mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
}

const CustomButton: React.FC<Props & ButtonProps> = ({ children, onPress, customStyles, mode, ...rest }) => (
    <Button
        style={[styles.button, customStyles]}
        mode={mode}
        onPress={onPress}
        labelStyle={[styles.labelStyle]}>
        {children}
    </Button>
);

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        width: "100%",
        // padding: 15,
        color: "white",
        backgroundColor: "#558AF8",
        marginTop: 24,
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: "400",
    }
});