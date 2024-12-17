import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home');
  };
  
  const handleForgotPassword = () => {
    // Handle forgot password
  };

  const handleNaviRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8d134171f420c1fa85e4c6673976f440513b902eee8d720ad733d4252139d5a?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97" }}
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

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Password input"
          />
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
        accessibilityRole="button"
        accessibilityLabel="Forgot password"
      >
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 37,
    paddingTop: 38,
    paddingBottom: 348,
    fontFamily: 'Roboto',
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
  },
  signUpText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#32ADE6',
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  titleContainer: {
    marginTop: 170,
    minHeight: 48,
    width: 212,
    maxWidth: '100%',
  },
  title: {
    fontFamily: 'Abhaya Libre ExtraBold',
    fontSize: 48,
    color: 'rgba(60, 60, 67, 0.6)',
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
    width: 240,
    maxWidth: '100%',
    marginBottom: 11,
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