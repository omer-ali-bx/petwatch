import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { TextInput, Card, Snackbar } from 'react-native-paper';
import GradientButton from '../components/GradientButton';
import { useLocation } from '../utils/LocationContext';

const PaymentScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const { userAddress } = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Expiry must be in MM/YY format';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSnackbarVisible(true);
      setTimeout(() => {
        Alert.alert(
          'Adoption Successful! 🎉',
          `Congratulations! You've successfully adopted ${pet.name}. We'll be in touch soon with next steps.`,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('PetList'),
            },
          ]
        );
      }, 2000);
    }
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.petCard}>
          <Card.Content>
            <Text style={styles.adoptingText}>You're adopting:</Text>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed} • {pet.age}</Text>
          </Card.Content>
        </Card>

        {userAddress && (
          <Card style={styles.addressCard}>
            <Card.Content>
              <Text style={styles.formTitle}>Delivery Address</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>{userAddress}</Text>
              </View>
              <Text style={styles.addressNote}>
                Your adopted pet will be delivered to this address after processing.
              </Text>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.formCard}>
          <Card.Content>
            <Text style={styles.formTitle}>Payment Information</Text>
            
            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              style={styles.input}
              error={!!errors.name}
              mode="outlined"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              label="Card Number"
              value={formData.cardNumber}
              onChangeText={(text) => 
                setFormData({ ...formData, cardNumber: formatCardNumber(text) })
              }
              style={styles.input}
              error={!!errors.cardNumber}
              mode="outlined"
              keyboardType="numeric"
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <Text style={styles.errorText}>{errors.cardNumber}</Text>
            )}

            <View style={styles.row}>
              <TextInput
                label="MM/YY"
                value={formData.expiry}
                onChangeText={(text) => 
                  setFormData({ ...formData, expiry: formatExpiry(text) })
                }
                style={[styles.input, styles.halfInput]}
                error={!!errors.expiry}
                mode="outlined"
                keyboardType="numeric"
                placeholder="12/25"
              />
              
              <TextInput
                label="CVV"
                value={formData.cvv}
                onChangeText={(text) => 
                  setFormData({ ...formData, cvv: text.replace(/\D/g, '').substring(0, 3) })
                }
                style={[styles.input, styles.halfInput]}
                error={!!errors.cvv}
                mode="outlined"
                keyboardType="numeric"
                placeholder="123"
                secureTextEntry
              />
            </View>
            
            <View style={styles.row}>
              {errors.expiry && (
                <Text style={[styles.errorText, styles.halfInput]}>{errors.expiry}</Text>
              )}
              {errors.cvv && (
                <Text style={[styles.errorText, styles.halfInput]}>{errors.cvv}</Text>
              )}
            </View>

            <GradientButton
              title="Complete Adoption"
              onPress={handleSubmit}
              style={styles.submitButton}
              textStyle={styles.submitButtonText}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        Processing adoption... 🐾
      </Snackbar>
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
  petCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 12,
  },
  adoptingText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 16,
    color: '#666',
  },
  formCard: {
    elevation: 2,
    borderRadius: 12,
  },
  addressCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 12,
  },
  addressContainer: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  addressNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#4caf50',
  },
});

export default PaymentScreen;

