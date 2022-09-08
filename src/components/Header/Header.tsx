import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import { Colors } from '../../global/theme';

type Props = {
  title: string,
  img?: boolean,
  backIcon?: boolean,
  config?: boolean,
  center?: boolean;
}

const Header = ({ title, img, backIcon = false, center = false, config = false }: Props) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack()
  }
  const handleConfigScreen = () => {
    navigation.navigate("ConfigPage")
  }

  return (
    <SafeAreaView style={[styles.headerContainer, center ? { justifyContent: "center" } : null]}>
      {
        img ?
          <Image
            source={require("../../assets/logo_secondary.png")}
            style={styles.img}
            resizeMode={"contain"} />
          :
          null
      }
      {
        backIcon ?
          <AntDesign
            name="arrowleft"
            size={30}
            color={Colors.label}
            onPress={handleGoBack} />
          :
          null
      }
      <Text style={styles.title}>{title}</Text>
      {
        config ?
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome
              size={32}
              name="gear"
              color={Colors.label}
              onPress={handleConfigScreen} />
          </TouchableOpacity>
          :
          null
      }
    </SafeAreaView>
  )
}

export default Header;