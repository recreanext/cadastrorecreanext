import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChildFormScreen({ navigation }) {
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [food, setFood] = useState('');
  const [allergies, setAllergies] = useState('');
  const [participation, setParticipation] = useState(false);
  const [imageUse, setImageUse] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    const child = { childName, age, food, allergies, participation, imageUse, notes };
    await AsyncStorage.setItem('child', JSON.stringify(child));
    navigation.navigate('Activities');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro da Criança</Text>
      <TextInput placeholder="Nome da criança" value={childName} onChangeText={setChildName} style={styles.input} />
      <TextInput placeholder="Idade" value={age} onChangeText={setAge} style={styles.input} />
      <TextInput placeholder="Restrições alimentares" value={food} onChangeText={setFood} style={styles.input} />
      <TextInput placeholder="Alergias" value={allergies} onChangeText={setAllergies} style={styles.input} />
      <View style={styles.checkboxRow}>
        <CheckBox value={participation} onValueChange={setParticipation} />
        <Text style={styles.checkboxLabel}>Autorização para participar das atividades</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CheckBox value={imageUse} onValueChange={setImageUse} />
        <Text style={styles.checkboxLabel}>Autorização para uso de imagem</Text>
      </View>
      <TextInput placeholder="Observações" value={notes} onChangeText={setNotes} style={styles.input} />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkboxLabel: { marginLeft: 8 }
});
