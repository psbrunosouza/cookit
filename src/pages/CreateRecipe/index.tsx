import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { v4 } from 'uuid';
import { Formik } from 'formik';
import { RecipeService } from '../../services/RecipeService'
import { Step } from '../../models/Step'


import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import {
  TextInput,
  Button,
  IconButton,
  Text,
  List,
  Title
} from 'react-native-paper'

import { CreateIngredient } from '../CreateIngredient';
import { RecipesProps } from '../../models/Recipe';
import { CreateSteps } from '../CreateSteps';

interface IngredientData {
  id: string;
  name: string;
  quantity: number;
}

const CreateRecipe: React.FC = () => {

  const [ingredients, setIngredients] = React.useState<IngredientData[]>([]);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const addSteps= useCallback((description: string) => {
    const step= {
      id: v4(),
      description
    }

    setSteps([...steps, step]);
    console.log(steps);
  }, [steps]);

  const removeStep = useCallback((id: string) => {
    console.log(id);

    const filteredSteps = steps.filter((step) => {
      return step.id !== id
    });

    console.log(filteredSteps);

    setSteps([...filteredSteps]);

  }, [steps]);

  const  createRecipe  = async ({ title, description, imagePath }: any )  =>  {
    const recipeService = new RecipeService()
    const newIngredient:RecipesProps = {
      id: v4(),
      title,
      description,
      imagePath,
      ingredients: ingredients,
      steps: steps
    }
    await recipeService.create(newIngredient)
  }

  const addIngredient = useCallback((name: string, quantity: number) => {
    const ingredient = {
      id: v4(),
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
      <Title style={styles.pageTitle}>Add new recipe</Title>
      <Formik initialValues={{ title: '', description: '', imagePath: '' }} onSubmit={value => createRecipe(value)} >
        {
          ({ handleSubmit, values, handleBlur, handleChange }) => (
            <View style={styles.viewStyle}>
              <TextInput style={styles.input}
                label="Name"
                placeholder="Recipe name"
                keyboardType='default'
                mode="outlined"
                onChangeText={handleChange('title')}
                value={values.title}
              />

              <TextInput style={styles.input}
                label="Description"
                placeholder="Two tomatoes, 1 cup of soup, 3 bowls of sugar"
                keyboardType="default"
                mode="outlined"
                onChangeText={handleChange('description')}
                value={values.description}
              />

              <TextInput style={styles.input}
                label="imagePath"
                placeholder="www.unsplash/image"
                keyboardType="default"
                mode="outlined"
                onChangeText={handleChange('imagePath')}
                value={values.imagePath}
              />

              <FlatList
                keyExtractor={(ingredient => ingredient.id)}
                data={ingredients}
                renderItem={({ item: ingredient }) => (
                  <List.Item

                    title={ingredient.name}
                    description={`Quantidade: ${ingredient.quantity}`}
                    left={props => <List.Icon {...props} icon="file" />}
                    right={props => (
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
                )}
              />

              <CreateIngredient addIngredient={addIngredient} />

              <FlatList style={{width:'80%'}}
                keyExtractor={(step => step.id)}
                data={steps}
                renderItem={({ item: step }) => (
                  <List.Item

                    title={`Passo:1`}
                    description={`#${step.description}`}
                    right={props => (
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
                          onPress={() => removeStep(step.id)}
                        />
                      </>
                    )}
                  />
                )}
              />

              <CreateSteps addSteps={addSteps}/>


              <Button onPress={handleSubmit} style={styles.buttonStyle} mode="contained" compact={false}>
                <Text style={styles.buttonTextStyle}>Register</Text>
              </Button>
            </View>
          )
        }
      </Formik>
    </ScrollView>

  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    justifyContent: 'center',

  },

  viewStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },

  input: {
    marginTop: '5%',
    width: '80%',
  },

  ingredientContainer: {
    marginTop: 5,
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