import { StyleSheet } from "react-native";
import { Colors } from "../../global/theme";

export const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.thirdy,
    },
    img: {
        height: 50,
        width: 50,
    },
    title: {
        flex:1,
        fontSize: 22,
        marginLeft: 10,
        fontWeight: "bold",
        color: Colors.label,
    }
})