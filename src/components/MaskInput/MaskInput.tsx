import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { Colors } from '../../global/theme';

import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";

type Props = TextInputMaskProps & {
    title: string;
    edit?: boolean;
}

const MaskInput = ({ title, edit = true, ...rest }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInputMask
                style={[styles.textInput, , edit ? null : { backgroundColor: "#B0C0C0" }]}
                selectionColor={Colors.label}
                {...rest} />
        </View>
    )
}

export default MaskInput;