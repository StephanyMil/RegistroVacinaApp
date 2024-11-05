import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, StyleSheet } from 'react-native';
import api from '../../utils/api';

const CalendarioScreen = () => {
  const [idade, setIdade] = useState('');
  const [calendario, setCalendario] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarCalendario = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/calendario/vacinacao', {
        params: { idade },
      });
      setCalendario(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const categorias = {
    crianca: calendario?.filter((item: any) => item.categoria === 'Criança'),
    adolescente: calendario?.filter((item: any) => item.categoria === 'Adolescente'),
    adulto: calendario?.filter((item: any) => item.categoria === 'Adulto'),
    idoso: calendario?.filter((item: any) => item.categoria === 'Idoso'),
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Criança':
        //return require('../../assets/images/children_icon.png');
      case 'Adolescente':
        //return require('../../assets/images/teen_icon.png');
      case 'Adulto':
        //return require('../../assets/images/adult_icon.png');
      case 'Idoso':
        //return require('../../assets/images/elder_icon.png');
      default:
        //return null;
    }
  };

  const renderCalendario = (categoria: string, items: any) => (
    <View style={styles.categoryCard}>
      <Image source={getIconForCategory(categoria)} style={styles.categoryIcon} />
      <Text style={styles.categoriaTitle}>{categoria}</Text>
      {items.map((item: any) => (
        <View key={item.calendarioId} style={styles.vaccineItem}>
          <Text style={styles.vaccineName}>Vacinas: {item.vacinas}</Text>
          <Text>Doses: {item.doses}</Text>
          <Text>
            Faixa Etária: {item.faixaEtariaObjeto.mesesinicial} - {item.faixaEtariaObjeto.mesesfinal} meses
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/calendar (2) 1.png')}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>Calendário de Vacinação</Text>
      </View>

      <TextInput
        placeholder="Digite sua idade"
        keyboardType="numeric"
        onChangeText={setIdade}
        value={idade}
        style={styles.input}
      />
      <Button title="Buscar Calendário" onPress={buscarCalendario} />

      {isLoading && <Text>Carregando...</Text>}
      {error && <Text style={styles.errorText}>Erro: {error}</Text>}

      <ScrollView>
        {categorias.crianca && renderCalendario('Criança', categorias.crianca)}
        {categorias.adolescente && renderCalendario('Adolescente', categorias.adolescente)}
        {categorias.adulto && renderCalendario('Adulto', categorias.adulto)}
        {categorias.idoso && renderCalendario('Idoso', categorias.idoso)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    backgroundColor: '#0066cc',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  categoriaTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  categoryCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  vaccineItem: {
    marginVertical: 10,
    textAlign: 'center',
  },
  vaccineName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default CalendarioScreen;


