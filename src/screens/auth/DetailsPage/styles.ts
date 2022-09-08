import { StyleSheet } from 'react-native';
import { Colors } from '../../../global/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    input: {
        height: 150,
        paddingTop: 5,
        paddingLeft: 10,
        borderRadius: 8,
        backgroundColor: Colors.textInput,
    },
});