import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { LocationProvider } from './src/utils/LocationContext';

const theme = {
  colors: {
    primary: 'rgb(235,66,73)',
    accent: 'rgb(242,129,71)',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    disabled: '#9E9E9E',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <LocationProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </LocationProvider>
    </PaperProvider>
  );
}

