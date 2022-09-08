import { Colors } from '../../global/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: "bold",
        color: Colors.label,
    },
    textInput: {
        height: 45,
        minWidth: 45,
        paddingLeft: 10,
        borderRadius: 8,
        backgroundColor: Colors.textInput,
    }
});