import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { styles } from './styles';
import { Colors } from '../../global/theme';

type Props = TouchableOpacityProps & {
    title: string;
    icon?: string;
    deleteButton?: boolean;
    loading?: boolean;
}
const Button = ({ title, icon, loading = false, deleteButton = false, ...rest }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.container, deleteButton ? { backgroundColor: "red" } : null]}
            {...rest}>
            {
                loading ?
                    <ActivityIndicator size={32} color={Colors.thirdy} />
                    :
                    <View style={{ flexDirection: "row" }}>
                        {
                            icon && (
                                <AntDesign name={icon} size={32} color={Colors.white} style={{ marginRight: 7 }} />
                            )
                        }
                        <Text style={styles.label}>
                            {title}
                        </Text>
                    </View>
            }
        </TouchableOpacity>
    )
}

export default Button;