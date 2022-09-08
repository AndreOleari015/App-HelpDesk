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

const MyDataClientPage: React.FC = () => {


    const { client } = useAuth();

    let CEP = client.cep;
    let rua = client.rua
    let num = client.numero;
    let bairro = client.bairro;
    let telefone = client.telefone;
    let razaoSocial = client.razaoSocial;

    useEffect(() => { },)
    return (
        <Background>
            <Header
                backIcon
                title='Meus Dados' />
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
                    value={razaoSocial}
                    editable={false}
                />
                <Input title='CEP'
                    value={CEP}
                    editable={false}
                />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Input title='Rua'
                            value={rua}
                            editable={false} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Input title='Numero'
                            value={num}
                            editable={false} />
                    </View>
                </View>
                <Input title='Bairro'
                    value={bairro}
                    editable={false} />
                <MaskInput title='Telefone'
                    type='cel-phone'
                    value={telefone}
                    editable={false}
                    keyboardType={"numeric"}
                    options={{
                        maskType: "BRL",
                        withDDD: true,
                        dddMask: "(99) "
                    }}
                />
            </ScrollView>
        </Background>
    )
}

export default MyDataClientPage;