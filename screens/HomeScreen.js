import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, ImageBackground } from 'react-native';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const ipconfig = '192.168.2.162';
  const { user, logout } = useContext(AuthContext); // Truy cập thông tin người dùng và hàm logout
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const category1Name = '';
  const [category1, setCategory1] = useState([]);
  const category2Name = 'Thịt';
  const [category2, setCategory2] = useState([]);
  const category3Name = 'Canh';
  const [category3, setCategory3] = useState([]);

  useEffect(() => {
    axios.get(`http://${ipconfig}:5000/recipes/getall`)
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));

    axios.get(`http://${ipconfig}:5000/recipes/getcategory/?name=${category1Name}`)
      .then(response => setCategory1(response.data))
      .catch(error => console.error(error));

    axios.get(`http://${ipconfig}:5000/recipes/getcategory/?name=${category2Name}`)
      .then(response => setCategory2(response.data))
      .catch(error => console.error(error));

    axios.get(`http://${ipconfig}:5000/recipes/getcategory/?name=${category3Name}`)
      .then(response => setCategory3(response.data))
      .catch(error => console.error(error));
  }, []);

  //Header
  const Header = () => (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={{ uri: "https://firebasestorage.googleapis.com/v0/b/home-cook-54264.appspot.com/o/logos%2Fhomecook_png.png?alt=media&token=e27535b4-14e8-40a5-bda0-4ebac2f7c4dd" }}
          style={styles.logo}
          accessible={true}
          accessibilityLabel="Home Cook logo"
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Home Cook</Text>
        <Text>Welcome, {user.name}!</Text>
      </View>
    </View>
  );

  //Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const SearchItem = ({ recipe }) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe._id, navigation })}
      accessible={true}
    accessibilityLabel={`View details for ${recipe.name}`}
    >
      <Image
        source={{ uri: recipe.image_url }}
        style={styles.searchImage}
        resizeMode="cover"
      />
      <View style={styles.searchItemInfor}>
        <Text style={styles.searchName} numberOfLines={2}>
          {recipe.name}
        </Text>
        <Text style={styles.searchCookTime}>
          {recipe.cook_time} phút
        </Text>
      </View>
      
    </TouchableOpacity>
  );

  //Item
  const RecipeItem = ({ recipe }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe._id, navigation })}
      accessible={true}
    accessibilityLabel={`View details for ${recipe.name}`}
    >
      <Image
        source={{ uri: recipe.image_url }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <Text style={styles.recipeName} numberOfLines={2}>
        {recipe.name}
      </Text>
      <Text style={styles.recipeCookTime}>
        {recipe.cook_time} phút
      </Text>
    </TouchableOpacity>
  );

  //Category
  const Category = ({ categoryName, categories }) => (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{categoryName}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryRecipes', { categoryName, categories })}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories.slice(0,7)} // Hiển thị tối đa 7 công thức
        renderItem={({ item }) => <RecipeItem recipe={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recipeList}
      />
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
      { icon: "home-outline", label: "Home", screen: "Home" ,isActive: true },
      { icon: "heart-outline", label: "Favorite", screen: "Favorite" },
      { icon: "clipboard-outline", label: "Plan", screen: "Plan" },
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm món ăn"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      {searchQuery.trim() === '' ? (
        <ScrollView contentContainerStyle={[styles.content, {paddingBottom: 70,}]} >
          <Header />
          <View style={styles.contentBody}>
            <Category categoryName={"Đề Xuất Hôm Nay"} categories={category1} />
            <Category categoryName={category2Name} categories={category2} />
            <Category categoryName={category3Name} categories={category3} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.contentBody}>
          <FlatList
          data={searchResults}
          renderItem={({ item }) => <SearchItem recipe={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16 }}
          />
        </View>
      )}
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
  content: {
    flexGrow: 1, // Đảm bảo nội dung có thể cuộn được
  },
  contentBody: {
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchItem: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 16,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginVertical: 5,
    borderRadius: 8,
  },
  searchImage: {
    width: 130,
    height: 90,
    borderRadius: 8,
  },
  searchItemInfor: {
    flex: 1,
    flexDirection: 'column'
  },
  searchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginRight: 5,
    marginLeft: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
    width: '100%'
  },
  searchCookTime: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
    marginLeft: 10,
    marginBottom: 3
  },
  header: {
    flexDirection: 'row',
    marginLeft: 20,
    width: '100%',
    maxWidth: 283,
    gap: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#32ADE6',
    backgroundColor: '#4CAF50',
    width: 44,
    height: 44,
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    aspectRatio: 1,
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
  categoryContainer: {
    marginVertical: 10,
    marginBottom: 10
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#1E90FF',
  },
  recipeList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  recipeItem: {
    marginRight: 16,
    width: 120,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
  },
  recipeImage: {
    width: 118,
    height: 90,
    borderRadius: 8,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginRight: 5,
    marginLeft: 5
  },
  recipeCookTime: {
    fontSize: 12,
    color: '#888',
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 3
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

export default HomeScreen;
