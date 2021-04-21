import React, { useState, useEffect } from 'react';
import { Title, Caption, Surface, IconButton } from 'react-native-paper';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import {ShowIngredients} from '../ShowIngredients';
import { RouteProp } from '@react-navigation/native';
import {Ingredient} from '../../models/Ingredient';

type Props = {
    route: RouteProp<any, any>
};

const DetailsRecipe:React.FC<Props> = ({route}) => {
    
    const[ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        setIngredients(route.params?.recipe.Ingredients)
    }, [ingredients])

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        
            <View style={styles.imgContainer}>
                <Image style={styles.imgStyle} source={{uri:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=653&q=80'}}></Image>
            </View>
                    
            <Title style={styles.titleStyle}>Sandwich</Title>  

            <Caption style={styles.CaptionWidth}>
                Está é uma deliciosa pizza, feita com tudo o quê há de bom para que você encha o seu buchinho
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
      
        </ScrollView>
    );
}


const styles = StyleSheet.create({
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