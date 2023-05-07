import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

interface Props {
    children: string
}

const ErrorMessage: React.FC<Props> = ({ children }) => {
    return (
        <Text style={styles.error}>
            {children}
        </Text>
    )
}
const styles = StyleSheet.create({
    error: {
        marginVertical: 5,
        color: 'red',
        fontSize: 12,
    }
})


export default ErrorMessage;