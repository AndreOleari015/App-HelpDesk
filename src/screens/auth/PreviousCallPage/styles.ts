import { StyleSheet } from 'react-native';
import { Colors } from '../../../global/theme';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 20,
        marginHorizontal: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyLabel: {
        fontSize: 24,
        textAlign: "center",
        color: Colors.label,
    },
    itemContainer: {
        height: 130,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: Colors.thirdy
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    titleLabel: {
        flex: 1,
        marginVertical: 10,
        fontWeight: "bold",
        color: Colors.label,
    },
    iconContainer: {
        paddingRight: 10,
        flexDirection: "row",
    },
    descriptionLabel: {
        flex: 1,
        fontWeight: "bold"
    },
    infContainer: {
        paddingBottom: 5,
        flexDirection: "row",
    },
    infLabel: {
        fontSize: 10,
        marginLeft: 3,
        fontWeight: "bold"
    }
});