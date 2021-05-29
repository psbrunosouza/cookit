import React from 'react';

// ROUTES
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation } from './src/navigation/MainNavigation';
import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2CAC60',
    accent: '#2CAC60',
  },
};

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer >
        <MainNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}



