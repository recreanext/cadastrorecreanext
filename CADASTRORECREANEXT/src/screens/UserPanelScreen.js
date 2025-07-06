import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserPanelScreen({ navigation }) {
  const [guest, setGuest] = useState(null);
  const [child, setChild] = useState(null);

  useEffect(() => {
    const load = async () => {
      const g = await AsyncStorage.getItem('guest');
      const c = await AsyncStorage.getItem('child');
      if (g) setGuest(JSON.parse(g));
      if (c) setChild(JSON.parse(c));

      setGuest(JSON.parse(g));
      setChild(JSON.parse(c));
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel do Usuário</Text>
      {guest && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hóspede</Text>
          <Text>Nome: {guest.name}</Text>
          <Text>Quarto: {guest.room}</Text>
          {guest.phone ? <Text>Telefone: {guest.phone}</Text> : null}
        </View>
      )}
      {child && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Criança</Text>
          <Text>Nome: {child.childName}</Text>
          <Text>Idade: {child.age}</Text>
        </View>
      )}
      <Button title="Editar Dados" onPress={() => navigation.navigate('GuestForm')} />
      <View style={styles.spacer} />
      <Button title="Ver Programação" onPress={() => navigation.navigate('Activities')} />
      <View style={styles.spacer} />
      <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
    </ScrollView>

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
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 5 },
  spacer: { height: 10 }

  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' }
});
