import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={label}
      />
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b8d134171f420c1fa85e4c6673976f440513b902eee8d720ad733d4252139d5a?placeholderIfAbsent=true&apiKey=9748ac508bc441cfb045e652c015ab97' }}
            style={styles.logo}
            accessibilityLabel="Home Cook Logo"
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Login</Text>
          </View>
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
            secureTextEntry
          />
          <InputField
            label="Verify Password"
            value={verifyPassword}
            onChangeText={setVerifyPassword}
            placeholder="Verify your password"
            secureTextEntry
          />
        </View>
        <SubmitButton onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    fontFamily: 'Abhaya Libre ExtraBold',
    fontSize: 48,
    color: 'rgba(60, 60, 67, 0.6)',
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.43,
  },
  formContainer: {
    width: '100%',
    marginBottom: 23,
  },
  inputContainer: {
    marginBottom: 11,
    width: '100%',
  },
  inputLabel: {
    position: 'absolute',
    left: -10000,
    top: 'auto',
    width: 1,
    height: 1,
    overflow: 'hidden',
  },
  input: {
    borderRadius: 8,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
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