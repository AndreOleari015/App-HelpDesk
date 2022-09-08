import { StyleSheet } from 'react-native';
import { Colors } from '../../global/theme';

export const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20,
    },
    titleLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.label,
        marginVertical: 10,
    },
    lineDivisor: {
        width: "100%",
        borderTopWidth: 2,
    }
});