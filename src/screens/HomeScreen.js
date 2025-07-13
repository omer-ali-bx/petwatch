import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import petsData from '../data/pets.json';

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

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    
    // Animate the initial load
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const handleCardPress = (pet) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    navigation.navigate('PetDetails', { pet });
  };

  const renderPetCard = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.cardContainer, { 
        transform: [{ scale: 1 }],
        opacity: 1,
      }]}
      onPress={() => handleCardPress(item)}
      activeOpacity={0.7}
    >
      <Card style={styles.card}>
        <Card.Cover 
          source={getImageSource(item.image)} 
          style={styles.cardImage}
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.petName}>{item.name}</Title>
          <Paragraph style={styles.petInfo}>
            {item.breed} • {item.age}
          </Paragraph>
          <Paragraph style={styles.petDescription} numberOfLines={2}>
            {item.description}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Perfect Pet</Text>
        <Text style={styles.headerSubtitle}>
          {petsData.length} pets looking for homes
        </Text>
      </View>
      
      <FlatList
        data={petsData}
        renderItem={renderPetCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 12,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  petDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default HomeScreen;

