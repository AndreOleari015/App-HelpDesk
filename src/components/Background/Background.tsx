import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { Colors } from '../../global/theme';


type ProviderProps = {
    children: React.ReactNode;
};

const Background: React.FC = (props: ProviderProps) => {
    return (
        <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.container}>
            {props.children}
        </LinearGradient>
    )
}

export default Background;