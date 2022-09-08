import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { ItemProps } from '../PreviousCallPage/PreviousCallPage';

import config from "../../../../config/config.json";
import Input from '../../../components/Input/Input';
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button/Button';
import Background from '../../../components/Background/Background';


const DetailsPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, equipamento, comments, sector, description, status, updatedAt } = route.params as ItemProps;

    const [sectorInf, setSectorInf] = useState(sector);
    const [commentsInf, setCommentsInf] = useState(comments);
    const [equipamentoInf, setEquipamentoInf] = useState(equipamento);
    const [descriptionInf, setDescriptionInf] = useState(description);

    async function deleteInf(id: number, script: string) {
        try {
            let reqs = await fetch(config.urlRootPHP + "./ProjectT/" + script,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id
                    })
                });
            let ress = await reqs.json();
            if (ress) {
                alert("Excluido com sucesso!!");
                navigation.goBack();
            }
        } catch (error) {

        }
    }
    async function editCall(id: number, equipamento: string, description: string, comments: string, updatedAt: Date) {
        try {
            let reqs = await fetch(config.urlRootPHP + "./ProjectT/EditCall.php",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id,
                        equipamento,
                        description,
                        comments,
                        updatedAt,
                    })
                });
            let ress = await reqs.json();
            if (ress) {
                alert("Editado com sucesso!!");
                navigation.goBack();
            }
        } catch (error) {
            alert(error);
        }
    }
    function handleDeleteCall() {
        Alert.alert("Aviso!", "Essa ação fará com que esse chamado seja deletado, tem certeza?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Tenho",
                    onPress: () => deleteInf(id, "DeleteCall.php")
                }
            ])
    }
    function handleEditCall() {
        editCall(id, equipamentoInf, descriptionInf, commentsInf, new Date());
    }
    return (
        <Background>
            <Header
                backIcon
                title={equipamento} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <Input
                    title='Equipamento'
                    value={equipamentoInf}
                    onChangeText={setEquipamentoInf}
                />
                {
                    sector ?
                        <Input
                            title='Setor'
                            value={sectorInf}
                            onChangeText={setSectorInf}
                        />
                        :
                        null
                }
                <Input title='Descrição do problema'
                    multiline
                    numberOfLines={6}
                    value={descriptionInf}
                    style={styles.input}
                    textAlignVertical={'top'}
                    onChangeText={setDescriptionInf} />
                <Input title='Obserações'
                    value={commentsInf}
                    style={styles.input}
                    textAlignVertical={'top'}
                    onChangeText={setCommentsInf} />
            </ScrollView>
            {
                status != 0 ?
                    null
                    :
                    <>
                        <Button
                            title='Salvar alterações'
                            onPress={handleEditCall} />
                        <View style={{ marginTop: -20 }}>
                            <Button
                                title='Excluir'
                                deleteButton
                                onPress={handleDeleteCall} />
                        </View>
                    </>
            }
        </Background>
    )
}

export default DetailsPage;