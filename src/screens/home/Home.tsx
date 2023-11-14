
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text, ProgressBar, MD3Colors } from 'react-native-paper';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';





const HomeScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<object>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      objectDetection();
    }

  };

  const objectDetection = async (item: any) => {
    try {
      const formData = new FormData();
      formData.append('show_original_response', 'false');
      formData.append('fallback_providers', '');
      formData.append('providers', 'google,amazon');

      const fileUri = imageUri || '';
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      const fileExtension = fileInfo.uri.split('.').pop();
      const fileName = `image.${fileExtension}`;
      formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: `image/${fileExtension}`,
      });

      const options = {
        method: 'POST',
        url: 'https://api.edenai.run/v2/image/object_detection',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzI5YzUxZDItN2Q5Mi00NGJjLWJhMmUtNDE5YTQ5OWJiMTMxIiwidHlwZSI6ImFwaV90b2tlbiJ9.tUBopYrgHyPFkigL5s9_qhqmLKLj_7NOuvlDZOQt188',
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      const response = await axios.request(options);
      setResponseData(response.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const ResponseViwer = (item: any) => {

    const roundedValue = parseFloat(item.confidence.toFixed(1));
    return (<>
       <Text>
          <Text>{item.label}</Text>
          <Text>{roundedValue}</Text>
       </Text>
    </>)
  }
  return (
    <ScrollView>
      <View style={styles.container}>

        <View
          style={styles.imageSkeleton}
        >
          {imageUri && <Image source={{ uri: imageUri }} style={{ width: 250, height: 350 }} />}
        </View>

        <View>
          {responseData?.google.items.map((item: { 'label': '', 'confidence': number }, index: number) => (
            ResponseViwer(item)
          ))}

        </View>

        <Button icon="camera" mode="contained" onPress={handleLoadImage}>
          Carregar Imagem
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  imageSkeleton: {
    width: '100%',
    height: 350,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '140%',
    height: '140%',
    resizeMode: 'cover',
  },
});

export default HomeScreen;
