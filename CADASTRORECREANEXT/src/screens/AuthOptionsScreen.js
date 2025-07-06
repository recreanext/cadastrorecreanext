import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function AuthOptionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={styles.spacer} />
      <Button title="Cadastro" onPress={() => navigation.navigate('GuestForm')} />
      <View style={styles.spacer} />
      <Button title="Login Admin" onPress={() => navigation.navigate('AdminLogin')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  spacer: { height: 10 }
});
