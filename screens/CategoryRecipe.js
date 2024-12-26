import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import axios from 'axios';

const CategoryRecipes = ({ route, navigation }) => {
  const { categoryName, categories } = route.params;
  const { user, logout } = useContext(AuthContext); // Truy cập thông tin người dùng và hàm logout
  const ipconfig = '192.168.2.162'; // Đổi IP nếu cần
  const [recipes, setRecipes] = useState([]);

  // Gọi API để lấy danh sách recipes theo category
  useEffect(() => {
    axios.get(`http://${ipconfig}:5000/recipes/getcategory?name=${categoryName}`)
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, [categoryName]);

  // Render từng recipe
  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeItem} 
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item._id })}
    >
      <Image source={{ uri: item.image_url }} style={styles.recipeImage} />
      <Text style={styles.recipeName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryName}</Text>
      <FlatList
        data={categories}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    marginTop:20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  list: {
    paddingBottom: 10,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    flex: 1,
  },
});

export default CategoryRecipes;
