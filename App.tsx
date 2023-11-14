import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [translated, setTranslated]=useState();
  useEffect(()=>{
  translate();
  },[])


  const translate = async ()=>{
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/translation/automatic_translation",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzI5YzUxZDItN2Q5Mi00NGJjLWJhMmUtNDE5YTQ5OWJiMTMxIiwidHlwZSI6ImFwaV90b2tlbiJ9.tUBopYrgHyPFkigL5s9_qhqmLKLj_7NOuvlDZOQt188",
      },
      data: {
        show_original_response: false,
        fallback_providers: "",
        providers: "amazon,google,ibm,microsoft",
        text: "人工智能 亦稱智械、機器智能，指由人製造出來的機器所表現出來的智慧。",
        source_language: "zh",
        target_language: "pt",
      },
    };
    
    axios
      .request(options)
      .then((response) => {
        setTranslated(response.data)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(translated)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
