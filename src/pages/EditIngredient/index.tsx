import React, { useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import {
  TextInput,
  Title,
  Button,
  Switch,
  Caption,
  Card,
  Paragraph,
  Divider,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import { v4 } from "uuid";
import { IIngredient } from "../../models/Ingredient";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { IngredientService } from "../../services/IngredientService";
import { IRecipes } from "../../models/Recipe";

type RouteStackProp = RouteProp<any, any>;

type Props = {
  route: RouteStackProp;
};

const EditIngredient: React.FC<Props> = ({ route }) => {
  const [recipeId, setRecipeId] = React.useState("");
  const [recipe, setRecipe] = React.useState<IRecipes>({} as IRecipes);
  const [ingredients, setIngredients] = React.useState<IIngredient[]>([]);
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [measurementUnit, setMeasurementUnit] = React.useState("g");
  const [withoutLactose, setWithoutLactose] = React.useState<boolean>(false);
  const [withoutGluten, setWithoutGluten] = React.useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    setRecipe(route.params?.recipe);
    setRecipeId(recipe.id);
    setIngredients(recipe.ingredients);
    console.log(recipeId);
  }, [recipe, recipeId]);

  const addIngredient = useCallback(() => {
    const item: IIngredient = {
      id: v4(),
      name: name,
      quantity: parseInt(quantity),
      unitMeasurement: measurementUnit,
      withoutLactose: withoutLactose,
      withoutGluten: withoutGluten,
      recipeId: recipeId,
    };

    setIngredients([...ingredients, item]);
  }, [
    ingredients,
    name,
    quantity,
    measurementUnit,
    withoutLactose,
    withoutGluten,
  ]);

  const createNewIngredients = useCallback(() => {
    const service = new IngredientService();
    service.update(recipe.id, ingredients).then((response) => {
      return response;
    });
  }, [ingredients]);

  return (
    <ScrollView contentContainerStyle={styles.ingredientContainer}>
      <View style={styles.formView}>
        <Title style={styles.pageTitle}>Create Ingredient</Title>

        {ingredients?.length !== 0 && (
          <Card style={styles.card}>
            <FlatList
              keyExtractor={(ingredient) => ingredient.id}
              data={ingredients}
              renderItem={({ item: ingredient }) => (
                <>
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Paragraph>{ingredient.name}</Paragraph>
                      <Paragraph>{`Quantity: ${ingredient.quantity}${ingredient.unitMeasurement}`}</Paragraph>
                    </View>
                    <Paragraph>
                      {ingredient.withoutLactose
                        ? "com lactose"
                        : "sem lactose"}
                    </Paragraph>
                    <Paragraph>
                      {ingredient.withoutGluten ? "com gluten" : "sem gluten"}
                    </Paragraph>
                  </Card.Content>
                  <Divider />
                </>
              )}
            />
          </Card>
        )}

        <TextInput
          style={styles.textInput}
          label="name"
          placeholder="name"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setName(value)}
          value={name}
        />

        <TextInput
          style={styles.textQuantityInput}
          label="quantity"
          keyboardType="number-pad"
          placeholder="35"
          mode="outlined"
          onChangeText={(value) => setQuantity(value)}
          value={quantity}
        />

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={measurementUnit}
            onValueChange={(itemValue) => setMeasurementUnit(itemValue)}
          >
            <Picker.Item label="g" value="g" />
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="ml" value="ml" />
            <Picker.Item label="cup(s)" value="cup(s)" />
            <Picker.Item label="chunk(s)" value="chunk(s)" />
            <Picker.Item label="unit(s)" value="unit(s)" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>

        <View style={styles.toggleStyle}>
          <Caption>without Lactose</Caption>
          <Switch
            value={withoutLactose}
            onValueChange={() => setWithoutLactose(!withoutLactose)}
          />
        </View>

        <View style={styles.toggleStyle}>
          <Caption>without Gluten</Caption>
          <Switch
            value={withoutGluten}
            onValueChange={() => setWithoutGluten(!withoutGluten)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "80%",
          }}
        >
          <Button
            mode="contained"
            compact={false}
            style={styles.buttonNext}
            onPress={() => addIngredient()}
          >
            <Text style={styles.buttonTextStyle}>Add</Text>
          </Button>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "80%",
          }}
        >
          <Button
            onPress={() => {
              createNewIngredients();
              navigation.navigate("EditSteps", { recipe });
            }}
            style={styles.buttonNext}
            mode="contained"
            compact={false}
          >
            <Text style={styles.buttonTextStyle}>Next</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ingredientContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  formView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "80%",
    padding: 12,
    marginBottom: 12,
    marginTop: 12,
  },

  textInput: {
    width: "80%",
  },

  textQuantityInput: {
    width: "80%",
  },

  pickerContainer: {
    width: "80%",
    marginTop: 8,
  },

  pickerStyle: {
    padding: 12,
  },

  buttonStyle: {
    width: "80%",
    marginTop: 12,
  },

  buttonNext: {
    width: "100%",
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

  toggleStyle: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    padding: 12,
  },

  listMeasurementUnitsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
});

export { EditIngredient };
