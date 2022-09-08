import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgContainer: {
        height: 100,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    img: {
        width: 100,
        height: "100%",
        borderRadius: 50,
    },
    warnLabel: {
        color: "red",
        marginTop: -10
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    button: {
        height: 60,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.4)",
    },
});