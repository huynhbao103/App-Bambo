import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import "../global.css";

const CameraButton = () => (
  <Link href="/(tabs)/camera" style={styles.cameraButton}>
  <View style={styles.cameraIconWrapper}>
    <Ionicons name="camera" size={28} color="white" />
  </View>
</Link>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            tabBarButton: () => <CameraButton />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="settings" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex', // Đảm bảo flexbox hoạt động trong Link
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    zIndex: 10,
  },
  cameraIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Đảm bảo icon không bị lệch
    height: '100%',
  },
});

