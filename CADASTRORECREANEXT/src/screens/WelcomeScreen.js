import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.description}>Bem-vindo ao CADASTRORECREANEXT!</Text>
      <Button title="Começar" onPress={() => navigation.navigate('GuestForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 200, height: 200, marginBottom: 20 },
  description: { fontSize: 18, marginBottom: 20, textAlign: 'center' }
});
