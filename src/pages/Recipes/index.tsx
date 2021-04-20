import 'react-native-gesture-handler';
import React from 'react';

// NATIVE COMPONENTS
import { 
  StyleSheet, 
  ScrollView, 
  FlatList,  
} from 'react-native';

import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Caption,
} from 'react-native-paper';

//DATABASE
import mockDb from '../../db/database.json';

const Recipes: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} >
      <Title style={styles.pageTitle}>Lista de receitas</Title>
        <FlatList 
          keyExtractor={(Db => Db.id)} 
          data={mockDb.Recipies} 
          renderItem={({ item:recipe }) => (
            <Card style={styles.card}>
              <Card.Cover source={{ uri: `${recipe.imagePath}` }} />
              <Card.Content>
                <Title>{recipe.title}</Title>
                <Paragraph>{recipe.description}</Paragraph>
              </Card.Content>

              <Card.Content>
              
              <Caption>Ingredients</Caption>
              <FlatList
                keyExtractor={ingredient => ingredient.id}
                data={recipe.Ingredients}
                style={styles.ingredientsList}
                renderItem={({item: ingredient}) => (
                  <Caption style={styles.ingredientTag}>{`${ingredient.name}`}</Caption>
                )}
              />
            
              </Card.Content>

              <Card.Actions>
                <Button 
                 >
                    See more
                </Button>
              </Card.Actions>
            </Card>
        )} />

        
      </ScrollView>
  )
}


const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    alignItems: "center"
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