import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Colors } from '../../../global/theme';
import { useAuth } from '../../../context/Auth';
import config from "../../../../config/config.json";

import Header from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import Background from '../../../components/Background/Background';
import LineDivisor from '../../../components/LineDivisor/LineDivisor';


export type ItemProps = {
  id: number,
  status: number,
  sector?: string,
  comments: string,
  updatedAt: string,
  equipamento: string,
  description: string,
}

const PreviousCallPage = () => {

  const { user, client } = useAuth();
  const navigation = useNavigation();

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCalls() {
    if (user.userIDDB) {
      try {
        let reqs = await fetch(config.urlRootPHP + "./ProjectT/GetCalls.php", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user.userIDDB
          })
        });
        let ress = await reqs.json();
        if (ress) {
          setCalls(ress);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        let reqs = await fetch(config.urlRootPHP + "./ProjectT/GetCallsClient.php", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientId: client.userIDDB
          })
        });
        let ress = await reqs.json();
        if (ress) {
          setCalls(ress);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
  }

  const handleDetailsScreen = ({ id, comments, description, equipamento, status, sector, updatedAt }: ItemProps) => {
    navigation.navigate("DetailsPage", { id, comments, description, equipamento, status, sector, updatedAt })
  }
  const _emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyLabel}>Nenhum registro de chamados encontrado</Text>
      </View>
    )
  }
  const _renderItem = ({ item }) => {
    const { description, status, equipamento, updatedAt } = item as ItemProps;
    let dateHoursFormated = updatedAt.split(" ");
    let dateFormated = dateHoursFormated[0].split("-");
    let hoursFormated = dateHoursFormated[1].split(":");
    let date = dateFormated[2] + "/" + dateFormated[1] + "/" + dateFormated[0];
    let hours = Number(hoursFormated[0]) - 5 + ":" + hoursFormated[1];
    let statusFormated = status == 0 ? "Em espera" : status == 1 ? "Em andamento" : "Finalizado";
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.5}
        onPress={() => { handleDetailsScreen(item) }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleLabel}>{equipamento} - {statusFormated}</Text>
          {
            statusFormated == "Em espera" ?
              <View style={styles.iconContainer}>
                <FontAwesome5 name="hourglass-half" size={24} color={Colors.label} />
              </View>
              :
              statusFormated == "Em andamento" ?
                <View style={styles.iconContainer}>
                  <Entypo name="tools" size={24} color={Colors.label} />
                </View>
                :
                <View style={styles.iconContainer}>
                  <Feather name="check-circle" size={24} color={Colors.label} />
                </View>
          }
        </View>
        <LineDivisor />
        <Text style={styles.descriptionLabel}>{description}</Text>
        <View style={styles.infContainer}>
          <AntDesign name="calendar" size={14} color="black" />
          <Text style={[styles.infLabel, { marginRight: 6 }]}>{date}</Text>
          <AntDesign name="clockcircleo" size={14} color="black" />
          <Text style={styles.infLabel}>{hours}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    setCalls([]);
  }, [])
  useFocusEffect(useCallback(() => {
    getCalls();
  }, [calls]));

  useEffect(() => {
    getCalls();
  }, [])

  return (
    <Background>
      <Header
        title='Chamados realizados'
        backIcon />
      {
        loading ?
          <Loading />
          :
          <FlatList
            style={styles.container}
            data={calls}
            keyExtractor={item => item.id}
            renderItem={_renderItem}
            ListEmptyComponent={_emptyComponent}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getCalls} />
            } />
      }
    </Background>
  )
}

export default PreviousCallPage;