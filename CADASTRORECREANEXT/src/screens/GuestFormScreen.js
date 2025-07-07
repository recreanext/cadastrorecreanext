import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GuestFormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('guest');
      if (data) {
        const g = JSON.parse(data);
        setName(g.name || '');
        setRoom(g.room || '');
        setPhone(g.phone || '');
      }
    };
    load();
  }, []);

  const handleSubmit = async () => {
    const guest = { name, room, phone };
    await AsyncStorage.setItem('guest', JSON.stringify(guest));
    navigation.navigate('ChildForm');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro do Hóspede</Text>
      <TextInput placeholder="Nome completo" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Número do quarto" value={room} onChangeText={setRoom} style={styles.input} />
      <TextInput placeholder="Telefone/WhatsApp" value={phone} onChangeText={setPhone} style={styles.input} />
      <Button title="Próximo" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }
});
