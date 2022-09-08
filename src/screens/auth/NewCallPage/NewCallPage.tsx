import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { useAuth } from '../../../context/Auth';
import config from "../../../../config/config.json";

import Input from '../../../components/Input/Input';
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button/Button';
import Background from '../../../components/Background/Background';



const NewCallPage: React.FC = () => {

    const { user, client } = useAuth();
    const navigation = useNavigation();

    const [equi, setEqui] = useState("");
    const [sector, setSector] = useState("");
    const [comments, setComments] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");

    async function postCall() {
        setLoading(true);
        if (user.userIDDB) {
            try {
                let reqs = await fetch(config.urlRootPHP + "./ProjectT/InsertCall.php",
                    {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            equipamento: equi,
                            description: description,
                            status: 0,
                            comments: comments,
                            userId: user.userIDDB,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        })
                    });
                let ress = await reqs.json();
                if (ress) {
                    alert(`Cadastro realizado com sucesso, você está na lista de espera, aguarde, logo iremos resolver seu problema.`);
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert("Error!", "Erro ao emitir o chamado!");
            } finally {
                setLoading(false);
            }
        } else {
            try {
                let reqs = await fetch(config.urlRootPHP + "./ProjectT/InsertCallClient.php",
                    {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            equipamento: equi,
                            description: description,
                            sector: sector,
                            status: 0,
                            comments: comments,
                            clientId: client.userIDDB,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        })
                    });
                let ress = await reqs.json();
                if (ress) {
                    alert(`Cadastro realizado com sucesso, você está na lista de espera, aguarde, logo iremos resolver seu problema.`);
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert("Error!", "Erro ao emitir o chamado!");
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <Background>
            <Header
                title='Novo chamado'
                backIcon={true} />
            <ScrollView
                style={styles.inputContainer}
                showsVerticalScrollIndicator={false}>
                <Input title='Equipamento'
                    value={equi}
                    onChangeText={setEqui} />
                {
                    client.userIDDB ?
                        <Input title='Setor'
                            value={sector}
                            onChangeText={setSector} />
                        :
                        null
                }
                <Input title='Descrição do problema'
                    multiline
                    numberOfLines={6}
                    value={description}
                    style={styles.input}
                    textAlignVertical={'top'}
                    onChangeText={setDescription} />
                <Input title='Obserações'
                    value={comments}
                    style={styles.input}
                    textAlignVertical={'top'}
                    onChangeText={setComments} />
            </ScrollView>
            <Button
                title='Finalizar'
                loading={loading}
                onPress={postCall} />
        </Background>
    )
}

export default NewCallPage;