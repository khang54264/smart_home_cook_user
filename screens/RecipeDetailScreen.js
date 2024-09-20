import React from 'react';
import { View, Text } from 'react-native';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View>
      <Text>{recipe.name}</Text>
      <Text>{recipe.kcal_quantity} kcal</Text>
      <Text>Protein: {recipe.protein}g</Text>
      <Text>Fat: {recipe.fat}g</Text>
      <Text>Carbs: {recipe.carbs}g</Text>
      <Text>Ingredients: {recipe.ingredients.join(', ')}</Text>
    </View>
  );
};

export default RecipeDetailScreen;
