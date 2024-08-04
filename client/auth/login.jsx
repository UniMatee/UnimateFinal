import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      setErrorMessage('Email and password are required.');
      setErrorVisible(true);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        email: form.email,
        password: form.password,
      });
      
      if (response.status === 200) {
        router.push('/Profile');
      } else {
        setErrorMessage('Login failed. Please try again.');
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
            <Text style={styles.heading}>Connect, Update, Manage</Text>
            <Text style={styles.headingText}>Connexus: Your one-stop app for news, events, and campus life.</Text>

            {errorVisible && <Text style={styles.errorText}>{errorMessage}</Text>}

            <FormField
              value={form.email}
              handleChangeText={(text) => setForm({ ...form, email: text })}
              placeholder="Enter your email"
              otherStyles={styles.input}
              keyboardType="email-address"
            />

            <FormField
              value={form.password}
              handleChangeText={(text) => setForm({ ...form, password: text })}
              placeholder="Enter your password"
              otherStyles={styles.input}
              secureTextEntry
            />

            <CustomButton
              title="Log in"
              handlePress={submit}
              containerStyles={styles.button}
              isLoading={isSubmitting}
            />

            {isSubmitting && <ActivityIndicator size="large" color="#000" />}

            <Text style={styles.middleText}>Don't have an account?</Text>
            <Link href="/register" style={styles.linkText}><Text>Sign Up</Text></Link>
            <Link href="/" style={styles.footer}>Connexus</Link>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'beige',
    padding: 24,
  },
  heading: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  headingText: {
    fontSize: 25,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    minWidth: 180,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  middleText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
