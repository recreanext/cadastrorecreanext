import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AdminLoginScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin') {
      navigation.navigate('AdminPanel');
    } else {
      Alert.alert('Senha incorreta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login do Administrador</Text>
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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
