import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; 


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const login = async () => {
    try {
      console.log('🔄 Đang đăng nhập...');
      
      // Firebase Auth login
      const user = await signInWithEmailAndPassword(auth, email, password);
      if( user )  
      router.push('/(tabs)/home');
      console.log('✅ Đăng nhập thành công:');
    } catch (err: any) {
      console.error('❌ Lỗi đăng nhập:', err.message);
      setError('Sai email hoặc mật khẩu!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View  style={styles.buttonContainer}>
        <Button title="Login" onPress={login} color="white" />
      </View>
      <Link href="/screen/RegisterScreen">
        <Text style={styles.registerLink}>Go to Register</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#32CD32',
    marginBottom: 15,
    borderRadius: 10,
    width: '50%',
  },
  registerLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#32CD32',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
