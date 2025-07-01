import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.description}>Bem-vindo ao CADASTRORECREANEXT!</Text>
 jv4j14-codex/criar-app-recreação-kids-hotel
      <View style={styles.buttons}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
      <View style={styles.buttons}>
        <Button title="Cadastro" onPress={() => navigation.navigate('GuestForm')} />
      </View>
      <View style={styles.buttons}>
        <Button title="Login Admin" onPress={() => navigation.navigate('AdminLogin')} />
      </View>

      <Button title="Começar" onPress={() => navigation.navigate('GuestForm')} />
 main
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 200, height: 200, marginBottom: 20 },
 jv4j14-codex/criar-app-recreação-kids-hotel
  description: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  buttons: { marginBottom: 10, width: '60%' }

  description: { fontSize: 18, marginBottom: 20, textAlign: 'center' }
 main
});
