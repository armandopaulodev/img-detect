import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const ImageGenerator = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Select an image
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Process the selected image
  const processImage = async () => {
    if (!imageUri) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('providers', 'api4ai');
    formData.append('file', {
      uri: imageUri,
      name: 'image.png',
      type: 'image/png',
    });

    try {
      const response = await axios.post(
        'https://api.edenai.run/v2/image/background_removal',
        formData,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzI5YzUxZDItN2Q5Mi00NGJjLWJhMmUtNDE5YTQ5OWJiMTMxIiwidHlwZSI6ImFwaV90b2tlbiJ9.tUBopYrgHyPFkigL5s9_qhqmLKLj_7NOuvlDZOQt188',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response.data.api4ai.image_resource_url;
      setProcessedImageUrl(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process the image.');
      setLoading(false);
    }
  };

  // Download the processed image
  const downloadImage = async (imageUrl: string) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}processed_image.png`;
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      alert('imagem baixada para ' + uri);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('falha.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display the selected image */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>Seleccione uma imagem</Text>
        )}
      </View>

      {/* Display the processed image */}
      {processedImageUrl && (
        <View style={styles.imageContainer}>
          <Text>IMagem processda:</Text>
          <Image source={{ uri: processedImageUrl }} style={styles.image} />
        </View>
      )}

      {/* Buttons */}
      <Button mode="contained" onPress={handleImagePick} style={styles.button}>
        Carregar imagem 
      </Button>

      <Button
        mode="contained"
        onPress={processImage}
        style={styles.button}
        disabled={!imageUri || loading}
      >
        {loading ? <ActivityIndicator animating={true} /> : 'Processar Imagem'}
      </Button>

      {processedImageUrl && (
        <Button
          mode="contained"
          onPress={() => downloadImage(processedImageUrl)}
          style={styles.button}
        >
          Descarregar a imagem
        </Button>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  button: {
    marginVertical: 8,
    width: '90%',
  },
});

export default ImageGenerator;
