import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { uuid } from 'uuidv4';

import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { 
  TextInput, 
  Button, 
  IconButton,
  Text,
  List,
} from 'react-native-paper'

import { CreateIngredient } from '../CreateIngredient';

interface IngredientData {
  id: string;
  name: string;
  quantity: number;
}

const CreateRecipe: React.FC = (props) => {
  
  const [ingredients, setIngredients] = React.useState<IngredientData[]>([]);

  const addIngredient = useCallback((name: string, quantity: number) => {
    const ingredient = {
      id: uuid(),
      name, 
      quantity
    }

    setIngredients([...ingredients, ingredient]);
  }, [ingredients]);

  const removeIngredient = useCallback((id: string) => {
    console.log(id);

    const filteredIngredients = ingredients.filter((ingredient) => {
      return ingredient.id !== id
    });

    console.log(filteredIngredients);

    setIngredients([...filteredIngredients]);
    
  }, [ingredients]);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Add new recipe</Text>
      <TextInput style={styles.input}
        label="Name"
        placeholder="Recipe name"
        keyboardType='default'
        mode="outlined"
      />

      <TextInput style={styles.input}
        label="Description"
        placeholder="Two tomatoes, 1 cup of soup, 3 bowls of sugar"
        keyboardType="default"
        mode="outlined"
      />
  
      <FlatList 
        keyExtractor={(ingredient => ingredient.id)} 
        data={ingredients} 
        renderItem={({ item: ingredient }) => (
          <List.Item
          
            title={ingredient.name}
            description={`Quantidade: ${ingredient.quantity}`}
            left={props => <List.Icon {...props} icon="file" />}
            right={props =>(
              <>
                <IconButton
                icon="square-edit-outline" 
                size={26} 
                color="#4889eb"
                />
                
                <IconButton 
                icon="delete" 
                size={26} 
                color="#f71c1c"
                onPress={() => removeIngredient(ingredient.id)}
                />
              </>
            )}
          />
          
          // <View>
          //   <Text>{ingredient.name} | {ingredient.quantity}</Text>
          // </View>
        )}
      />
   
      <CreateIngredient addIngredient={addIngredient}/>

      <View style={styles.ingredientContainer}>
        <TextInput style={styles.stepsInput}
          label="Steps"
          placeholder="Insert the steps"
          keyboardType="default"
          mode="outlined"
        />
        <IconButton 
          style={styles.buttonInput} 
          icon="plus-circle" 
          size={30} 
          color="#2CAC60" 
        />
      </View>

      <Button style={styles.buttonStyle} mode="contained" compact={false}>
        <Text style={styles.buttonTextStyle}>Register</Text>
       </Button>
    </ScrollView>

  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  input: {
    marginTop: "5%",
    width: '80%',
  },

  ingredientContainer: {
    marginTop: "5%",
    flexDirection: 'row',
    width: '80%',
    alignItems: "center"
  },

  ingredientInput: {
    width: '40%'
  },

  quantityInput: {
    width: '38%',
    marginLeft: '2%'
  },

  buttonInput: {
    width: '18%',
    marginLeft: '2%',
  },

  stepsInput: {
    width: '80%',
  },

  buttonStyle: {
    width: "80%",
    marginTop: "10%"
  },

  buttonTextStyle: { 
    color: "#fff"
  },

  pageTitle: {
    color: '#2CAC60',
    marginTop: 18,
    fontSize: 18,
    fontWeight: 'bold'

  },
  
})

export default CreateRecipe;