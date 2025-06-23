import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      const h = await AsyncStorage.getItem('chat');
      if (h) setHistory(JSON.parse(h));
    };
    load();
  }, []);

  const send = async () => {
    const newHistory = [...history, { id: Date.now().toString(), text: message }];
    setHistory(newHistory);
    await AsyncStorage.setItem('chat', JSON.stringify(newHistory));
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.messages}
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}><Text>{item.text}</Text></View>
        )}
      />
      <TextInput
        placeholder="Mensagem"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Enviar" onPress={send} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  messages: { flex: 1, marginBottom: 10 },
  message: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }
});
