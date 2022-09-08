import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../../../components/Header/Header';
import Background from '../../../components/Background/Background';
import ConfigItem from '../../../components/ConfigItem/ConfigItem';

import { useAuth } from '../../../context/Auth';

const ConfigPage: React.FC = () => {

    const navigation = useNavigation();
    const { signOut, user } = useAuth();
    const handleMyDataScreen = () => {
        if (user.userIDDB) {
            navigation.navigate("MyDataPage");
        } else {
            navigation.navigate("MyDataClientPage");
        }
    }
    const handleAboutScreen = () => {
        navigation.navigate("AboutPage");
    }
    const handleTermsScreen = () => {
        navigation.navigate("TermsPage");
    }

    async function handleLogOut() {
        await signOut();
    }

    return (
        <Background>
            <Header
                backIcon
                title='Configurações' />
            <ConfigItem
                icon='person'
                title='Meus Dados'
                onPress={handleMyDataScreen}
            />
            <ConfigItem
                title='Sobre'
                icon='information-circle'
                onPress={handleAboutScreen}
            />
            <ConfigItem
                icon='document-text'
                title='Política de privacidade'
                onPress={handleTermsScreen}
            />
            <ConfigItem
                title='Sair'
                icon='arrow-back'
                onPress={handleLogOut}
            />
        </Background>
    )
}

export default ConfigPage;