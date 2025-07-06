import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem('guest');
    if (!data) {
      Alert.alert('Cadastro não encontrado', 'Faça o cadastro primeiro');
      navigation.navigate('GuestForm');
      return;
    }
    const guest = JSON.parse(data);
    if (guest.name === name && guest.room === room) {
      navigation.navigate('UserPanel');
    } else {
      Alert.alert('Dados incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login do Hóspede</Text>
      <TextInput
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Número do quarto"
        value={room}
        onChangeText={setRoom}
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }
});
