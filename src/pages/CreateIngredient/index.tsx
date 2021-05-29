// CORE
import React, { useEffect, useCallback } from "react";
// STRUCTURE
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
  IconButton,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import { v4 } from "uuid";
import { IIngredient } from "../../models/Ingredient";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { IngredientService } from "../../services/IngredientService";
import * as yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import { Errors } from "../../models/Errors";

type RouteStackProp = RouteProp<any, any>;

type Props = {
  route: RouteStackProp;
};

const CreateIngredient: React.FC<Props> = ({ route }) => {
  const [recipeId, setRecipeId] = React.useState("");
  const [ingredients, setIngredients] = React.useState<IIngredient[]>([]);
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [measurementUnit, setMeasurementUnit] = React.useState("g");
  const [withoutLactose, setWithoutLactose] = React.useState<boolean>(false);
  const [withoutGluten, setWithoutGluten] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Errors>({} as Errors);

  const navigation = useNavigation();

  useEffect(() => {
    setRecipeId(route.params?.id);
  }, [
    ingredients,
    recipeId,
    name,
    quantity,
    withoutLactose,
    measurementUnit,
    withoutGluten,
  ]);

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

    const schema = yup.object().shape({
      name: yup.string().min(2).required("field required"),
      quantity: yup.number().required("field required"),
    });

    schema
      .validate(
        {
          name,
          quantity,
        },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        setIngredients([...ingredients, item]);
        setName("");
        setQuantity("");
        setMeasurementUnit("g");
        setWithoutGluten(false);
        setWithoutLactose(false);
      })
      .catch((e) => {
        if (e instanceof yup.ValidationError) {
          const errors = getValidationErrors(e);
          setErrors(errors);
        }
      });
  }, [
    ingredients,
    recipeId,
    name,
    quantity,
    withoutLactose,
    measurementUnit,
    withoutGluten,
  ]);

  const createNewIngredients = useCallback(() => {
    const service = new IngredientService();

    service.create("@recipe", ingredients).then((response) => {
      return response;
    });

    setName("");
    setQuantity("");
    setMeasurementUnit("g");
    setWithoutGluten(false);
    setWithoutLactose(false);
  }, [
    ingredients,
    name,
    quantity,
    withoutLactose,
    measurementUnit,
    withoutGluten,
    errors,
  ]);

  const deleteIngredient = useCallback(
    (id: string) => {
      const ingredientsUpdated = ingredients.filter((ingredient) => {
        return ingredient.id !== id;
      });
      setIngredients(ingredientsUpdated);
    },
    [ingredients]
  );

  return (
    <ScrollView contentContainerStyle={styles.ingredientContainer}>
      <View style={styles.formView}>
        <Title style={styles.pageTitle}>Create Ingredient</Title>

        {ingredients.length !== 0 && (
          <FlatList
            style={styles.cardList}
            keyExtractor={(ingredient: { id: string }) => ingredient.id}
            data={ingredients}
            renderItem={({ item: ingredient }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Paragraph
                      style={{
                        color: "#2a7ecc",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {ingredient.name}
                    </Paragraph>
                    <Paragraph
                      style={{ fontSize: 16, fontWeight: "bold" }}
                    >{`Quantity: ${ingredient.quantity}${ingredient.unitMeasurement}`}</Paragraph>
                  </View>
                  <Paragraph>
                    {ingredient.withoutLactose
                      ? "contain lactose"
                      : "without lactose"}
                  </Paragraph>
                  <Paragraph>
                    {ingredient.withoutGluten
                      ? "contain gluten"
                      : "without gluten"}
                  </Paragraph>

                  <IconButton
                    style={styles.deleteButtom}
                    icon="delete"
                    color={"#da454d"}
                    size={20}
                    onPress={() => deleteIngredient(ingredient.id)}
                  />
                </Card.Content>
              </Card>
            )}
          />
        )}

        <TextInput
          style={styles.textInput}
          label="name"
          keyboardType="default"
          mode="outlined"
          onChangeText={(value) => setName(value)}
          value={name}
        />
        {errors.name && <Text style={styles.erroText}>{errors.name}</Text>}

        <TextInput
          style={styles.textQuantityInput}
          label="quantity"
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(value) => setQuantity(value)}
          value={quantity}
        />
        {errors.quantity && (
          <Text style={styles.erroText}>{errors.quantity}</Text>
        )}

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={measurementUnit}
            onValueChange={(itemValue) => setMeasurementUnit(itemValue)}
          >
            <Picker.Item label="g" value="g" />
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="ml" value="ml" />
            <Picker.Item label="L" value="L" />
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
            style={styles.buttonAdd}
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
              navigation.navigate("CreateSteps", { id: recipeId });             
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

  cardList: {
    width: "80%",
  },

  card: {
    width: "100%",
    marginBottom: 12,
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
    marginBottom: 56,
  },

  buttonAdd: {
    width: "100%",
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

  deleteButtom: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  erroText: {
    color: "#db2e2e",
    textAlign: "center",
    width: "80%",
  },
});

export { CreateIngredient };
