import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const activities = [
  { id: '1', time: '10:00', description: 'Oficina de pintura' },
  { id: '2', time: '14:00', description: 'Caça ao tesouro' },
  { id: '3', time: '16:00', description: 'Jogos na piscina' }
];

export default function ActivitiesScreen({ navigation }) {
  const [child, setChild] = useState(null);

  useEffect(() => {
    const load = async () => {
      const c = await AsyncStorage.getItem('child');
      setChild(JSON.parse(c));
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programação de Atividades</Text>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.time} - {item.description}</Text>
          </View>
        )}
      />
      <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }
});
