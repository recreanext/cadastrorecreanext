import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserPanelScreen({ navigation }) {
  const [guest, setGuest] = useState(null);
  const [child, setChild] = useState(null);

  useEffect(() => {
    const load = async () => {
      const g = await AsyncStorage.getItem('guest');
      const c = await AsyncStorage.getItem('child');
      setGuest(JSON.parse(g));
      setChild(JSON.parse(c));
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  if (!guest || !child) {
    return <View style={styles.container}><Text>Dados não cadastrados.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Usuário</Text>
      <Text>Hóspede: {guest.name}</Text>
      <Text>Quarto: {guest.room}</Text>
      <Text>Criança: {child.childName}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('GuestForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' }
});
