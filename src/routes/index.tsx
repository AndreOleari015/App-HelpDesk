import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../context/Auth';

import Loading from '../components/Loading/Loading';
import { AuthRoutes, NoAuthRoutes } from './StackRoute.routes';


export function Routes() {
  const { user, client, loading } = useAuth();
  if (loading) {
    return <Loading />
  }
  return (
    <NavigationContainer>
      {user.userIDDB || client.userIDDB ? < AuthRoutes /> : <NoAuthRoutes />}
    </NavigationContainer>
  )
}