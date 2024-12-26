import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const ipconfig = '192.168.2.162';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerifyPasswordVisible, setIsVerifyPasswordVisible] = useState(false);

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  const handleNaviLogin = () => {
    navigation.replace('Login');
  };

  const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry, toggleVisibility, isPasswordVisible }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          accessibilityLabel={label}
        />
        {toggleVisibility && (
          <TouchableOpacity
            onPress={toggleVisibility}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? `Hide ${label}` : `Show ${label}`}
            style={{ right: 0, marginRight: 10, position: 'absolute' }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="rgba(0, 0, 0, 0.5)"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const SubmitButton = ({ onPress }) => (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Let's Cook!"
    >
      <Text style={styles.submitButtonText}>Let's Cook!</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/home-cook-54264.appspot.com/o/images%2Fcookingbackground.png?alt=media&token=86c6e026-bf67-4293-9928-275531b01367' }} // Đường dẫn đến hình nền
                style={styles.imgcontainer}
                imageStyle={styles.backgroundImage} // Tùy chọn để thay đổi cách hình ảnh được hiển thị
              >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/home-cook-54264.appspot.com/o/logos%2Fhomecook_png.png?alt=media&token=e27535b4-14e8-40a5-bda0-4ebac2f7c4dd' }}
            style={styles.logo}
            accessibilityLabel="Home Cook Logo"
          />
          <TouchableOpacity
            style={styles.loginContainer}
            accessibilityRole="button"
            accessibilityLabel="Log in"
            onPress={handleNaviLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Home Cook</Text>
        </View>
        <View style={styles.formContainer}>
          <InputField
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
            isPasswordVisible={isPasswordVisible}
          />
          <InputField
            label="Verify Password"
            value={verifyPassword}
            onChangeText={setVerifyPassword}
            placeholder="Verify your password"
            secureTextEntry={!isVerifyPasswordVisible}
            toggleVisibility={() => setIsVerifyPasswordVisible(!isVerifyPasswordVisible)}
            isPasswordVisible={isVerifyPasswordVisible}
          />
        </View>
        <SubmitButton onPress={handleSubmit} />
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
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    opacity: 0.5, // Điều chỉnh độ mờ của hình nền
    resizeMode: 'stretch', // Tùy chỉnh cách hình nền hiển thị
    maxWidth: 480
  },
  scrollContent: {
    flexGrow: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 38,
    paddingTop: 38,
    paddingBottom: 44,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  loginContainer: {
    backgroundColor: '#FEF7FF',
    padding: 14,
    borderRadius: 8,
  },
  loginText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#32ADE6',
    fontWeight: '500',
  },
  titleContainer: {
    marginBottom: 29,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: '800',
    color: 'rgba(16, 111, 205, 0.6)',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#32ADE6',
    width: 240,
    maxWidth: '100%',
    padding: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;
