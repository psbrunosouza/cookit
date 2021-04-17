import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import CreateRecipe from './src/pages/CreateRecipe';
import Recipes from './src/pages/Recipes';

const Stack = createStackNavigator();

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
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator>
          {/* <Stack.Screen name="Recipes" component={Recipes} options={{
          title: 'My recipes',
          headerStyle: {
            backgroundColor: '#2CAC60',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} /> */}

          <Stack.Screen name="Create Recipe" component={CreateRecipe} options={{
          title: 'My recipes',
          headerStyle: {
            backgroundColor: '#2CAC60',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('MyRecipes', () => App);



