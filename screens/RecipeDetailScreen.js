import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon
import { AuthContext } from '../AuthContext'; // Import AuthContext

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const { user, logout } = useContext(AuthContext); // Truy cập thông tin người dùng và hàm logout
  const ipconfig = '192.168.2.162'; // Đổi IP nếu cần
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Gọi API để lấy thông tin chi tiết
  useEffect(() => {
    console.log(user.id);
    console.log(recipeId);
    axios
      .get(`http://${ipconfig}:5000/recipes/details/${recipeId}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });

    // Kiểm tra xem công thức có trong danh sách yêu thích của người dùng không
    axios
      .post(`http://${ipconfig}:5000/recipes/favorites/check?userId=${user.id}&recipeId=${recipeId}`)
      .then(response => {
        setIsFavorite(response.data.isFavorite); // Cập nhật trạng thái yêu thích
        console.log(response.data.isFavorite);
      })
      .catch(error => {
        console.error(error);
      });
  }, [recipeId, user._id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Thêm công thức vào danh sách yêu thích
  const handleAddFavorite = () => {
    console.log(user.id);
    console.log(recipeId);
    const newRepFavor = {
      u_id: user.id.trim(),
      r_id: recipeId.trim()
  };
    console.log(newRepFavor);

    axios.post(`http://${ipconfig}:5000/recipes/favorites/add`, newRepFavor)
      .then(() => {
        setIsFavorite(true);
        alert('Recipe added to favorites!');
      })
      .catch(error => {
        console.error(error);
        alert('Failed to add to favorites');
      });
  };

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load recipe details.</Text>
      </View>
    );
  }

  return (
    
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Quay về trang Home
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={{ uri: recipe.image_url }} style={styles.image} />
      <TouchableOpacity onPress={handleAddFavorite} style={styles.favoriteButton}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={30} color="red" />
        </TouchableOpacity>
      <Text style={styles.title}>{recipe.name}</Text>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Thời gian nấu:</Text>
        <Text style={styles.value}>{recipe.cook_time} phút</Text>
        
      </View>

      <Text style={styles.sectionHeader}>Nutrition</Text>
      {recipe.nutrition.map((nutri, index) => (
        <Text key={index} style={styles.nutritionItem}>
          {nutri.name} {nutri.amount} {nutri.unit}.
        </Text>
      ))}

      <Text style={styles.sectionHeader}>Danh sách nguyên liệu</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredientItem}>
          - {ingredient.name} {ingredient.amount} {ingredient.unit}
        </Text>
      ))}

      <Text style={styles.sectionHeader}>Các bước nấu ăn</Text>
      {recipe.steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepNumber}>Bước {step.step_number}: {step.step_name}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
          {step.image_url && (
            <Image source={{ uri: step.image_url }} style={styles.stepImage} />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative'
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  favoriteButton: {
    position: 'absolute',
    marginTop: 230,
    marginLeft: 300
  },
  infoSection: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },
  nutritionItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  ingredientItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  stepContainer: {
    marginBottom: 15,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  stepDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    textIndent: 20,
  },
  stepImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 5,
  },
});

export default RecipeDetailScreen;
