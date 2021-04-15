import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, IconButton, Text } from 'react-native-paper'
import mockDb from '../../db/database.json';
import Icon from 'react-native-vector-icons/AntDesign'
import { white } from 'react-native-paper/lib/typescript/styles/colors';

const CreateRecipe: React.FC = () => {
  return (
    <View style={styles.container}>
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

      <View style={styles.ingredientContainer}>
        <TextInput style={styles.ingredientInput}
          label="Ingredient"
          placeholder="Time to prepare"
          keyboardType="default"
          mode="outlined"
        />
        <TextInput style={styles.quantityInput}
          label="Quantity"
          keyboardType="default"
          placeholder="ex: 1"
          mode="outlined"
        />

        <IconButton style={styles.buttonInput} icon="plus-circle" size={30} color="#2CAC60" />
      </View>


      <View style={styles.ingredientContainer}>
        <TextInput style={styles.stepsInput}
          label="Steps"
          placeholder="Insert the steps"
          keyboardType="default"
          mode="outlined"
        />
        <IconButton style={styles.buttonInput} icon="plus-circle" size={30} color="#2CAC60" />
      </View>

      <Button style={styles.buttonStyle} mode="contained" compact={false}>
        <Text style={styles.buttonTextStyle}>Register</Text>
       </Button>
    </View>

    

  )
}

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
    color: "white"
  }
  
})

export default CreateRecipe;