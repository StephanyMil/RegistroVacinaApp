import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/images/ic_vaccine.png')} style={styles.headerImage} />
        <Text style={styles.headerText}>Vacinação</Text>
      </View>

      {/* Calendário Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/calendario')}
      >
        <Image
          source={require('../assets/images/calendario.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.buttonText}>Calendário</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066cc', // Azul para o cabeçalho
    paddingVertical: 20, // Aumentar o padding vertical
    marginBottom: 20, // Separação entre o cabeçalho e o botão
    borderRadius: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#E2EAFF',
    padding: 10,
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  image: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10, // Espaço entre o botão e o texto
  },
});

export default HomeScreen;



