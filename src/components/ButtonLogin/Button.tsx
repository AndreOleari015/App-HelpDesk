import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';


import { styles } from './styles';
import { Colors } from '../../global/theme';
import { LinearGradient } from 'expo-linear-gradient';

type Props = TouchableOpacityProps & {
    title: string;
    icon?: string;
    loading?: boolean;
}
const ButtonLogin = ({ title, loading = false, icon, ...rest }: Props) => {
    return (
        <LinearGradient
            style={styles.container}
            colors={[Colors.primary, Colors.secondary]}>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.5}
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
        </LinearGradient>
    )
}

export default ButtonLogin;