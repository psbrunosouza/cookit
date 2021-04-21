import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import Recipes from '../../pages/Recipes';
import CreateRecipe from '../../pages/CreateRecipe';
import DetailsRecipe from '../../pages/DetailsRecipe';

import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from "react-native-reanimated";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RecipesStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {backgroundColor: "#2CAC60"}
      }}
    >
      <Stack.Screen name="Show Recipes" component={Recipes} />
      <Stack.Screen name="Details Recipe" component={DetailsRecipe} />
    </Stack.Navigator>
  );
} 

const CreateRecipeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2CAC60"
        }
      }}
    >
      <Stack.Screen name="Create Recipe"  component={CreateRecipe} />
    </Stack.Navigator>
  );
} 

const MainNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f2f2f2',
        inactiveTintColor: '#f2f2f2',
        activeBackgroundColor: '#2CAC60',
        inactiveBackgroundColor: '#2CAC60'
      }}
    >
      <Tab.Screen 
        name="Recipes" 
        component={RecipesStackNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="home" color="#f2f2f2" size={26} />
          )
        }} />
      <Tab.Screen 
        name="Create Recipe" 
        component={CreateRecipeNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="plus-circle" color="#f2f2f2" size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export {MainNavigation};