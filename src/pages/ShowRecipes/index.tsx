import 'react-native-gesture-handler';
import React from 'react';
import { RecipeService } from '../../services/RecipeService'
import { IRecipes } from '../../models/Recipe'

// NATIVE COMPONENTS
import {
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';


import {
  Card,
  Title,
  Paragraph,
  Button,
  Caption,
} from 'react-native-paper';

type Props = {
  route: RouteProp<any, any>;
};


const Recipes: React.FC<Props> = ({ route }) => {
  const [recipes, setRecipes] = React.useState<IRecipes[]>([])
  const navigation = useNavigation();

  React.useEffect(() => {
    const recipeService = new RecipeService();
    recipeService.index().then((response) => {
      setRecipes(response.data)
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <Title style={styles.pageTitle}>Lista de receitas</Title>
      <FlatList
        style={{ marginBottom: 64 }}
        keyExtractor={(recipe => recipe.id)}
        data={recipes}
        renderItem={({ item: recipe }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: `${recipe.imagePath}` }} />
            <Card.Content>
              <Title>{recipe.title}</Title>
              <Paragraph>{recipe.description}</Paragraph>
            </Card.Content>

            <Card.Content>

              <Caption>Ingredients</Caption>
              <FlatList
                style={styles.ingredientsList}
                keyExtractor={ingredient => ingredient.id}
                data={recipe.ingredients}
                renderItem={({ item: ingredient }) => (
                  <Caption key={ingredient.id} style={styles.ingredientTag}>{`${ingredient.name}`}</Caption>
                )}
              />

            </Card.Content>

            <Card.Actions>
              <Button onPress={() => navigation
                .navigate("DetailsRecipe", { recipeId: recipe.id })}>
                See more
                </Button>
            </Card.Actions>
          </Card>
        )} />
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  Container: {
    width: '100%',
    alignItems: "center",
  },

  pageTitle: {
    color: '#2CAC60',
    marginTop: 18,
    marginBottom: 18,
    fontSize: 18,
    fontWeight: 'bold'

  },

  timeColor: {
    backgroundColor: '#2CAC60',
    paddingTop: 3,
    paddingRight: 8,
    paddingBottom: 3,
    paddingLeft: 8,
    borderRadius: 24,
    color: 'white'
  },

  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  card: {
    width: 280,
    marginBottom: 12
  },

  ingredientsList: {
    flexDirection: 'row'
  },

  ingredientTag: {
    backgroundColor: '#359ff5',
    color: '#fff',
    marginRight: 4,
    borderRadius: 8,
    paddingLeft: 4,
    paddingRight: 4
  }
});

export default Recipes;