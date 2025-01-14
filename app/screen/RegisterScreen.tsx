import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Đường dẫn đến file cấu hình Firebase

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();

  const register = async () => {
    try {
      console.log('🔄 Đang tạo tài khoản ...');

      // Đăng ký tài khoản với email và password
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if( user )
        setSuccessMessage('🎉 Đăng ký thành công! Chuyển đến đăng nhập...');
      setTimeout(() => {
        router.push('/screen/LoginScreen');
      }, 1500);    
    } catch (err: any) {
      console.error('❌ Lỗi đăng ký:', err.message);
      setError(err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
       <View  style={styles.buttonContainer}>
       <Button title="Register" onPress={register} color="white" />
       </View>
      <Link href="/screen/LoginScreen" style={styles.loginLink}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#32CD32',
    marginBottom: 30,
  },
  input: {
    height: 45,
    borderColor: '#32CD32',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  successText: {
    color: '#32CD32',
    textAlign: 'center',
    marginBottom: 15,
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#32CD32',
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#32CD32',
    marginBottom: 15,
    borderRadius: 10,
    width: '50%',
  },
});

export default RegisterScreen;
