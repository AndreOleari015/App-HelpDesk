import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../screens/auth/HomePage/HomePage';
import AboutPage from '../screens/auth/AboutPage/AboutPage';
import TermsPage from '../screens/auth/TermsPage/TermsPage';
import ConfigPage from '../screens/auth/ConfigPage/ConfigPage';
import MyDataPage from '../screens/auth/MyDataPage/MyDataPage';
import DetailsPage from '../screens/auth/DetailsPage/DetailsPage';
import NewCallPage from '../screens/auth/NewCallPage/NewCallPage';
import PreviousCallPage from '../screens/auth/PreviousCallPage/PreviousCallPage';
import MyDataClientPage from '../screens/auth/MyDataClientPage/MyDataClientPage';

import Login from '../screens/noAuth/Login/Login';
import Registry from '../screens/noAuth/Registry/Registry';
import LoginClient from '../screens/noAuth/LoginClient/LoginClient';


const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="HomePage" component={HomePage} />
            <Screen name="AboutPage" component={AboutPage} />
            <Screen name="TermsPage" component={TermsPage} />
            <Screen name="ConfigPage" component={ConfigPage} />
            <Screen name="MyDataPage" component={MyDataPage} />
            <Screen name="NewCallPage" component={NewCallPage} />
            <Screen name="DetailsPage" component={DetailsPage} />
            <Screen name="MyDataClientPage" component={MyDataClientPage} />
            <Screen name="PreviousCallPage" component={PreviousCallPage} />
        </Navigator>
    )
}
export function NoAuthRoutes() {
    return (
        <Navigator
            screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
            <Screen name="Registry" component={Registry} />
            <Screen name="LoginClient" component={LoginClient} />
            <Screen name="AuthRoutes" component={AuthRoutes} />
        </Navigator>
    )
}