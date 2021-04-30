import React, { useCallback, useEffect } from "react";
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
} from "react-native-paper";
import { v4 } from "uuid";
import { IStep } from "../../models/Step";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import { StepService } from "../../services/StepService";
import { RecipeService } from "../../services/RecipeService";
import { IconButton } from "react-native-paper";
import getValidationErrors from "../../utils/getValidationErrors";
import { Errors } from "../../models/Errors";
import * as yup from "yup";

type Props = {
  route: RouteProp<any, any>;
};

const CreateSteps: React.FC<Props> = ({ route }) => {
  const [recipeId, setRecipeId] = React.useState<string>("");
  const [steps, setSteps] = React.useState<IStep[]>([]);
  const [step, setStep] = React.useState<string>("");
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
  const [errors, setErrors] = React.useState<Errors>({} as Errors);
  const navigation = useNavigation();

  useEffect(() => {
    setRecipeId(route.params?.id);
  }, [steps, recipeId, step, description, timeToPrepare, method, temperature]);

  const addStep = useCallback(() => {
    const item: IStep = {
      id: v4(),
      step: Number.parseInt(step),
      description: description,
      timeToPrepare: Number.parseInt(timeToPrepare),
      method: method,
      temperature: temperature,
      recipeId: recipeId,
    };

    const schema = yup.object().shape({
      description: yup.string().min(5).required("field required"),
      step: yup.number().required("field required"),
      timeToPrepare: yup.number().required("field required"),
    });

    schema
      .validate(
        {
          step,
          description,
          timeToPrepare,
        },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        setSteps([...steps, item]);
        setStep("");
        setDescription("");
        setTimeToPrepare("");
        setMethod("");
        setTemperature("none");
      })
      .catch((e) => {
        if (e instanceof yup.ValidationError) {
          const errors = getValidationErrors(e);
          setErrors(errors);
        }
      });
  }, [
    steps,
    errors,
    recipeId,
    step,
    description,
    timeToPrepare,
    method,
    temperature,
  ]);

  const createNewSteps = useCallback(() => {
    const service = new StepService();
    const recipeService = new RecipeService();

    service.create("@recipe", steps);
    recipeService.replace("@recipe", recipeId).then();
    setStep("");
    setDescription("");
    setTimeToPrepare("");
    setMethod("");
    setTemperature("none");
  }, [steps, recipeId, step, description, timeToPrepare, method, temperature]);

  const deleteStep = useCallback(
    (id: string) => {
      const stepsUpdated = steps.filter((step) => {
        return step.id !== id;
      });
      setSteps(stepsUpdated);
    },
    [steps]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.pageTitle}>Create steps</Title>

      {steps.length !== 0 && (
        <FlatList
          keyExtractor={(step) => step.id}
          data={steps}
          style={styles.cardList}
          renderItem={({ item: step }) => (
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
            </Card>
          )}
        />
      )}

      <TextInput
        style={styles.textInput}
        label="step number"
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={(value) => setStep(value)}
        value={step}
      />
      {errors.step && <Text style={styles.erroText}>{errors.step}</Text>}

      <TextInput
        style={styles.textInput}
        label="description"
        keyboardType="default"
        mode="outlined"
        onChangeText={(value) => setDescription(value)}
        value={description}
      />
      {errors.description && <Text style={styles.erroText}>{errors.description}</Text>}

      <TextInput
        style={styles.textInput}
        label="time to prepare"
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={(value) => setTimeToPrepare(value)}
        value={timeToPrepare}
      />
      {errors.timeToPrepare && <Text style={styles.erroText}>{errors.timeToPrepare}</Text>}

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
          style={styles.buttonAdd}
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

  buttonAdd: {
    width: "100%",
    marginTop: 12,
    marginBottom: 56,
  },

  cardList: {
    width: "80%",
  },

  card: {
    width: "100%",
    marginBottom: 12,
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

export { CreateSteps };
