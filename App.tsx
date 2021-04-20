import React from 'react';

// import { StatusBar } from 'expo-status-bar';

// ROUTES
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// STYLE
import { AppRegistry } from 'react-native';
import { 
  DefaultTheme, 
  BottomNavigation, 
  Provider as PaperProvider,
  Appbar
} from 'react-native-paper';


// PAGES
import CreateRecipe from './src/pages/CreateRecipe';
import Recipes from './src/pages/Recipes';
import RecipesDetails from './src/pages/Details';

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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recipes', title: 'Recipes', icon: 'home' },
    { key: 'createRecipe', title: 'Create Recipe', icon: 'plus-circle'},
    {key: 'recipesDetails', title: 'Recipes Details', icon: 'book'}
  ]);

  const renderScene = BottomNavigation.SceneMap({
    recipes: Recipes,
    createRecipe: CreateRecipe,
    recipesDetails: RecipesDetails
  });

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>

        <Appbar.Header>
          <Appbar.Content title="Cookit" />
        </Appbar.Header>

        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          theme={theme}
        /> 
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('MyRecipes', () => App);



