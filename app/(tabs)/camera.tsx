import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

function CameraScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const pickImage = async () => {
    // Mở thư viện ảnh để chọn ảnh
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (result && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    // Mở camera để chụp ảnh
    const result = await launchCamera({ mediaType: 'photo', quality: 1 });
    if (result && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const recognizeText = async () => {
    if (image) {
      try {
        // Nhận dạng văn bản từ hình ảnh
        const result = await TextRecognition.recognize(image);
        if (result && result.text) {
          setText(result.text); // Gán văn bản nhận được vào state
        }
      } catch (error) {
        console.error("Text recognition failed:", error);
      }
    }
  };

  useEffect(() => {
    if (image) {
      recognizeText();
    }
  }, [image]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Bill Text Recognition</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={pickImage} title="Pick Image" />
            <Button onPress={openCamera} title="Open Camera" />
          </View>
          {image && <Text style={styles.imageText}>Image selected!</Text>}
          <Text style={styles.recognizedText}>{text || "No text recognized"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginTop: 20,
  },
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageText: {
    fontSize: 18,
    color: 'green',
    marginTop: 20,
  },
  recognizedText: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CameraScreen;
