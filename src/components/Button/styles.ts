import { StyleSheet } from "react-native";
import { Colors } from "../../global/theme";

export const styles = StyleSheet.create({
    container: {
        height: 60,
        margin: 20,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.white,
    }
})