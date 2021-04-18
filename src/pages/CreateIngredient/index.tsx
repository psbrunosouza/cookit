import React from 'react';

// STRUCTURE
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper'

interface IngredientProps {
  addIngredient(name: string, quantity: number): void; 
}

const CreateIngredient: React.FC<IngredientProps> = ({addIngredient}) => {
  
  const [ingredientName, setIngredientName] = React.useState("");
  const [ingredientQuantity, setingredientQuantity] = React.useState(0);

  return (
    <View style={styles.ingredientContainer}>
        <TextInput 
          style={styles.ingredientInput}
          label="Ingredient"
          placeholder="Time to prepare"
          keyboardType="default"
          mode="outlined"
          onChangeText={setIngredientName}
        />

        <TextInput 
          style={styles.quantityInput}
          label="Quantity"
          keyboardType="default"
          placeholder="ex: 1"
          mode="outlined"
          onChangeText={value => setingredientQuantity(Number.parseInt(value))}
        />

        <IconButton 
          onPress={() => addIngredient(
            ingredientName, 
            ingredientQuantity
          )} 
          style={styles.buttonInput} 
          icon="plus-circle" size={30} 
          color="#2CAC60" />
      </View>
  )
};

const styles = StyleSheet.create({
  ingredientContainer: {
    marginTop: "5%",
    flexDirection: 'row',
    width: '80%',
    alignItems: "center"
  },
  
  buttonInput: {
    width: '18%',
    marginLeft: '2%',
  },

  ingredientInput: {
    width: '40%'
  },

  quantityInput: {
    width: '38%',
    marginLeft: '2%'
  },
});

export {CreateIngredient}