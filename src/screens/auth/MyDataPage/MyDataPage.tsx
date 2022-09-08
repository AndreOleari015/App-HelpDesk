import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import { useAuth } from '../../../context/Auth';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Header from '../../../components/Header/Header';
import MaskInput from '../../../components/MaskInput/MaskInput';
import Background from '../../../components/Background/Background';
import Loading from '../../../components/Loading/Loading';

const MyDataPage: React.FC = () => {

    const { user, deleteAccount, editAccount, loading, loadingButton } = useAuth();

    let pname = user.firstname.charAt(0).toUpperCase() + user.firstname.substring(1);
    let sname = user.secondName.charAt(0).toUpperCase() + user.secondName.substring(1);

    const [CEP, setCEP] = useState(user.cep);
    const [rua, setRua] = useState(user.rua);
    const [num, setNum] = useState(user.numero);
    const [loadingCEP, setLoadingCEP] = useState(false);
    const [bairro, setBairro] = useState(user.bairro);
    const [telefone, setTelefone] = useState(user.telefone);

    async function getCEP() {
        setLoadingCEP(true);
        try {
            let reqs = await fetch("https://viacep.com.br/ws/" + CEP + "/json/",
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
            setLoadingCEP(false);
        }
    }

    const handleDeleteAccount = () => {
        Alert.alert("Aviso!", "Essa ação fará com que todos os seus dados sejam apagados, tem certeza?", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Tenho",
                onPress: () => deleteAccount(user.userIDDB)
            }
        ])
    }

    const handleEditInforUser = () => {
        Alert.alert("Aviso!", "Deseja salvar as alterações?", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Salvar",
                onPress: () => editAccount(
                    user.userIDDB,
                    CEP,
                    rua,
                    num,
                    bairro,
                    telefone,
                    new Date()
                )
            }
        ])
    }
    return (
        <Background>
            <Header
                backIcon
                title='Meus Dados' />
            {
                loadingCEP ?
                    <Loading /> :
                    <>
                        <ScrollView
                            style={styles.inputContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.imgContainer}>
                                <Image
                                    resizeMode='contain'
                                    source={require("../../../assets/profile.jpg")}
                                    style={styles.img}
                                />
                            </View>
                            <Input
                                title='Nome'
                                value={pname + " " + sname}
                                edit={false}
                                editable={false}
                            />
                            <Text style={styles.warnLabel}>Nome não pode ser alterado</Text>
                            <Input
                                title='E-mail'
                                edit={false}
                                value={user.email}
                                editable={false} />
                            <Text style={styles.warnLabel}>E-mail não pode ser alterado</Text>
                            <Input title='CEP'
                                value={CEP}
                                onChangeText={setCEP}
                                onEndEditing={() => getCEP()}
                                keyboardType={"numeric"} />
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Input title='Rua'
                                        value={rua}
                                        onChangeText={setRua} />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Input title='Numero'
                                        value={num}
                                        onChangeText={setNum} />
                                </View>
                            </View>
                            <Input title='Bairro'
                                value={bairro}
                                onChangeText={setBairro} />
                            <MaskInput title='Telefone'
                                type='cel-phone'
                                value={telefone}
                                onChangeText={setTelefone}
                                keyboardType={"numeric"}
                                options={{
                                    maskType: "BRL",
                                    withDDD: true,
                                    dddMask: "(99) "
                                }}
                            />
                            <Button
                                style={styles.button}
                                loading={loadingButton}
                                onPress={handleEditInforUser}
                                title='Salvar alterações' />
                            <Button
                                title='Deletar conta'
                                onPress={handleDeleteAccount}
                                loading={loading}
                                style={[styles.button, { backgroundColor: "red", }]}
                            />
                        </ScrollView>
                    </>
            }
        </Background>
    )
}

export default MyDataPage;