import React from 'react';

// STRUCTURE
import { View, StyleSheet, FlatList } from 'react-native';
import { Caption, DataTable } from 'react-native-paper'; 
import {RecipesProps} from '../../models/Recipe';

interface ShowIngredientsProps {
  recipe: RecipesProps;
}

const ShowIngredients: React.FC<ShowIngredientsProps> = (...props) => {
  return (
    <View style={styles.ingredientContainer}>
      <Caption style={styles.ingredientsTitle}>Ingredients</Caption>
      <DataTable style={styles.ingredientsTable}>
        <DataTable.Header>
          <DataTable.Title>name</DataTable.Title>
          <DataTable.Title numeric>quantity</DataTable.Title>
        </DataTable.Header>

        {
          console.log(props)
        }

        {/* <FlatList  
          keyExtractor={ingredient => ingredient.id} 
          data={recipe.ingredients} 
          renderItem={({item}) => {
            <DataTable.Row>
              <DataTable.Cell>
                <Caption style={styles.ingredientsTableRow}>
                  Frozen yogurt
                </Caption>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Caption style={styles.ingredientsTableRow}>8001</Caption>
              </DataTable.Cell>
            </DataTable.Row>
        }}/> */}
         
      </DataTable>
    </View>
  )
};

const styles = StyleSheet.create({
  ingredientContainer: {
    marginTop: "5%",
    justifyContent: "center",
  },

  ingredientsTitle: {
    marginTop: 10,
    textAlign: 'center'
  },

  ingredientsTable: {
    width: 260,
    marginBottom: 64
  },

  ingredientsTableRow: {
    color: '#aaaaaa',
    fontStyle: 'italic'
  }
  
});

export {ShowIngredients}