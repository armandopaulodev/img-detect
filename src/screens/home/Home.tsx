
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import axios from 'axios';





const HomeScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoadImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setLoading(false)

      const form = new FormData();
      form.append("show_original_response", "false");
      form.append("fallback_providers", "");
      form.append("providers", "google,amazon");
      form.append("file", fs.createReadStream("🖼️ path/to/your/image.png"));
      
      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/image/object_detection",
        headers: {
          Authorization: "Bearer 🔑 Your_API_Key",
          "Content-Type": "multipart/form-data; boundary=" + form.getBoundary(),
        },
        data: form,
      };
      
    axios
        .request(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

  };

  const objectDetection = () => {
    // Implement your object detection logic here
    // You can use the imageUri state to perform object detection on the selected image
    // For simplicity, I'll just log a message for demonstration purposes
    console.log('Object detection logic goes here');
  };

  return (
    <View style={styles.container}>

      <ShimmerPlaceholder
        style={styles.imageSkeleton}
        visible={!loading}
      >
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 350, height: 450 }} />}
      </ShimmerPlaceholder>



      <Button icon="camera" mode="contained" onPress={handleLoadImage}>
        Carregar Imagem
      </Button>

      {/* <Button title="Object Detection" onPress={objectDetection} disabled={!imageUri} /> */}
    </View>
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
    height: 500,
    marginBottom: 16,
  },
  image: {
    width: '140%',
    height: '140%',
    resizeMode: 'cover',
  },
});

export default HomeScreen;
