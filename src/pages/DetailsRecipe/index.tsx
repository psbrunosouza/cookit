import React, { useState, useEffect } from "react";
import { Title, Caption, Surface, IconButton, Card, Paragraph, Divider} from "react-native-paper";
import { View, ScrollView, StyleSheet, Image, FlatList} from "react-native";
import { ShowIngredients } from "../ShowIngredients";
import { RouteProp } from "@react-navigation/native";
import { Ingredient } from "../../models/Ingredient";
import {Step} from "../../models/Step";
import { RecipesProps } from "../../models/Recipe";

type Props = {
    route: RouteProp<any, any>
};

const DetailsRecipe:React.FC<Props> = ({route}) => {
    
    const[counter, setCounter] = useState(1);
    const[ingredients, setIngredients] = useState<Ingredient[]>([]);
    const[recipes, setRecipes] = useState<RecipesProps>({} as RecipesProps);
    const[steps, setSteps] = useState<Step[]>([]);

    useEffect(() => {
        setIngredients(route.params?.recipe.ingredients)
        setRecipes(route.params?.recipe)
        setSteps(route.params?.recipe.steps)
    }, [ingredients, steps])


    return (
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        
            <View style={styles.imgContainer}>
                <Image style={styles.imgStyle} source={{uri:recipes.imagePath}}></Image>
            </View>
                    
            <Title style={styles.titleStyle}>{recipes.title}</Title>  

            <Caption style={styles.CaptionWidth}>
                {recipes.description}
            </Caption>

            <View style={styles.buttonStyle}>
                <Surface style={styles.surface}>
                    <IconButton color='#4889eb' icon="square-edit-outline"></IconButton>
                </Surface>

                <Surface style={styles.surface}>
                    <IconButton onPress={() => console.log('Deletar')}  color='#f71c1c' icon="delete"></IconButton>
                </Surface>
            </View>

            <View>
                <ShowIngredients ingredients={ingredients}/>
            </View>
            <Caption style={styles.CaptionWidth}> Step by step </Caption>
            <Card style={styles.card}>
            <FlatList 
            keyExtractor={step =>step.id} 
            data={steps} 
            renderItem={({item:step})=>(
                <>
                <Card.Content>
                {/*<Title>{`Passo #${counter}`}</Title>*/}
                    <Caption>{`# ${step.description}`}</Caption>
                </Card.Content>
                <Divider/>

                </>
                
                )}       
            />
            </Card>
      
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    card: {
        width: 280,
        marginBottom: 12,
        padding:6
      },

    container: {
      alignItems: 'center'
    },

    scrollContainer: {
        width: '100%',
        alignItems: 'center',
    },

    imgStyle: {
        width: '100%',
        height: '100%',
    },

    imgContainer: {
        width: '100%',
        height: 260,
    },

    CaptionWidth: {
        width: 240,
        textAlign: 'center'
    },

    titleStyle: { 
        marginTop: 10
    },

    surface: {
        padding: 8,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 15,
        marginBottom: 7
      },

      buttonStyle: {
        flexDirection: 'row'
      }
})

export default DetailsRecipe;