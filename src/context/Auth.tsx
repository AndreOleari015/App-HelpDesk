import { Alert } from "react-native";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from "react";

import config from "../../config/config.json";
import { CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE } from "../api/Google";

type ProviderProps = {
    children: React.ReactNode;
};

type AutorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        error?: string;
        access_token?: string;
    }
}

type User = {
    id: number,
    cep: string,
    rua: string,
    email: string,
    token: string,
    numero: string,
    bairro: string;
    telefone: string,
    userIDDB: number,
    firstname: string,
    secondName: string,
    imgProfile: string,
};

type Client = {
    cep: string,
    rua: string,
    cnpj: string,
    numero: string,
    bairro: string,
    imgUser: string,
    userIDDB: number,
    telefone: string,
    haveSector: boolean,
    razaoSocial: string;
}

interface ContextData {
    user: User,
    client: Client,
    newUser: boolean,
    loading: boolean,
    clientLogged: boolean,
    loadingButton: boolean,
    resgistryCheck: boolean,
    signIn: () => Promise<void>,
    signOut: () => Promise<void>,
    resgistry: () => Promise<void>;
    deleteAccount: (id: number) => Promise<void>;
    signInClient: (cnpj: string, senha: string) => Promise<void>,
    editAccount: (id: number, cep: string, rua: string, numero: string, bairro: string, telefone: string, updatedAt: Date) => Promise<void>;
}

export const AuthProvider = (props: ProviderProps) => {
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState<User>({} as User);
    const [client, setClient] = useState<Client>({} as Client);
    const [clientLogged, setClientLogged] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [resgistryCheck, setRegistyCheck] = useState(false);

    async function signIn() {
        setLoadingButton(true);
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
        const { type, params } = await AuthSession
            .startAsync({ authUrl }) as AutorizationResponse;
        try {
            if (type === "success" && !params.error) {
                const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();

                const email = userInfo.email;
                const imgProfile = userInfo.picture;
                const firstname = userInfo.given_name;
                const secondName = userInfo.family_name;
                let reqs = await fetch(config.urlRootPHP + "./ProjectT/VerifyLogin.php", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email
                    })
                });
                let ress = await reqs.json();
                if (ress) {
                    const userIDDB = ress.id;
                    const cep = ress.cep;
                    const rua = ress.rua;
                    const numero = ress.numero;
                    const telefone = ress.telefone;
                    const bairro = ress.bairro;
                    const userData = {
                        ...userInfo.data,
                        cep,
                        rua,
                        email,
                        bairro,
                        numero,
                        telefone,
                        userIDDB,
                        firstname,
                        imgProfile,
                        secondName,
                        token: params.access_token,
                    }
                    setUser(userData);
                    AsyncStorage.setItem('@AuthData', JSON.stringify(userData));
                } else {
                    const userData = {
                        ...userInfo.data,
                        email,
                        firstname,
                        imgProfile,
                        secondName,
                        token: params.access_token,
                    }
                    setUser(userData);
                    setNewUser(true);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message, 'Tente novamente');
            }
        } finally {
            setLoadingButton(false);
        }

    }

    async function resgistry() {
        setLoadingButton(true);
        try {
            let reqs = await fetch(config.urlRootPHP + "./ProjectT/Registry.php",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: user.firstname[0].toUpperCase() + user.firstname.substring(1) + " " + user.secondName[0].toUpperCase() + user.secondName.substring(1),
                        email: user.email,
                        imgUser: user.imgProfile,
                        cep: user.cep,
                        rua: user.rua,
                        numero: user.numero,
                        bairro: user.bairro,
                        telefone: user.telefone,
                        createAt: new Date(),
                        updateAt: new Date(),
                    },
                    )
                });
            let ress = await reqs.json();
            if (ress) {
                user.userIDDB = ress.id
                await AsyncStorage.setItem('@AuthData', JSON.stringify(user));
                setRegistyCheck(true);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message, 'Tente novamente');
            }
        } finally {
            setLoadingButton(false);
        }

    }

    async function signOut() {
        setNewUser(false);
        setUser({} as User);
        setClient({} as Client);
        await AsyncStorage.removeItem('@AuthData');
    }

    async function signInClient(cnpj: string, senha: string) {
        try {
            let reqs = await fetch(config.urlRootPHP + "./ProjectT/VerifyLoginClient.php",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cnpj,
                        senha,
                    })
                });
            let ress = await reqs.json();
            if (ress) {
                const rua = ress.rua;
                const cep = ress.cep;
                const cnpj = ress.cnpj;
                const userIDDB = ress.id;
                const bairro = ress.bairro;
                const numero = ress.numero;
                const telefone = ress.telefone;
                const imgUser = ress.imgUser;
                const razaoSocial = ress.RazaoSocial;
                const haveSector = ress.haveSector
                const userData = {
                    cep,
                    rua,
                    cnpj,
                    bairro,
                    numero,
                    imgUser,
                    telefone,
                    userIDDB,
                    haveSector,
                    razaoSocial,
                }
                setClient(userData);
                await AsyncStorage.setItem('@AuthData', JSON.stringify(userData));
                setClientLogged(true);
            }
        } catch (error) {
            alert("Erro ao deletar a conta")
        }
    }

    async function deleteAccount(id: number) {
        setLoading(true);
        try {
            let reqs = await fetch(config.urlRootPHP + "./ProjectT/DeleteAccount.php",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id
                    })
                });
            let ress = await reqs.json();
            if (ress) {
                await signOut();
                alert("Conta excluida com sucesso");
            }
        } catch (error) {
            alert("Erro ao deletar a conta")
        } finally {
            setLoading(false)
        }
    }

    async function editAccount(id: number, cep: string, rua: string, numero: string, bairro: string, telefone: string, updatedAt: Date) {
        setLoadingButton(true);
        try {
            let reqs = await fetch(config.urlRootPHP + "./ProjectT/EditAccount.php",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id,
                        cep,
                        rua,
                        numero,
                        bairro,
                        telefone,
                        updatedAt
                    })
                });
            let ress = await reqs.json();
            if (ress) {
                alert("Para as alterações se concretizarem, deslogue e logue novamente");
            }
        } catch (error) {
            alert("Erro ao editar a conta")
        } finally {
            setLoadingButton(false);
        }
    }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem("@AuthData");
        if (storage) {
            if (storage.includes("email")) {
                const userLogged = JSON.parse(storage) as User;
                setUser(userLogged);
            } else {
                const userLogged = JSON.parse(storage) as Client;
                setClient(userLogged);
            }
        }
        setLoading(false);
    }
    useEffect(() => {
        loadUserStorageData();
    }, [])
    return (
        <AuthContext.Provider value={{ user, client, loading, clientLogged, loadingButton, resgistryCheck, newUser, deleteAccount, signInClient, editAccount, signIn, resgistry, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}
const AuthContext = createContext<ContextData>({} as ContextData);
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}