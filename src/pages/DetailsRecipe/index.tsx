import React, { useState, useEffect, useCallback } from "react";
import {
  Title,
  Caption,
  Surface,
  IconButton,
  Card,
  Divider,
} from "react-native-paper";
import { View, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import { ShowIngredients } from "../ShowIngredients";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RecipeService } from "../../services/RecipeService";
import { IRecipes } from "../../models/Recipe";

type Props = {
  route: RouteProp<any, any>;
};

const DetailsRecipe: React.FC<Props> = ({ route }) => {
  const [timeToPrepare, setTimeToPrepare] = useState<number>(0);
  const service = new RecipeService();
  const [recipe, setRecipe] = React.useState<IRecipes>({} as IRecipes)
 
  const navigation = useNavigation();
  useEffect(() => {
    

    service.show(route.params?.recipeId) .then((response) => {
      const recipe = response.data;
      setRecipe(recipe);
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imgStyle}
          source={{
            uri: recipe?.imagePath,
          }}
        ></Image>
      </View>

      <Title style={styles.titleStyle}>{recipe?.title}</Title>
      <Caption style={styles.CaptionWidth}>{recipe?.description}</Caption>
      <Caption style={styles.CaptionWidth}>{`Time to prepare: ${timeToPrepare}min`}</Caption>
      <View style={styles.buttonStyle}>
        <Surface style={styles.surface}>
          <IconButton
            onPress={() => {
              navigation.navigate("EditRecipe", {recipe});
            }}
            color="#4889eb"
            icon="square-edit-outline"
          ></IconButton>
        </Surface>

        <Surface style={styles.surface}>
          <IconButton
            onPress={() => {
              service.remove(recipe.id).then((recipeId) => { 

                navigation.navigate("Recipes", {recipeId: recipe.id});
              })
            }}
            color="#f71c1c"
            icon="delete"
          ></IconButton>
        </Surface>
      </View>

      <View>
        <ShowIngredients ingredients={recipe.ingredients} />
      </View>
      <Caption style={styles.CaptionWidth}> Step by step </Caption>
      <Card style={styles.card}>
        <FlatList
          keyExtractor={(step) => step.id}
          data={recipe.steps}
          renderItem={({ item: step }) => (
            <>
              <Card.Content>
                <Caption>{`${step.step} ${step.description}`}</Caption>
              </Card.Content>
              <Divider />
            </>
          )}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    marginBottom: 12,
    padding: 6,
  },

  container: {
    alignItems: "center",
  },

  scrollContainer: {
    width: "100%",
    alignItems: "center",
  },

  imgStyle: {
    width: "100%",
    height: "100%",
  },

  imgContainer: {
    width: "100%",
    height: 260,
  },

  CaptionWidth: {
    width: 240,
    textAlign: "center",
  },

  titleStyle: {
    marginTop: 10,
  },

  surface: {
    padding: 8,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 7,
  },

  buttonStyle: {
    flexDirection: "row",
  },
});

export default DetailsRecipe;