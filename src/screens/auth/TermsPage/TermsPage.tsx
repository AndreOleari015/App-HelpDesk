import React from 'react';
import { Text, View } from 'react-native';

import Header from '../../../components/Header/Header';
import Background from '../../../components/Background/Background';



const TermsPage: React.FC = () => {
    return (
        <Background>
            <Header
                backIcon
                title='Política de privacidade' />
        </Background>
    )
}

export default TermsPage;