// filepath: /path/to/typings/react-native-ml-kit-text-recognition.d.ts
declare module '@react-native-ml-kit/text-recognition' {
  interface TextRecognitionResult {
    text: string;
  }

  interface TextRecognition {
    recognize(imageUri: string): Promise<TextRecognitionResult>;
  }

  const TextRecognition: TextRecognition;
  export default TextRecognition;
}