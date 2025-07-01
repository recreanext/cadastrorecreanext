import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';

export default function AdminPanelScreen({ navigation }) {
  const exportData = async () => {
    try {
      await fetch('http://localhost:3001/export');
      Alert.alert('Exportação iniciada', 'Verifique o backend para baixar o arquivo.');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível exportar os dados');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Gerenciar Programações" onPress={() => navigation.navigate('ProgramManagement')} />
      <View style={styles.spacer} />
      <Button title="Baixar Dados em Excel" onPress={exportData} />
      <View style={styles.spacer} />
      <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  spacer: { height: 10 }
});
