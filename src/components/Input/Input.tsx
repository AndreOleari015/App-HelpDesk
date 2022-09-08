import React from 'react';
import { Text, View, TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';
import { Colors } from '../../global/theme';

type Props = TextInputProps & {
    title: string;
    edit?: boolean;
}

const Input = ({ title, edit = true, ...rest }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={[styles.textInput, , edit ? null : { backgroundColor: "#B0C0C0" }]}
                selectionColor={Colors.label}
                {...rest} />
        </View>
    )
}

export default Input;