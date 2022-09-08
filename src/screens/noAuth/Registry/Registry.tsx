import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { useAuth } from '../../../context/Auth';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Header from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import MaskInput from '../../../components/MaskInput/MaskInput';
import Background from '../../../components/Background/Background';



const Registry: React.FC = () => {

    const [CEP, setCEP] = useState("68630748");
    const [rua, setRua] = useState("Imbua");
    const [num, setNum] = useState("105");
    const [bairro, setBairro] = useState("TM");
    const [telefone, setTelefone] = useState("(91)984732602");
    const [loading, setLoading] = useState(false);

    const { resgistry, user, loadingButton, resgistryCheck } = useAuth();
    const navigation = useNavigation();

    async function handleRegistry() {
        user.cep = CEP;
        user.rua = rua;
        user.numero = num;
        user.bairro = bairro;
        user.telefone = telefone;
        await resgistry();
    }
    async function getCEP(cep: string) {
        setLoading(true);
        try {
            let reqs = await fetch("https://viacep.com.br/ws/" + cep + "/json/",
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
            let ress = await reqs.json();
            if (ress) {
                if (ress.erro) {
                    return Alert.alert("CEP Invalido!", "Por favor, insira um CEP válido")
                } else {
                    setRua(ress.logradouro);
                    setBairro(ress.bairro);
                }
            }
        } catch (error) {
            Alert.alert("Erro!", "Por favor, insira um CEP válido!")
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        BackHandler.removeEventListener('hardwareBackPress', () => true);
        if (resgistryCheck) {
            navigation.navigate("AuthRoutes");
        }
    }, [resgistryCheck]);
    return (
        <Background>
            <Header title='Cadastro' />
            <View style={styles.inputContainer}>
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            <Input title='CEP'
                                value={CEP}
                                onChangeText={setCEP}
                                onEndEditing={() => getCEP(CEP)}
                                keyboardType={"numeric"} />
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Input title='Rua'
                                        value={rua}
                                        onChangeText={setRua} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Input title='Nº'
                                        value={num}
                                        onChangeText={setNum} />
                                </View>
                            </View>
                            <Input title='Bairro'
                                value={bairro}
                                onChangeText={setBairro} />
                            <MaskInput
                                title='Telefone'
                                type='cel-phone'
                                value={telefone}
                                options={{
                                    maskType: "BRL",
                                    withDDD: true,
                                    dddMask: "(99) "
                                }}
                                onChangeText={setTelefone}
                                keyboardType={"numeric"} />
                        </>
                }
            </View>
            <Button
                title='Cadastrar'
                loading={loadingButton}
                onPress={handleRegistry} />
        </Background>
    )
}

export default Registry;