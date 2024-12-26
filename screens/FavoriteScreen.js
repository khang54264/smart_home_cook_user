import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, ImageBackground, Alert } from 'react-native';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon
import axios from 'axios';

const FavoriteScreen = ({ navigation }) => {
  const ipconfig = '192.168.2.162';
  const { user, logout } = useContext(AuthContext); // Truy cập thông tin người dùng và hàm logout
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách các FavoriteRecipes của người dùng
  useEffect(() => {
    fetchFavoriteList();
    }, [user._id]);

    const fetchFavoriteList = () => {
        axios.get(`http://${ipconfig}:5000/recipes/favorites/${user.id}`)
        .then(response => {
            setFavoriteRecipes(response.data.favoriteRecipes);
            console.log(favoriteRecipes);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
    };

    // Xóa công thức yêu thích
    const handleRemoveFavorite = (FavorId) => {
        console.log(FavorId);
        try {
        axios.delete(`http://${ipconfig}:5000/recipes/favorites/remove/${FavorId}`)
        .then(() => {
            console.log('Recipe removed');
            fetchFavoriteList();
            alert('Recipe removed from favorites!');
        })
        .catch(error => {
            console.error(error);
        });
        } catch (error) {
        console.error('Error removing tag:', error);
        }
    };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  //Header
    const Header = () => (
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Danh sách yêu thích</Text>
          <Text>Đây là danh sách yêu thích của bạn {user.name}!</Text>
        </View>
      </View>
    );

  
    //Navigation Item
      const NavigationItem = ({ icon, label, isActive, onPress }) => (
        <TouchableOpacity style={styles.navItem} onPress={onPress} accessible={true} accessibilityLabel={label} accessibilityRole="button" accessibilityState={{ selected: isActive }}>
          <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
            <Ionicons name={icon} size={24} color={isActive ? "#1D1B20" : "#49454F"} />
          </View>
          <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
        </TouchableOpacity>
      );
    
      //Navigation Bar
      const NavigationBar = () => {
        const navItems = [
          { icon: "person-outline", label: "User", screen: "Profile"  },
          { icon: "home-outline", label: "Home", screen: "Home" },
          { icon: "heart-outline", label: "Favorite", screen: "Favorite",isActive: true  },
          { icon: "clipboard-outline", label: "Plan" },
          { icon: "fitness-outline", label: "AI", screen: "Tracking" },
        ];
      
        return (
          <View style={styles.navigationBar}>
            {navItems.map((item, index) => (
              <NavigationItem
                key={index}
                icon={item.icon}
                label={item.label}
                isActive={item.isActive}
                onPress={() => navigation.navigate(item.screen)}
              />
            ))}
          </View>
        );
      };

  //Giao diện màn hình chính
  return (
    <ImageBackground
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/home-cook-54264.appspot.com/o/images%2Fcookingbackground.png?alt=media&token=86c6e026-bf67-4293-9928-275531b01367' }} // Đường dẫn đến hình nền
        style={styles.container}
        imageStyle={styles.backgroundImage} // Tùy chọn để thay đổi cách hình ảnh được hiển thị
    >
        <Header/>
        <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
                <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.r_id._id, navigation })}
                    accessible={true}
                    accessibilityLabel={`View details for ${item.name}`}>
                <Image source={{ uri: item.r_id.image_url }} style={styles.recipeImage} />
                <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{item.r_id.name}</Text>
                <TouchableOpacity onPress={() => handleRemoveFavorite(item._id)}>
                    <Ionicons name="heart-dislike" size={24} color="red" />
                </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )}
      />
      <NavigationBar/>
    </ImageBackground>
      
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 480,
        width: '100%',
        paddingTop: 18,
        position: 'relative', 
    },
    backgroundImage: {
        opacity: 0.5, // Điều chỉnh độ mờ của hình nền
        resizeMode: 'stretch', // Tùy chỉnh cách hình nền hiển thị
        maxWidth: 480
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        marginLeft: 20,
        width: '100%',
        maxWidth: 283,
        gap: 20,
        justifyContent: 'space-between',
    },
    titleContainer: {
        minHeight: 48,
        paddingLeft: 0,
        justifyContent: 'center',
    },
    title: {
        fontSize: 48,
        color: 'rgba(60, 60, 67, 0.6)',
        fontWeight: '800',
        letterSpacing: -0.43,
    },
    recipeItem: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 7,
        height: 90
    },
    recipeImage: {
        width: 110,
        height: 60,
        borderRadius: 8,
    },
    recipeInfo: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'space-between',
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    navigationBar: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 0,
        position: 'absolute',  // Cố định NavigationBar ở dưới cùng
        bottom: 0,  // Đảm bảo nó ở dưới cùng
        width: '100%',  // Chiếm toàn bộ chiều rộng màn hình
    },
    navItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    iconContainer: {
        borderRadius: 16,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeIconContainer: {
        backgroundColor: '#388E3C',
    },
    icon: {
        width: 24,
        aspectRatio: 1,
    },
    label: {
        color: '#49454F',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.5,
        marginTop: 4,
        textAlign: 'center',
    },
    activeLabel: {
        color: '#1D1B20',
        fontWeight: '600',
    },
});

export default FavoriteScreen;
