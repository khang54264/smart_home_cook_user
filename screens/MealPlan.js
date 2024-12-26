import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform  } from 'react-native';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon
import axios from 'axios';

const MealPlan = ({ navigation }) => {
    const ipconfig = '192.168.2.162';
    const { user, logout } = useContext(AuthContext); // Truy cập thông tin người dùng và hàm logout
    const [mealPlans, setMealPlans] = useState([]);
    const [newMealPlanName, setNewMealPlanName] = useState('');
    const [editingMealPlan, setEditingMealPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    // Lấy danh sách các Meal Plans
    useEffect(() => {
        setLoading(true);
        fetchMealPlan();
    }, []);

    const fetchMealPlan = () => {
        axios.get(`http://${ipconfig}:5000/plans/getplan/${user.id}`)  // Thay thế với endpoint lấy tất cả meal plans
            .then(response => {
                setMealPlans(response.data);
                console.log(mealPlans);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Error fetching meal plans', error);
            });
    };

    // Thêm Meal Plan
    const handleAddMealPlan = () => {
        if (!newMealPlanName.trim()) {
            Alert.alert('Error', 'Please enter a meal plan name');
            return;
        }
        const newPlan = {
            u_id: user.id.trim(),
            name: newMealPlanName.trim(),
        };

        axios.post(`http://${ipconfig}:5000/plans/createplan`, newPlan)
            .then(response => {
                fetchMealPlan();
                setNewMealPlanName('');
            })
            .catch(error => console.error('Error adding meal plan', error));
    };

    // Xóa Meal Plan và các Recipe liên quan
    const handleDeleteMealPlan = (mealPlanId) => {
        axios.delete(`http://${ipconfig}:5000/plans/delplan/${mealPlanId}`)
            .then(response => {
                fetchMealPlan();
            })
            .catch(error => console.error('Error deleting meal plan', error));
    };

    // Sửa Meal Plan
    const handleEditMealPlan = () => {
        if (!editingMealPlan || !editingMealPlan.name.trim()) {
            Alert.alert('Error', 'Please enter a valid meal plan name');
            return;
        }

        axios.put(`http://${ipconfig}:5000/plans/editplan/${editingMealPlan._id}`, { name: editingMealPlan.name })
            .then(response => {
                setMealPlans(mealPlans.map(plan => plan._id === response.data._id ? response.data : plan));
                setEditingMealPlan(null);
            })
            .catch(error => console.error('Error editing meal plan', error));
    };

    // Xóa Recipe khỏi Meal Plan
    const handleRemoveRecipeFromMealPlan = (mealPlanId, recipeId) => {
        axios.delete(`http://${ipconfig}:5000/plans/delrepplan`, { data: { mealPlanId, recipeId } })
            .then(response => {
                Alert.alert('Success', 'Recipe removed from meal plan!');
            })
            .catch(error => console.error('Error removing recipe from meal plan', error));
    };

    const MealPlanItem = ({ plan }) => (
        <View style={styles.mealPlanContainer}>
            <Text style={styles.mealPlanTitle}>{plan.name}</Text>

            {/* Edit and Delete buttons */}
            {editingMealPlan && editingMealPlan._id === plan._id ? (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.input}
                        value={editingMealPlan.name}
                        onChangeText={(text) => setEditingMealPlan({ ...editingMealPlan, name: text })}
                    />
                    <TouchableOpacity onPress={handleEditMealPlan} style={styles.button}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setEditingMealPlan(plan)} style={styles.button}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteMealPlan(plan._id)} style={styles.button}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
            
            {/* Add and Remove Recipe */}
            <TouchableOpacity
                onPress={() => handleRemoveRecipeFromMealPlan(plan._id, recipeId)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Remove Recipe from Meal Plan</Text>
            </TouchableOpacity>
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
          { icon: "home-outline", label: "Home", screen: "Home"  },
          { icon: "heart-outline", label: "Favorite", screen: "Favorite" },
          { icon: "clipboard-outline", label: "Plan", screen: "Plan",isActive: true },
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

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.header}>Meal Plans</Text>

            {/* Add Meal Plan */}
            <View style={styles.addMealPlan}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter meal plan name"
                    value={newMealPlanName}
                    onChangeText={setNewMealPlanName}
                />
                <TouchableOpacity onPress={handleAddMealPlan} style={styles.addButton}>
                    <Text style={styles.buttonText}>Add Meal Plan</Text>
                </TouchableOpacity>
            </View>

            {/* Meal Plan List */}
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={mealPlans}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <MealPlanItem plan={item}/>}
                />
            )}
            </ScrollView>
            <NavigationBar />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
    mealPlanContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    mealPlanTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    addMealPlan: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    editContainer: {
        marginBottom: 15,
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

export default MealPlan;
