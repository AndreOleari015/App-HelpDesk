import React, { useCallback } from 'react';
import { Alert, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { useAuth } from '../../../context/Auth';

import ButtonLogin from '../../../components/ButtonLogin/Button';


const Login: React.FC = () => {

    const { signIn, newUser, loadingButton } = useAuth();
    const navigation = useNavigation();

    const handleSignIn = () => {
        signIn();
    }
    const handleSignInClient = () => {
        Alert.alert("Aviso!", "Essa area é exclusiva para empresas que tem contrato com a TecSil.\nCaso queria fazer um contrato, entre em contato no numero (91)98227-1845",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => navigation.navigate("LoginClient"),
                }
            ])
    }
    const handleRegistryClient = () => {
        if (newUser) {
            navigation.navigate("Registry");
        }
    }
    useFocusEffect(useCallback(() => {
        handleRegistryClient()
    }, [newUser]));
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.LogoContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    resizeMode={"center"}
                    style={styles.img} />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonLogin
                    icon={"google"}
                    title={"Login com o Google"}
                    loading={loadingButton}
                    onPress={handleSignIn}
                />
                <ButtonLogin
                    title={"Já sou cliente"}
                    icon={"user"}
                    onPress={handleSignInClient}
                />
            </View>
        </SafeAreaView>
    );
}

export default Login;