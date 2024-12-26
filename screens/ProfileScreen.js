import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext); // Truy cập thông tin người dùng và hàm logout

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không thể tải thông tin người dùng</Text>
      </View>
    );
  }

  function formatDate(dateString) {
    const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
    const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và định dạng với 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (bắt đầu từ 0) và định dạng
    const year = date.getFullYear(); // Lấy năm

    return `${day}/${month}/${year}`; // Trả về định dạng DD/MM/YYYY
  }

  const formattedDate = (date) => {
    return formatDate(date);
  }

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/home-cook-54264.appspot.com/o/images%2Fcookingbackground.png?alt=media&token=86c6e026-bf67-4293-9928-275531b01367' }} // Đường dẫn đến hình nền
      style={styles.imgcontainer}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Thông tin người dùng</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Tên: {user.name}</Text>
          <Text style={styles.info}>Username: {user.username}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>Vai trò: {user.role}</Text>
          <Text style={styles.info}>Ngày tạo: {formattedDate(user.time_created)}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.replace('Login');logout();}}
        >
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Thêm nền đen mờ để làm nổi bật thông tin
    borderRadius: 10,
  },
  backgroundImage: {
    opacity: 0.5,
    resizeMode: 'cover',  // Tạo hiệu ứng phủ đầy
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 30,
  },
  info: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
    lineHeight: 25,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4CAF50',  // Màu xanh lá cây nổi bật
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',  // Tạo bóng đổ cho nút
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    marginTop: 10,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: '#4CAF50',  // Màu xanh lá cây cho khung hình tròn
    borderRadius: 50,  // Tạo hình tròn
    width: 80,  // Đặt kích thước
    height: 80,  // Đặt kích thước
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Khoảng cách giữa biểu tượng và các thông tin
    shadowColor: '#000',  // Thêm bóng đổ cho khung
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }
});

export default ProfileScreen;
