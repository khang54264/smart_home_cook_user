  import React, { useState, useContext  } from 'react';
  import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ImageBackground } from 'react-native';
  import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon
  import axios from 'axios';
  import { AuthContext } from '../AuthContext'; // Import AuthContext

  const LoginScreen = ({ navigation }) => {
    const ipconfig = '192.168.2.162';
    const { login } = useContext(AuthContext); // Truy cập hàm login từ AuthContext
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

    const handleLogin = async () => {
      try {
        const response = await axios.post(`http://${ipconfig}:5000/users/login`, {
            usernameOrEmail: username,
            password: password,
        });
  
        const data = response.data;
        console.log(data);
        
        if (response.status === 200) {
            console.log("User Data:", data.user); 
            login(data.user); // Lưu thông tin người dùng vào context
            navigation.replace('Home'); // Đi tới trang home
        } else {
          Alert.alert('Error', data.message || 'Invalid credentials');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.error(error); // Log lỗi để biết vấn đề
      }
      setUsername('');
      setPassword('');
    };

    const handleForgotPassword = () => {
      // Handle forgot password
    };

    const handleNaviRegister = () => {
      navigation.replace('Register');
    };

    return (
      <ImageBackground
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/home-cook-54264.appspot.com/o/images%2Fcookingbackground.png?alt=media&token=86c6e026-bf67-4293-9928-275531b01367' }} // Đường dẫn đến hình nền
            style={styles.imgcontainer}
            imageStyle={styles.backgroundImage} // Tùy chọn để thay đổi cách hình ảnh được hiển thị
          >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Image
              resizeMode="contain"
              source={{ uri: "https://firebasestorage.googleapis.com/v0/b/home-cook-54264.appspot.com/o/logos%2Fhomecook_png.png?alt=media&token=e27535b4-14e8-40a5-bda0-4ebac2f7c4dd" }}
              style={styles.logo}
              accessible={true}
              accessibilityLabel="Company logo"
            />
            <TouchableOpacity
              style={styles.signUpButton}
              accessibilityRole="button"
              accessibilityLabel="Sign up"
              onPress={handleNaviRegister}
            >
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Home Cook</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username or Email"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                value={username}
                onChangeText={setUsername}
                accessibilityLabel="Username or Email input"
              />
            </View>

            <View style={[styles.inputContainer, { marginTop: 16, flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password input"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                accessibilityRole="button"
                accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
                style={{ right: 0, marginRight: 10, position: 'absolute' }}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"} // Change icon based on state
                  size={24}
                  color="rgba(0, 0, 0, 0.5)"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              accessibilityRole="button"
              accessibilityLabel="Login"
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
            accessibilityRole="button"
            accessibilityLabel="Forgot password"
          >
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      </ImageBackground>
    );
  };

  const styles = StyleSheet.create({
    imgcontainer: {
      flexGrow: 1,
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: 37,
      paddingTop: 38,
      fontFamily: 'Roboto',
    },
    backgroundImage: {
      opacity: 0.5, // Điều chỉnh độ mờ của hình nền
      resizeMode: 'stretch', // Tùy chỉnh cách hình nền hiển thị
      maxWidth: 480
    },
    header: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      borderRadius: 10,
      width: 36,
      aspectRatio: 1,
    },
    signUpButton: {
      backgroundColor: '#FEF7FF',
      minHeight: 48,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 8
    },
    signUpText: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: '#32ADE6',
      fontWeight: '500',
      letterSpacing: 0.1,
    },
    titleContainer: {
      marginTop: 50,
      minHeight: 48,
      width: 212,
      maxWidth: '100%',
    },
    title: {
      fontFamily: 'Roboto',
      fontSize: 48,
      color: 'rgba(16, 111, 205, 0.6)',
      fontWeight: '800',
      textAlign: 'center',
      letterSpacing: -0.43,
    },
    formContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 23,
    },
    inputContainer: {
      width: 270,
      maxWidth: '100%',
    },
    input: {
      borderRadius: 8,
      borderColor: 'rgba(217, 217, 217, 1)',
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontFamily: 'Roboto',
      fontSize: 14,
    },
    loginButton: {
      backgroundColor: '#32ADE6',
      borderRadius: 8,
      width: 240,
      maxWidth: '100%',
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 23,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '500',
    },
    forgotPasswordContainer: {
      marginTop: 11,
      minHeight: 48,
      width: 139,
      maxWidth: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    forgotPasswordText: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: '#49454F',
      fontWeight: '500',
      textAlign: 'center',
      letterSpacing: 0.1,
    },
  });

  export default LoginScreen;
