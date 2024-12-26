import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import axios from 'axios';

const ChangePassword = ({ navigation }) => {
    const ipconfig = '192.168.2.162';
    const { user, logout } = useContext(AuthContext); // Truy cập thông tin người dùng và hàm logout
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    // Kiểm tra sự khớp của mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    // Kiểm tra xem mật khẩu mới có đủ mạnh không (ví dụ: ít nhất 6 ký tự)
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    // Gửi yêu cầu thay đổi mật khẩu đến API
    try {
      const response = await axios.put(`http://${ipconfig}:5000/users/changepassword`,{ currentPassword, newPassword });
      if (response.status === 200) {
        Alert.alert('Success', 'Mật khẩu đã được thay đổi thành công.');
        navigation.goBack(); // Quay lại trang trước
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Có lỗi xảy ra.');
    }};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thay đổi mật khẩu</Text>

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu hiện tại"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu mới"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button title="Thay đổi mật khẩu" onPress={handlePasswordChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
});

export default ChangePassword;
