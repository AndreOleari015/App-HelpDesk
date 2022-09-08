import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import { useAuth } from '../../../context/Auth';

import Input from '../../../components/Input/Input';
import ButtonLogin from '../../../components/ButtonLogin/Button';
import MaskInput from '../../../components/MaskInput/MaskInput';
import { useNavigation } from '@react-navigation/native';



const LoginClient: React.FC = () => {
    const [CNPJ, setCNPJ] = useState("14.422.225/0001-40");
    const [senha, setSenha] = useState("");

    const { signInClient, clientLogged } = useAuth();
    const navigation = useNavigation();

    const handleSignIn = () => {
        signInClient(CNPJ, senha);
    }
    useEffect(() => {
        if (clientLogged) {
            navigation.navigate("AuthRoutes");
        }
    }, [clientLogged])
    return (
        <View style={styles.container}>
            <View style={styles.LogoContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    resizeMode={"center"}
                    style={styles.img} />
            </View>
            <View style={styles.inputContainer}>
                <MaskInput
                    title='CNPJ'
                    value={CNPJ}
                    type={"cnpj"}
                    onChangeText={setCNPJ} />
                <Input
                    title='Senha'
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry />
            </View>
            <ButtonLogin
                title='Entrar'
                onPress={handleSignIn} />
        </View>
    )
}

export default LoginClient;