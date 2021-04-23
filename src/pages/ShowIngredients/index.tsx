import React from 'react';

// STRUCTURE
import { View, StyleSheet, FlatList } from 'react-native';
import { Caption, DataTable } from 'react-native-paper'; 
import {Ingredient} from '../../models/Ingredient';

type Props = {
  ingredients: Ingredient[];
};

const ShowIngredients: React.FC<Props> = ({ingredients}) => {

  return (

    <View style={styles.ingredientContainer}>
      <Caption style={styles.ingredientsTitle}>Ingredients</Caption>
      <DataTable style={styles.ingredientsTable}>
        <DataTable.Header>
          <DataTable.Title>name</DataTable.Title>
          <DataTable.Title numeric>quantity</DataTable.Title>
        </DataTable.Header>

        <FlatList
          keyExtractor={ingredients => ingredients.id}
          data={ingredients}
          renderItem={({item}) => 
            (
              <DataTable.Row>
                <DataTable.Cell>
                  <Caption style={styles.ingredientsTableRow}>
                    {item.name}
                  </Caption>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Caption style={styles.ingredientsTableRow}>{item.quantity}</Caption>
                </DataTable.Cell>
              </DataTable.Row>
            )
          }
        />
    
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
    marginBottom: 12
  },

  ingredientsTableRow: {
    color: '#aaaaaa',
    fontStyle: 'italic'
  }
  
});

export {ShowIngredients}