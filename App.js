import React from 'react';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext'; 
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';  
import RegisterScreen from './screens/RegisterScreen';  
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import CategoryRecipes from './screens/CategoryRecipe';
import ChatScreen from './screens/ChatScreen';
import ChangePassword from './screens/ChangePassword';
import FavoriteScreen from './screens/FavoriteScreen';
import MealPlan from './screens/MealPlan';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="CategoryRecipes" component={CategoryRecipes} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Tracking" component={ChatScreen} />
          <Stack.Screen name="Favorite" component={FavoriteScreen} />
          <Stack.Screen name="Plan" component={MealPlan} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
