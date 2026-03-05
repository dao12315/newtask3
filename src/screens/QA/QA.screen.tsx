import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChatMessage, chatService } from '../../services/chat.service';

export const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  useEffect(() => {
    console.log('MESSAGES LENGTH:', messages.length);
  }, [messages]);

  // 🔹 Subscribe messages (service tự lấy uid)
  useEffect(() => {
    return chatService.subscribeMessages(setMessages);
  }, []);

  // 🔹 Sort an toàn (không mutate state)
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => a.createdAt - b.createdAt);
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    await chatService.sendMessage(text.trim(), 'user');
    setText('');
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={{
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          backgroundColor: isUser ? '#990012' : '#ddd',
          padding: 10,
          borderRadius: 10,
          marginBottom: 8,
          maxWidth: '75%',
        }}
      >
        <Text style={{ color: isUser ? '#fff' : '#000' }}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        style={{ flex: 1 }}
        data={sortedMessages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 12,
          justifyContent: 'flex-end',
        }}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Nhập tin nhắn..."
        />

        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Text style={{ color: '#fff' }}>Gửi</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: '#990012',
    alignSelf: 'flex-end',
  },
  adminMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#990012',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
});
