import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import * as Location from 'expo-location';
import GradientButton from '../components/GradientButton';
import { useLocation } from '../utils/LocationContext';

const LocationScreen = () => {
  const { updateLocation } = useLocation();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Get address from coordinates
      try {
        let addressResponse = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        
        if (addressResponse && addressResponse.length > 0) {
          const addr = addressResponse[0];
          const formattedAddress = `${addr.street || ''} ${addr.streetNumber || ''}, ${addr.city || ''}, ${addr.region || ''} ${addr.postalCode || ''}, ${addr.country || ''}`.replace(/,\s*,/g, ',').replace(/^\s*,|,\s*$/g, '');
          setAddress(formattedAddress);
          // Update context with location and address
          updateLocation(currentLocation, formattedAddress);
        }
      } catch (addressError) {
        console.log('Address lookup failed:', addressError);
        const fallbackAddress = 'Address not available';
        setAddress(fallbackAddress);
        updateLocation(currentLocation, fallbackAddress);
      }
    } catch (error) {
      setErrorMsg('Error getting location: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleRefreshLocation = () => {
    getLocation();
  };

  const showOnMap = () => {
    if (location) {
      Alert.alert(
        'Map View',
        'In a real app, this would open a map view with your location marked.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Location</Text>
        <Text style={styles.subtitle}>
          Find pet shelters and veterinarians near you
        </Text>

        <Card style={styles.locationCard}>
          <Card.Content>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200EE" />
                <Text style={styles.loadingText}>Getting your location...</Text>
              </View>
            ) : errorMsg ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMsg}</Text>
                <Button
                  mode="outlined"
                  onPress={handleRefreshLocation}
                  style={styles.retryButton}
                >
                  Try Again
                </Button>
              </View>
            ) : location ? (
              <View style={styles.locationInfo}>
                <Text style={styles.sectionTitle}>Current Location</Text>
                
                {address && (
                  <View style={styles.addressContainer}>
                    <Text style={styles.addressLabel}>Address:</Text>
                    <Text style={styles.addressText}>{address}</Text>
                  </View>
                )}
                
                <Image 
                  source={require('../assets/images/map-placeholder.png')}
                  style={styles.mapPlaceholder}
                  resizeMode="cover"
                />
                
                <View style={styles.coordinatesContainer}>
                  <Text style={styles.coordinatesTitle}>Coordinates</Text>
                  <View style={styles.coordinateRow}>
                    <Text style={styles.coordinateLabel}>Latitude:</Text>
                    <Text style={styles.coordinateValue}>
                      {location.coords.latitude.toFixed(6)}
                    </Text>
                  </View>
                  <View style={styles.coordinateRow}>
                    <Text style={styles.coordinateLabel}>Longitude:</Text>
                    <Text style={styles.coordinateValue}>
                      {location.coords.longitude.toFixed(6)}
                    </Text>
                  </View>
                  <View style={styles.coordinateRow}>
                    <Text style={styles.coordinateLabel}>Accuracy:</Text>
                    <Text style={styles.coordinateValue}>
                      ±{Math.round(location.coords.accuracy)}m
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </Card.Content>
        </Card>

        {location && (
          <View style={styles.buttonContainer}>
            <GradientButton
              title="View on Map"
              onPress={showOnMap}
              style={styles.mapButton}
            />
            
            <Button
              mode="outlined"
              onPress={handleRefreshLocation}
              style={styles.refreshButton}
              icon="refresh"
            >
              Refresh Location
            </Button>
          </View>
        )}

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Nearby Services</Text>
            <Text style={styles.infoText}>
              Use your location to find:
            </Text>
            <Text style={styles.bulletPoint}>• Pet shelters and rescue centers</Text>
            <Text style={styles.bulletPoint}>• Veterinary clinics</Text>
            <Text style={styles.bulletPoint}>• Pet stores and supplies</Text>
            <Text style={styles.bulletPoint}>• Dog parks and pet-friendly areas</Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  locationCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    borderColor: '#6200EE',
  },
  locationInfo: {
    paddingVertical: 10,
  },
  addressContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  coordinatesContainer: {
    marginTop: 8,
  },
  coordinatesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  coordinateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  coordinateValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  mapButton: {
    marginBottom: 12,
  },
  refreshButton: {
    borderColor: 'rgb(235,66,73)',
    borderRadius: 25,
  },
  infoCard: {
    elevation: 2,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    paddingLeft: 8,
  },
});

export default LocationScreen;

