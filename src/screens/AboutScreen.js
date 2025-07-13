import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const AboutScreen = () => {
  const handleContactPress = () => {
    Linking.openURL('mailto:support@petwatch.com');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://petwatch.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons name="pets" size={64} color="#6200EE" />
          <Text style={styles.appName}>PetWatch</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>About PetWatch</Text>
            <Text style={styles.description}>
              PetWatch is your companion app for finding and adopting pets in need of loving homes. 
              We connect pet lovers with rescue animals, making the adoption process simple and joyful.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.description}>
              To reduce the number of homeless pets by connecting them with caring families. 
              Every pet deserves a loving home, and every family deserves the joy that comes with pet companionship.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <MaterialIcons name="search" size={20} color="#6200EE" />
                <Text style={styles.featureText}>Browse available pets</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="info" size={20} color="#6200EE" />
                <Text style={styles.featureText}>Detailed pet profiles</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="payment" size={20} color="#6200EE" />
                <Text style={styles.featureText}>Secure adoption process</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="location-on" size={20} color="#6200EE" />
                <Text style={styles.featureText}>Find nearby services</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.description}>
              Have questions or need support? We're here to help!
            </Text>
            
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <MaterialIcons name="email" size={20} color="#666" />
                <Text style={styles.contactText}>support@petwatch.com</Text>
              </View>
              <View style={styles.contactItem}>
                <MaterialIcons name="phone" size={20} color="#666" />
                <Text style={styles.contactText}>1-800-PET-PALS</Text>
              </View>
              <View style={styles.contactItem}>
                <MaterialIcons name="language" size={20} color="#666" />
                <Text style={styles.contactText}>www.petwatch.com</Text>
              </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={handleContactPress}
                style={styles.contactButton}
                icon="email"
              >
                Email Support
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleWebsitePress}
                style={styles.contactButton}
                icon="language"
              >
                Visit Website
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Legal</Text>
            <Text style={styles.legalText}>
              © 2024 PetWatch. All rights reserved.
            </Text>
            <Text style={styles.legalText}>
              This app is designed for demonstration purposes.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
  contactInfo: {
    marginTop: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 12,
  },
  divider: {
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flex: 1,
    marginHorizontal: 4,
    borderColor: '#6200EE',
  },
  legalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default AboutScreen;

