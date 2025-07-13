import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Card, Chip } from 'react-native-paper';
import GradientButton from '../components/GradientButton';

const { width } = Dimensions.get('window');

const getImageSource = (imageName) => {
  const imageMap = {
    'buddy.png': require('../assets/images/buddy.png'),
    'lucy.png': require('../assets/images/lucy.png'),
    'max.png': require('../assets/images/max.png'),
    'daisy.png': require('../assets/images/daisy.png'),
    'whiskers.png': require('../assets/images/whiskers.png'),
  };
  return imageMap[imageName] || require('../assets/images/buddy.png');
};

const PetDetailsScreen = ({ route, navigation }) => {
  const { pet } = route.params;

  const handleAdopt = () => {
    navigation.navigate('Payment', { pet });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image 
          source={getImageSource(pet.image)} 
          style={styles.petImage}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.petName}>{pet.name}</Text>
            <View style={styles.chipContainer}>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                {pet.breed}
              </Chip>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                {pet.age}
              </Chip>
              <Chip style={styles.chip} textStyle={styles.chipText}>
                {pet.gender}
              </Chip>
            </View>
          </View>

          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>About {pet.name}</Text>
              <Text style={styles.description}>{pet.description}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Pet Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoValue}>{pet.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Age:</Text>
                <Text style={styles.infoValue}>{pet.age}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Breed:</Text>
                <Text style={styles.infoValue}>{pet.breed}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Gender:</Text>
                <Text style={styles.infoValue}>{pet.gender}</Text>
              </View>
            </Card.Content>
          </Card>

          <GradientButton
            title={`Adopt ${pet.name} 🐾`}
            onPress={handleAdopt}
            style={styles.adoptButton}
            textStyle={styles.adoptButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  petImage: {
    width: width,
    height: 300,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  petName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#e3f2fd',
  },
  chipText: {
    color: '#1976d2',
    fontSize: 12,
  },
  infoCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  adoptButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  adoptButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetDetailsScreen;

