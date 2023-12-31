
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text, ActivityIndicator, MD2Colors } from 'react-native-paper';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Progress from 'react-native-progress';





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

  const objectDetection = async () => {
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
      setLoading(false)
    }
  };

  const ResponseViwer = (item: any) => {

    const roundedValue = parseFloat(item.confidence.toFixed(1));
    return (<>
      <Text>
        <Text>{item.label}</Text>
        <Progress.Bar progress={roundedValue} width={100} />
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


        {
          loading ? <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} /> :
            <View>
              {responseData?.google.items.map((item: { 'label': '', 'confidence': number }, index: number) => (
                <View key={index}>
                  {
                    ResponseViwer(item)
                  }
                </View>
              ))}
            </View>
        }

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
