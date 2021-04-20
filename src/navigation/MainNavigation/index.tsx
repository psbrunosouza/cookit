import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import Recipes from '../../pages/Recipes';
import CreateRecipe from '../../pages/CreateRecipe';
import DetailsRecipe from '../../pages/DetailsRecipe';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RecipesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Show Recipes" component={Recipes} />
      <Stack.Screen name="Details Recipe" component={DetailsRecipe} />
    </Stack.Navigator>
  );
} 

const CreateRecipeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Recipe" component={CreateRecipe} />
    </Stack.Navigator>
  );
} 

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recipes" component={RecipesStackNavigator} />
      <Tab.Screen name="Create Recipe" component={CreateRecipeNavigator} />
    </Tab.Navigator>
  );
};

export {MainNavigation};