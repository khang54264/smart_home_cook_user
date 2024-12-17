import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/recipes/getall')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5c6959545ca07f1910fa673458963c23e3d400f3c6410df1c57e3780b39c959?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97" }}
          style={styles.logo}
          accessible={true}
          accessibilityLabel="Home Cook logo"
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Home Cook</Text>
      </View>
    </View>
  );

  const NavigationItem = ({ icon, label, isActive, onPress }) => (
    <TouchableOpacity style={styles.navItem} onPress={onPress} accessible={true} accessibilityLabel={label} accessibilityRole="button" accessibilityState={{ selected: isActive }}>
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        <Image
          resizeMode="contain"
          source={{ uri: icon }}
          style={styles.icon}
          accessible={false}
        />
      </View>
      <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );

  const NavigationBar = () => {
    const navItems = [
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4eb40ae1a24101e97d1b907fbc809ffe410ac25c2ddaf4a8dd13d56fee630ad7?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97", label: "Pantry" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b435d2c13ab35b1b256c47d13f17e4cbbe2446cbf798d4ba6a47f3adf5ecdd37?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97", label: "Home", isActive: true },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ea9fe61491f8fdb56c1d65079c528458b77f1859f40dbb2a7c053e47c2bca81?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97", label: "Favorite" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ae1ac61935c2aa96850f3dd6e8dca7f9a8374b9603063080bbee31d20102ad1f?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97", label: "Shopping" },
      { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/55a3535b5dd3b5deb1c805cb9025ebbd6e4171443b73ee4553b1f21cc73c8432?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97", label: "Tracking" },
    ];
  
    return (
      <View style={styles.navigationBar}>
        {navItems.map((item, index) => (
          <NavigationItem
            key={index}
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
            onPress={() => navigation.navigate('LoginScreen')}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
      </View>
      <NavigationBar />
    </View>
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
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 29,
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
    backgroundColor: '#32ADE6',
    width: 44,
    height: 44,
    marginTop: 10,
  },
  logo: {
    width: 20,
    aspectRatio: 1,
  },
  titleContainer: {
    minHeight: 48,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    color: 'rgba(60, 60, 67, 0.6)',
    fontWeight: '800',
    letterSpacing: -0.43,
  },
  navigationBar: {
    backgroundColor: '#F3EDF7',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 0,
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
    backgroundColor: '#E8DEF8',
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
