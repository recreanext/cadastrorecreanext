import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, CheckBox, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChildFormScreen({ navigation }) {
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [guardians, setGuardians] = useState('');
  const [whatsapp1, setWhatsapp1] = useState('');
  const [whatsapp2, setWhatsapp2] = useState('');
  const [email, setEmail] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [hasAllergy, setHasAllergy] = useState(false);
  const [allergyDetails, setAllergyDetails] = useState('');
  const [reactionMedication, setReactionMedication] = useState('');
  const [regularMedication, setRegularMedication] = useState(false);
  const [medicationDetails, setMedicationDetails] = useState('');
  const [chronicDisease, setChronicDisease] = useState(false);
  const [foodRestriction, setFoodRestriction] = useState(false);
  const [foodRestrictionDetails, setFoodRestrictionDetails] = useState('');
  const [neuroDivergence, setNeuroDivergence] = useState('');
  const [canSwim, setCanSwim] = useState(false);
  const [canFloat, setCanFloat] = useState(false);
  const [allowOutActivities, setAllowOutActivities] = useState(false);
  const [allowMeals, setAllowMeals] = useState(false);
  const [food, setFood] = useState('');
  const [allergies, setAllergies] = useState('');
  const [participation, setParticipation] = useState(false);
  const [imageUse, setImageUse] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    const child = {
      childName,
      age,
      guardians,
      whatsapp1,
      whatsapp2,
      email,
      hasInsurance,
      insuranceProvider,
      emergencyContact,
      hasAllergy,
      allergyDetails,
      reactionMedication,
      regularMedication,
      medicationDetails,
      chronicDisease,
      foodRestriction,
      foodRestrictionDetails,
      neuroDivergence,
      canSwim,
      canFloat,
      allowOutActivities,
      allowMeals,
      food,
      allergies,
      participation,
      imageUse,
      notes
    };
    await AsyncStorage.setItem('child', JSON.stringify(child));
    navigation.navigate('Activities');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro da Criança</Text>
      <TextInput placeholder="Nome da criança" value={childName} onChangeText={setChildName} style={styles.input} />
      <TextInput placeholder="Idade" value={age} onChangeText={setAge} style={styles.input} />

      <TextInput placeholder="Nome dos responsáveis" value={guardians} onChangeText={setGuardians} style={styles.input} />
      <TextInput placeholder="WhatsApp para contato" value={whatsapp1} onChangeText={setWhatsapp1} style={styles.input} />
      <TextInput placeholder="Outro WhatsApp" value={whatsapp2} onChangeText={setWhatsapp2} style={styles.input} />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} />

      <Text style={styles.sectionTitle}>Informação Médica</Text>
      <View style={styles.checkboxRow}>
        <CheckBox value={hasInsurance} onValueChange={setHasInsurance} />
        <Text style={styles.checkboxLabel}>Tem plano de saúde</Text>
      </View>
      <TextInput placeholder="Qual?" value={insuranceProvider} onChangeText={setInsuranceProvider} style={styles.input} />
      <TextInput placeholder="Contato de emergência" value={emergencyContact} onChangeText={setEmergencyContact} style={styles.input} />
      <View style={styles.checkboxRow}>
        <CheckBox value={hasAllergy} onValueChange={setHasAllergy} />
        <Text style={styles.checkboxLabel}>Possui alergia(s)?</Text>
      </View>
      <TextInput placeholder="Quais?" value={allergyDetails} onChangeText={setAllergyDetails} style={styles.input} />
      <TextInput placeholder="Descreva reação e medicamentos" value={reactionMedication} onChangeText={setReactionMedication} style={styles.input} />
      <View style={styles.checkboxRow}>
        <CheckBox value={regularMedication} onValueChange={setRegularMedication} />
        <Text style={styles.checkboxLabel}>Usa medicamento regular?</Text>
      </View>
      <TextInput placeholder="Dosagem, frequência, efeitos" value={medicationDetails} onChangeText={setMedicationDetails} style={styles.input} />
      <View style={styles.checkboxRow}>
        <CheckBox value={chronicDisease} onValueChange={setChronicDisease} />
        <Text style={styles.checkboxLabel}>Possui doença crônica?</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CheckBox value={foodRestriction} onValueChange={setFoodRestriction} />
        <Text style={styles.checkboxLabel}>Possui restrição alimentar?</Text>
      </View>
      <TextInput placeholder="Qual?" value={foodRestrictionDetails} onChangeText={setFoodRestrictionDetails} style={styles.input} />
      <TextInput placeholder="Possui neuro divergência? Qual?" value={neuroDivergence} onChangeText={setNeuroDivergence} style={styles.input} />

      <Text style={styles.sectionTitle}>Sobre a Recreação</Text>
      <View style={styles.checkboxRow}>
        <CheckBox value={canSwim} onValueChange={setCanSwim} />
        <Text style={styles.checkboxLabel}>Sabe nadar?</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CheckBox value={canFloat} onValueChange={setCanFloat} />
        <Text style={styles.checkboxLabel}>Sabe flutuar?</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CheckBox value={participation} onValueChange={setParticipation} />
        <Text style={styles.checkboxLabel}>Autorização para participar das atividades</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CheckBox value={allowOutActivities} onValueChange={setAllowOutActivities} />
        <Text style={styles.checkboxLabel}>Atividades fora da área do hotel</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CheckBox value={allowMeals} onValueChange={setAllowMeals} />
        <Text style={styles.checkboxLabel}>Participar de refeições recreativas</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CheckBox value={imageUse} onValueChange={setImageUse} />
        <Text style={styles.checkboxLabel}>Autorização para uso de imagem</Text>
      </View>
      <TextInput placeholder="Restrições alimentares" value={food} onChangeText={setFood} style={styles.input} />
      <TextInput placeholder="Alergias" value={allergies} onChangeText={setAllergies} style={styles.input} />
      <TextInput placeholder="Observações" value={notes} onChangeText={setNotes} style={styles.input} />
      <Button title="Salvar" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 16, marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkboxLabel: { marginLeft: 8 }
});
