import "react-native-gesture-handler";
import React, { useCallback, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  TextInput,
  Button,
  Text,
  Title,
  Checkbox,
  Caption,
} from "react-native-paper";
import { IRecipes } from "../../models/Recipe";
import { RecipeService } from "../../services/RecipeService";
import { RouteProp, useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import { Errors } from "../../models/Errors";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeActions  } from '../../actions/RecipeAction';
import RootState from '../../models/RootState';
type RouteStackProp = RouteProp<any, any>;

type Props = {
  route: RouteStackProp;
};

const EditRecipe: React.FC<Props> = ({ route }) => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imagePath, setImagePath] = React.useState<string>("");
  const [portions, setPortions] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("brazilian");
  const [mealCategory, setMealCategory] = React.useState<string>("lunch");
  const [errors, setErrors] = React.useState<Errors>({} as Errors);
  const [mealCategories, setMealCategories] = React.useState<string[]>([
    "lunch",
    "breakfast",
    "dinner",
    "dessert",
  ]);
  const [categories, setCategories] = React.useState<string[]>([
    "vegan",
    "japanese",
    "brazilian",
    "arabian",
    "diet",
  ]);

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const recipe = useSelector((state:RootState) => state.recipeReducer);

  useEffect(() => {
    const recipeService = new RecipeService
    if (route.params?.recipeId) {

      recipeService.show(route.params?.recipeId).then((response) => {
        
        const recipe = response.data as IRecipes
        dispatch(createRecipeActions)
        console.log(recipe);
        setTitle(recipe.title);
        setDescription(recipe.description);
        setImagePath(recipe.imagePath);
        setCategory(recipe.category);
        setMealCategory(recipe.mealCategory);
        setPortions((recipe.portions as unknown) as string);
      })
    }
  }, []);

  const addRecipe = useCallback(() => {
    const recipeService = new RecipeService();

    const recipeUpdated: IRecipes = {
      id: recipe.id,
      title: title,
      description: description,
      imagePath: imagePath,
      portions: Number.parseInt(portions),
      category: category,
      favorite: false,
      timeToPrepare: 0,
      mealCategory: mealCategory,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    } 

    recipeService.put(recipe.id, recipeUpdated).then((data) => {
      console.log(data);
    })
  }, []);

  // const removeRecipe = useCallback(
  //   (id: string) => {
  //     const service = new RecipeService();
  //     service.remove(id).then((response) => {
  //       return response;
  //     });
  //   },
  //   [
  //     id,
  //     buttonLabel,
  //     title,
  //     description,
  //     imagePath,
  //     portions,
  //     category,
  //     mealCategory,
  //   ]
  // );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.pageTitle}>Edit recipe</Title>

      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInput}
          label="Recipe name"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setTitle(value)}
          value={title}
        />
        {errors.title && <Text style={styles.erroText}>{errors.title}</Text>}

        <TextInput
          style={styles.textInput}
          label="Description"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setDescription(value)}
          value={description}
        />
        {errors.description && (
          <Text style={styles.erroText}>{errors.description}</Text>
        )}

        <TextInput
          style={styles.textInput}
          label="Image url"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setImagePath(value)}
          value={imagePath}
        />
        {errors.imagePath && (
          <Text style={styles.erroText}>{errors.imagePath}</Text>
        )}

        <TextInput
          style={styles.textInput}
          label="Portions"
          placeholder="4"
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(value) => setPortions(value)}
          value={portions}
        />
        {errors.portions && (
          <Text style={styles.erroText}>{errors.portions}</Text>
        )}

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="brazilian" value="brazilian" />
            <Picker.Item label="vegan" value="vegan" />
            <Picker.Item label="vegetarian" value="vegetarian" />
            <Picker.Item label="arabian" value="arabian" />
            <Picker.Item label="japanese" value="japanese" />
            <Picker.Item label="diet" value="diet" />
            <Picker.Item label="low carb" value="low carb" />
            <Picker.Item label="low fat" value="low fat" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>

        <View style={{ width: "40%", marginTop: 8 }}>
          <FlatList
            keyExtractor={(meal) => meal}
            data={mealCategories}
            renderItem={({ item: meal }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Caption>{meal}</Caption>
                <Checkbox
                  status={mealCategory === meal ? "checked" : "unchecked"}
                  onPress={() => {
                    setMealCategory(meal);
                  }}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.navigate("Recipes");
            }}
            style={styles.buttonBack}
            mode="contained"
            compact={false}
          >
            <Text style={styles.buttonTextStyle}>Cancel</Text>
          </Button>

          <Button
            onPress={() => {
                const schema = yup.object().shape({
                  title: yup.string().min(5).required("field required"),
                  description: yup.string().required("field required"),
                  imagePath: yup.string().url().required("field required"),
                  portions: yup.number().required("field required"),
                  category: yup.string().required("field required"),
                  mealCategory: yup.string().required("field required"),
                });

                schema
                  .validate(
                    {
                      title,
                      description,
                      imagePath,
                      portions,
                      category,
                      mealCategory,
                    },
                    {
                      abortEarly: false,
                    }
                  )
                  .then(() => {
                    addRecipe();
                  })
                  .catch((e) => {
                    if (e instanceof yup.ValidationError) {
                      const errors = getValidationErrors(e);
                      setErrors(errors);
                    }
                  });

                navigation.navigate("EditIngredient");
            }}
            style={styles.buttonNext}
            mode="contained"
            compact={false}
          >
            <Text style={styles.buttonTextStyle}>Confirm</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  viewStyle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  pickerContainer: {
    width: "80%",
    marginTop: 8,
  },

  pickerStyle: {
    padding: 12,
  },

  textInput: {
    width: "80%",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 56,
  },

  buttonNext: {
    width: "45%",
    marginTop: 12,
  },

  buttonBack: {
    width: "45%",
    marginTop: 12,
  },

  buttonTextStyle: {
    color: "#fff",
  },

  pageTitle: {
    color: "#2CAC60",
    marginTop: 18,
    fontSize: 18,
    fontWeight: "bold",
  },

  erroText: {
    color: "#db2e2e",
    textAlign: "center",
    width: "80%",
  },
});

export default EditRecipe;
