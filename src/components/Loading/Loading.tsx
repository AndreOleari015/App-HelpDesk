import React from 'react';
import { ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { Colors } from '../../global/theme';

const Loading: React.FC = () => {
    return (
        <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.container}>
            <ActivityIndicator size={70} color={Colors.thirdy}/>
        </LinearGradient>
    )
}

export default Loading;