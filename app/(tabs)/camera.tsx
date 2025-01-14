import React, { useState } from 'react';
import { View, Button, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Config from 'react-native-config';

const OCR_API_KEY = Config.OCR_API_KEY;

const ScanBillScreen = () => {
  const [imageUri, setImageUri] = useState<string>('');
  const [text, setText] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      recognizeText(uri);
    }
  };

  const recognizeText = async (uri: string) => {
    const base64Image = await convertToBase64(uri); // Convert image to Base64

    const requestData = {
      apikey: OCR_API_KEY, // Use API Key from environment variable
      base64image: base64Image,
    };
    console.log(OCR_API_KEY);

    try {
      const response = await axios.post('https://api.ocr.space/parse/image', requestData);
      const detectedText = (response.data as { ParsedResults: { ParsedText: string }[] }).ParsedResults[0].ParsedText;
      setText(detectedText); // Display recognized text
    } catch (err) {
      console.error(err);
    }
  };

  const convertToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      <Text>{text}</Text>
    </View>
  );
};

export default ScanBillScreen;