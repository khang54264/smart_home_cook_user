import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    axios.get('http://localhost:5000/users/1')  // example user ID
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};

export default ProfileScreen;
