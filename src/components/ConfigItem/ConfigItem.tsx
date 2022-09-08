import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { Colors } from '../../global/theme';

type Props = TouchableOpacityProps & {
    title: string;
    icon: string;
}

const ConfigItem = ({ title, icon, ...rest }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.container}
            {...rest}>
            <Ionicons name={icon} size={32} color={Colors.label} />
            <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={styles.titleLabel}>{title}</Text>
                <View style={styles.lineDivisor} />
            </View>
        </TouchableOpacity>
    )
}

export default ConfigItem;