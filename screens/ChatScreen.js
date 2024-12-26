import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleGenerativeAI } from '@google/generative-ai';
//npm install @react-native-async-storage/async-storage @google/generative-ai
const apiKey = "AIzaSyDcz3dbpTf2dG2djAA_LQFPfONvJklgXWo"; // Thay thế bằng API key của bạn
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const ChatScreen = () => {
  const [messageInput, setMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatSession, setChatSession] = useState(null);
  const scrollViewRef = useRef(null);
  const idNguoiDung = 1; // ID người dùng để lưu trữ

  useEffect(() => {
    loadChatHistory();
  }, [chatHistory]);

  useEffect(() => {
    if (chatSession === null) {
      initializeChatSession();
    }
  }, []);

  const loadChatHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem(`chat_history_id_${idNguoiDung}`);
      if (storedHistory !== null) {
        setChatHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Lỗi khi tải lịch sử chat:", error);
    }
  };

  const saveChatHistory = async () => {
    try {
      await AsyncStorage.setItem(`chat_history_id_${idNguoiDung}`, JSON.stringify(chatHistory));
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử chat:", error);
    }
  };

  const initializeChatSession = () => {
    const newSession = model.startChat({ generationConfig, history: chatHistory });
    setChatSession(newSession);
  };


  const sendMessage = async () => {
    if (messageInput.trim() !== '') {
      const newMessage = { role: "user", content: messageInput };

      const updatedHistory = [...chatHistory, newMessage];
      setChatHistory(updatedHistory);
      setMessageInput('');

      try {
        const result = await chatSession.sendMessage(messageInput);
        console.log(result);
        const aiResponse = { role: "model", content: result.response.text() };
        setChatHistory([...updatedHistory, aiResponse]);
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);


  const renderMessage = (message) => (
    <View key={message.content + message.role + Math.random()} style={[styles.message, message.role === 'user' ? styles.user : styles.model]}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text>{message.content}</Text>
    </View>
  );


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust for iOS bottom bar
    >
      <ScrollView ref={scrollViewRef} style={styles.chatMessages}>
        {chatHistory.map(renderMessage)}
      </ScrollView>
      <View style={styles.chatInput}>
        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type your message..."
          onSubmitEditing={sendMessage} // Gửi tin nhắn khi nhấn Enter
        />
        {/* <Button title="Save" onPress={saveChatHistory} /> */}
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    chatMessages: {
      padding: 10,
      flexGrow: 1, // Cho phép ScrollView chiếm toàn bộ không gian còn lại
    },
    message: {
      marginBottom: 10,
      padding: 10,
      borderRadius: 15,
      maxWidth: '70%',
    },
    user: {
      backgroundColor: '#e0f7fa', // Màu nền cho tin nhắn của người dùng
      alignSelf: 'flex-end', // Canh phải
      marginRight: 10 //Thêm margin phải,
    },
    model: {
      backgroundColor: '#c8e6c9', // Màu nền cho tin nhắn của model
      alignSelf: 'flex-start', // Canh trái
      marginLeft: 10, //Thêm margin trái
    },
    chatInput: {
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      flexDirection: 'row', // Sắp xếp input và button theo hàng ngang
      alignItems: 'center'
    },
    input: {
      flex: 1, // Cho phép input chiếm toàn bộ không gian còn lại
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginRight: 10,
    },
  
  });

export default ChatScreen;