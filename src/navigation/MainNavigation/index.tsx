// CORE
import React from "react";
// NAVIGATION
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
// PAGES
import Recipes from '../../pages/ShowRecipes';
import CreateRecipe from '../../pages/CreateRecipe';
import {CreateIngredient} from '../../pages/CreateIngredient';
import DetailsRecipe from '../../pages/DetailsRecipe';
import {CreateSteps} from '../../pages/CreateSteps';
// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';
import { IRecipes } from "../../models/Recipe";
import EditRecipe from "../../pages/EditRecipes";
import { EditIngredient } from "../../pages/EditIngredient";
import { EditSteps } from "../../pages/EditSteps";

type RootStackParamList = {
  Recipes: {recipeId: string | number};
  CreateRecipe: {recipe: IRecipes};
  addIngredient: {recipe: IRecipes};
  CreateSteps: {recipe: IRecipes};
  DetailsRecipe: {recipeId: string| number | undefined};
  EditRecipe: {recipe: IRecipes};
  EditIngredient: {recipe: IRecipes};
  EditSteps: {recipe: IRecipes};
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const RecipesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: "#2CAC60"}
      }}
    >
      <Stack.Screen name="Recipes" component={Recipes} />
      <Stack.Screen name="addIngredient" component={CreateIngredient} />
      <Stack.Screen name="CreateSteps" component={CreateSteps} />
      <Stack.Screen name="DetailsRecipe" component={DetailsRecipe} />
      <Stack.Screen name="EditRecipe" component={EditRecipe} />
      <Stack.Screen name="EditIngredient" component={EditIngredient} />
      <Stack.Screen name="EditSteps" component={EditSteps} />
    </Stack.Navigator>
  );
}

const CreateRecipeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2CAC60"
        }
      }}
    >
      <Stack.Screen name="CreateRecipe"  component={CreateRecipe} />
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
        name="ShowRecipes"
        component={RecipesStack}
        options={{
          tabBarIcon: () => (
            <Icon name="home" color="#f2f2f2" size={26} />
          )
        }} />
      <Tab.Screen
        name="CreateRecipe"
        component={CreateRecipeStack}
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
