import { StyleSheet } from 'react-native';
import { Colors } from '../../../global/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        marginHorizontal: 20,
    },
    input: {
        height: 150,
        paddingTop: 5,
        paddingLeft: 10,
        borderRadius: 8,
        backgroundColor: Colors.textInput,
    },
    checkContainer: {
        alignItems: "center",
        flexDirection: "row",
    },
    checkbox: {
        marginVertical: 8,
        marginRight: 8
    },
    checkLabel: {
        color: Colors.label,
        fontWeight: "bold"
    }
});