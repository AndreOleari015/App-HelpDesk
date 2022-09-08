import { LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';

import { Routes } from "./src/routes/index";
import { AuthProvider } from './src/context/Auth';

LogBox.ignoreAllLogs();

export default function App() {
  async function lockScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  useEffect(() => {
    lockScreenOrientation()
  }, [])
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Routes />
    </AuthProvider>
  );
}
