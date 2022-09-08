import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import Button from '../../../components/Button/Button';
import Header from '../../../components/Header/Header';
import Background from '../../../components/Background/Background';


const HomePage: React.FC = () => {

  const navigation = useNavigation();

  const handleNewCallScreen = () => {
    navigation.navigate("NewCallPage");
  }
  const handlePreviousCallScreen = () => {
    navigation.navigate("PreviousCallPage");
  }
  return (
    <Background>
      <Header
        img
        title='SUPORTE TECSIL'
        center
        config />
      <View style={styles.buttonContainer}>
        <Button
          title='Abrir novo chamado'
          onPress={handleNewCallScreen}
        />
        <Button
          title='Ver chamados realizados'
          onPress={handlePreviousCallScreen}
        />
      </View>
    </Background>
  )
}

export default HomePage;