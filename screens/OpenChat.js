import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const OpenChat = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { message } = route.params;
  const [chatMessages, setChatMessages] = useState([message]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage) {
      const newChatMessage = {
        id: chatMessages.length.toString(),
        text: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage('');
    }
  };

  const renderChatMessageItem = ({ item }) => (
    <View style={styles.chatMessageItem}>
      <Text style={styles.chatMessageText}>{item.text}</Text>
      <Text style={styles.chatTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.emptySpace} />
      </View>
      <FlatList
        data={chatMessages}
        renderItem={renderChatMessageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatMessagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Escribe un mensaje"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySpace: {
    width: 24,
  },
  chatMessagesList: {
    flexGrow: 1,
    marginBottom: 20,
  },
  chatMessageItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatMessageText: {
    fontSize: 14,
  },
  chatTimestamp: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FFC157',
    padding: 10,
    borderRadius: 10,
  },
});

export default OpenChat;
