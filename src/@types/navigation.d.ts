export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            AboutPage: undefined;
            TermsPage: undefined;
            Registry: undefined;
            HomePage: undefined;
            AuthStack: undefined;
            MyDataPage: undefined;
            ConfigPage: undefined;
            NewCallPage: undefined;
            LoginClient: undefined;
            MyDataClientPage: undefined;
            PreviousCallPage: undefined;
            NewCallClientPage: undefined;
            DetailsPage: {
                id: number,
                status: number,
                sector?: string,
                comments: string,
                updatedAt: string,
                equipamento: string,
                description: string,
            };
            AuthRoutes: undefined;
        }
    }
}