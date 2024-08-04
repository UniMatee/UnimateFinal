import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import { Link } from '@react-navigation/native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    console.log('Form:', form);

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        email: form.email,
        username: form.username,
        password: form.password,
      });
      if (response.status === 201) {
        router.push('/Profile');
      } else {
        setErrorMessage('Registration failed. Please try again.');
        setErrorVisible(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setErrorVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.heading}>Get Started</Text>
            <Text style={styles.headingText}>
            Your one-stop app for news, events, and campus life.
            </Text>

            <FormField
              value={form.username}
              handleChangeText={(text) => setForm({ ...form, username: text })}
              placeholder="Username"
              otherStyles={styles.input}
            />
            <FormField
              value={form.email}
              handleChangeText={(text) => setForm({ ...form, email: text })}
              placeholder="Email Address"
              otherStyles={styles.input}
              keyboardType="email-address"
            />
            <FormField
              value={form.password}
              handleChangeText={(text) => setForm({ ...form, password: text })}
              placeholder="Password"
              otherStyles={styles.input}
              secureTextEntry
            />

            {errorVisible && <Text style={styles.errorText}>{errorMessage}</Text>}
            <CustomButton
              handlePress={submit}
              containerStyles={styles.button}
              isLoading={isSubmitting}
              title="Sign Up"
            />

            <Text style={styles.middleText}>Already have an account?</Text>
            <Link to="/login" style={styles.linkText}>
              <Text style={styles.linkText}>Log In</Text>
            </Link>

            <Text style={styles.middleText}>
              By clicking sign up, you agree to our Terms of Service and Privacy Policy.
            </Text>

            <Text style={styles.footer}>Connexus</Text>
          </View>
        </ScrollView>
      </GestureHandlerRootView>

      <Overlay isVisible={errorVisible} onBackdropPress={() => setErrorVisible(false)}>
        <Text style={styles.overlayText}>{errorMessage}</Text>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1e1e1e', // Dark background
    padding: 24,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff', // White color for text
    marginBottom: 10,
  },
  headingText: {
    fontSize: 20,
    color: '#aaaaaa', // Light gray for subheading
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#444', // Dark border
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#333', // Dark background for inputs
    color: '#ffffff', // White text color
  },
  button: {
    width: '100%',
    backgroundColor: '#00aaff', // Techie blue color
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  middleText: {
    marginTop: 20,
    fontSize: 16,
    color: '#cccccc', // Light gray
  },
  linkText: {
    fontSize: 16,
    color: '#00aaff', // Techie blue color for links
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 30,
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  errorText: {
    color: '#ff4d4d', // Error color
    fontSize: 16,
    marginBottom: 10,
  },
  overlayText: {
    color: '#ffffff', // White color for overlay text
  },
});

export default Register;
