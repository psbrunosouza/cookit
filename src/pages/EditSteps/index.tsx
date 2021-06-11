// CORE
import React, { useCallback, useEffect } from "react";
// COMPONENTS
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Checkbox,
  Caption,
  Title,
  Button,
  Text,
  Card,
  Paragraph,
  Divider,
  IconButton,
} from "react-native-paper";
import { v4 } from "uuid";
// MODELS
import { IStep } from "../../models/Step";
import { IRecipes } from "../../models/Recipe";

// NAVIGATION
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import { StepService } from "../../services/StepService";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../models/RootState";
import { Steps } from "../../models/steps";
import {
  stepAddAction,
  stepClearAction,
  stepCreateListAction,
  stepRemoveAction,
} from "../../actions/stepAction";
import { RecipeService } from "../../services/RecipeService";
import { createRecipeActions } from "../../actions/RecipeAction";

type Props = {
  route: RouteProp<any, any>;
};

const EditSteps: React.FC<Props> = ({ route }) => {
  const [id, setId] = React.useState<string | number>("");
  const [description, setDescription] = React.useState<string>("");
  const [method, setMethod] = React.useState<string>("bake");
  const [temperature, setTemperature] = React.useState<string>("low");
  const [timeToPrepare, setTimeToPrepare] = React.useState<string>("");
  const [temperatures, setTemperatures] = React.useState<string[]>([
    "none",
    "low",
    "medium",
    "high",
  ]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stepService = new StepService();

  const recipe = useSelector(
    (state: RootState) => state.recipeReducer
  ) as IRecipes;

  const steps = useSelector((state: RootState) => state.stepReducer) as IStep[];

  useEffect(() => {
    stepService.index().then((response) => {
      const steps = response.data as Steps[];

      const stepByRecipes = steps.filter((step) => {
        return step.recipeId === recipe.id;
      });


      stepByRecipes.forEach((step) => {
        setId(step.id);
        dispatch(stepCreateListAction(step.steps));
      });

    });

  }, [id]);

  const addStep = useCallback(() => {
    const step: IStep = {
      id: v4(),
      step: 1,
      description: description,
      timeToPrepare: Number.parseInt(timeToPrepare),
      method: method,
      temperature: temperature,
    };

    dispatch(stepAddAction(step));
    setDescription("");
    setTimeToPrepare("");
    setMethod("");
    setTemperature("none");

  }, [id, steps, description, method, temperature, temperatures]);

  const deleteStep = useCallback((id: string) => {
    dispatch(stepRemoveAction(id))
  }, [id, steps, description, method, temperature, temperatures]);

  const createNewSteps = useCallback(() => {
    const stepService = new StepService();


    stepService
      .update(id, {
        id,
        steps,
        recipeId: recipe.id,
      } as Steps)
      .then((response) => {
        const recipeService = new RecipeService();
        const step = response.data as Steps;

        const recipeUpdated = {
          id: recipe.id,
          description: recipe.description,
          category: recipe.category,
          favorite: recipe.favorite,
          imagePath: recipe.imagePath,
          mealCategory: recipe.mealCategory,
          portions: recipe.portions,
          timeToPrepare: recipe.timeToPrepare,
          title: recipe.title,
          steps: steps,
          ingredients: recipe.ingredients,
        } as IRecipes

        dispatch(createRecipeActions(recipeUpdated))

        recipeService.put(step.recipeId, recipeUpdated);
      });
  }, [id, steps, description, method, temperature, temperatures]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.pageTitle}>Add new recipe</Title>

      {steps?.length !== 0 && (
        <Card style={styles.card}>
          <FlatList
            keyExtractor={(step) => step.id}
            data={steps}
            renderItem={({ item: step }) => (
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
                  >{`Step: ${step.step}`}</Paragraph>

                  <Paragraph
                    style={{ fontSize: 16, fontWeight: "bold" }}
                  >{`Time: ${step.timeToPrepare}-min`}</Paragraph>
                </View>
                <Paragraph>{`Method: ${step.method}`}</Paragraph>
                <Paragraph>{step.description}</Paragraph>
                <IconButton
                  style={styles.deleteButtom}
                  icon="delete"
                  color={"#da454d"}
                  size={20}
                  onPress={() => deleteStep(step.id)}
                />
              </Card.Content>
            )}
          />
        </Card>
      )}

      {/* <TextInput
        style={styles.textInput}
        label="step"
        keyboardType="number-pad"
        placeholder="77"
        mode="outlined"
        onChangeText={(value) => setStep(value)}
        value={step}
      /> */}

      <TextInput
        style={styles.textInput}
        label="description"
        keyboardType="default"
        placeholder="cut the apples"
        mode="outlined"
        onChangeText={(value) => setDescription(value)}
        value={description}
      />

      <TextInput
        style={styles.textInput}
        label="time to prepare"
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={(value) => setTimeToPrepare(value)}
        value={timeToPrepare}
      />

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={method}
          onValueChange={(itemValue) => setMethod(itemValue)}
        >
          <Picker.Item label="bake" value="bake" />
          <Picker.Item label="fridge" value="fridge" />
          <Picker.Item label="fry" value="fry" />
          <Picker.Item label="cut" value="cut" />
          <Picker.Item label="cook" value="cook" />
          <Picker.Item label="boil" value="boil" />
          <Picker.Item label="other" value="other" />
        </Picker>
      </View>

      <View style={{ width: "40%", marginTop: 8 }}>
        <FlatList
          keyExtractor={(temp) => temp}
          data={temperatures}
          renderItem={({ item: temp }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Caption>{temp}</Caption>
              <Checkbox
                status={temperature === temp ? "checked" : "unchecked"}
                onPress={() => {
                  setTemperature(temp);
                }}
              />
            </View>
          )}
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
          style={styles.buttonStyle}
          onPress={() => addStep()}
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
            createNewSteps();
            navigation.navigate("Recipes");
          }}
          style={styles.buttonStyle}
          mode="contained"
          compact={false}
        >
          <Text style={styles.buttonTextStyle}>Next</Text>
        </Button>
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

  textInput: {
    width: "80%",
  },

  buttonInput: {
    width: "18%",
    marginLeft: "2%",
  },

  stepInput: {
    width: "80%",
  },

  deleteButtom: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  card: {
    width: "80%",
    padding: 12,
    marginBottom: 12,
    marginTop: 12,
  },

  buttonTextStyle: {
    color: "#fff",
  },

  pickerContainer: {
    width: "80%",
    marginTop: 8,
  },

  pickerStyle: {
    padding: 12,
  },

  pageTitle: {
    color: "#2CAC60",
    marginTop: 18,
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonStyle: {
    width: "100%",
    marginTop: 12,
  },
});

export { EditSteps };
