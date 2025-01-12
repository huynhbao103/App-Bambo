import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const login = async () => {
    try {
      console.log('Đang gửi yêu cầu đăng nhập...');

      const response = await axios.post<{ token: string }>('http://192.168.96.190:3000/api/auth/login', {
        email,
        password,
      });

      console.log('Phản hồi từ server:', response.data);

      const token: string = response.data.token;

      // 🟢 Lưu token vào AsyncStorage
      await AsyncStorage.setItem('token', token);
      console.log('Token đã lưu:', token);

      // 🔄 Chuyển hướng đến Home
      router.push('/(tabs)/home');
    } catch (err: any) {
      console.error('Lỗi đăng nhập:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Sai email hoặc mật khẩu!');
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
      <Button title="Login" onPress={login} color="#32CD32" />
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
    marginBottom: 15,
  },
  registerLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#32CD32',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
