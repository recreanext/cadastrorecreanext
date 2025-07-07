import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProgramManagementScreen() {
  const [programs, setPrograms] = useState([]);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('programs');
      if (data) setPrograms(JSON.parse(data));
    };
    load();
  }, []);

  const savePrograms = async (newPrograms) => {
    setPrograms(newPrograms);
    await AsyncStorage.setItem('programs', JSON.stringify(newPrograms));
  };

  const addProgram = async () => {
    if (!time || !description) return;
    const newPrograms = [...programs, { id: Date.now().toString(), time, description }];
    await savePrograms(newPrograms);
    setTime('');
    setDescription('');
  };

  const removeProgram = async (id) => {
    const newPrograms = programs.filter(p => p.id !== id);
    await savePrograms(newPrograms);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Programações</Text>
      <TextInput placeholder="Horário" value={time} onChangeText={setTime} style={styles.input} />
      <TextInput placeholder="Descrição" value={description} onChangeText={setDescription} style={styles.input} />
      <Button title="Adicionar" onPress={addProgram} />
      <FlatList
        data={programs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.time} - {item.description}</Text>
            <Button title="Excluir" onPress={() => removeProgram(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }
});
