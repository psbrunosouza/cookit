import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/core";
import { v4 } from "uuid";
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
import { IIngredient } from "../../models/Ingredient";
import { IStep } from "../../models/Step";
import { RecipeService } from "../../services/RecipeService";

const CreateRecipe: React.FC = () => {
  const [id, setId] = React.useState<string>("");
  const [buttonLabel, setButtonLabel] = React.useState<string>("next");
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imagePath, setImagePath] = React.useState<string>("");
  const [portions, setPortions] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("brazilian");
  const [mealCategory, setMealCategory] = React.useState<string>("lunch");
  const [mealCategories, setMealCategories] = React.useState<string[]>([
    "lunch",
    "breakfast",
    "dinner",
    "dessert",
  ]);

  const navigation = useNavigation();

  const addRecipe = useCallback(() => {
    const service = new RecipeService();
    const id = v4();
    const ingredients: IIngredient[] = [];
    const steps: IStep[] = [];

    const item: IRecipes = {
      id,
      title: title,
      description: description,
      imagePath: imagePath,
      portions: parseInt(portions),
      category: category,
      favorite: false,
      timeToPrepare: 0,
      mealCategory: mealCategory,
      ingredients,
      steps,
    };
    setId(id);
    setButtonLabel("confirm");
    service.create("@recipe", item).then((response) => {
      return response;
    });
  }, [
    id,
    buttonLabel,
    title,
    description,
    imagePath,
    portions,
    category,
    mealCategory,
  ]);

  const removeRecipe = useCallback(
    (id: string) => {
      const service = new RecipeService();
      service.remove(id).then((response) => {
        return response;
      });
    },
    [
      id,
      buttonLabel,
      title,
      description,
      imagePath,
      portions,
      category,
      mealCategory,
    ]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.pageTitle}>Add new recipe</Title>

      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInput}
          label="Name"
          placeholder="Recipe name"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setTitle(value)}
          value={title}
        />

        <TextInput
          style={styles.textInput}
          label="Description"
          placeholder="Two tomatoes, 1 cup of soup, 3 bowls of sugar"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setDescription(value)}
          value={description}
        />

        <TextInput
          style={styles.textInput}
          label="imagePath"
          placeholder="www.unsplash/image"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setImagePath(value)}
          value={imagePath}
        />

        <TextInput
          style={styles.textInput}
          label="portions"
          placeholder="4"
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(value) => setPortions(value)}
          value={portions}
        />

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
              if (buttonLabel === "confirm") {
                setButtonLabel("next");
              }
              removeRecipe("@recipe");
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
              if (buttonLabel === "next") {
                addRecipe();
              }

              if (buttonLabel === "confirm") {
                navigation.navigate("addIngredient", { id: id });
                setButtonLabel("next");
              }
            }}
            style={styles.buttonNext}
            mode="contained"
            compact={false}
          >
            <Text style={styles.buttonTextStyle}>{buttonLabel}</Text>
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
});

export default CreateRecipe;