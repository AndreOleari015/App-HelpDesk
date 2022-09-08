import React from 'react';
import { Text, View } from 'react-native';

import Header from '../../../components/Header/Header';
import Background from '../../../components/Background/Background';



const AboutPage: React.FC = () => {
    return (
        <Background>
            <Header
                backIcon
                title='Sobre' />
        </Background>
    )
}

export default AboutPage;