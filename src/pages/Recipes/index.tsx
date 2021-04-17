import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import mockDb from '../../db/database.json';

const Recipes: React.FC = () => {

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} >
      <Text style={styles.pageTitle}>Lista de receitas</Text>
        <FlatList keyExtractor={(Db => Db.id)} data={mockDb.Recipies} renderItem={({ item:recipe }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTitle}>
              <Text>{recipe.title}</Text>
              <Text style={styles.timeColor}>{recipe.time}</Text>
            </View>
            <Text>{recipe.description}</Text>
          </TouchableOpacity>
        )} />
      </ScrollView>
  )
}


const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    alignItems: "center"
  },

  pageTitle: {
    color: '#2CAC60',
    marginTop: 18,
    marginBottom: 18,
    fontSize: 18,
    fontWeight: 'bold'

  },

  timeColor: {
    backgroundColor: '#2CAC60',
    paddingTop: 3,
    paddingRight: 8,
    paddingBottom: 3,
    paddingLeft: 8,
    borderRadius: 24,
    color: 'white'
  },

  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  card: {
    padding: 24,
    width: 300,
    height: 160,
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#2CAC60',
    marginBottom: 24

  },
});


export default Recipes;