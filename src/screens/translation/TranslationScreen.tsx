import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import axios from 'axios';

const TranslationScreen = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default target language is English

  const handleTranslate = () => {
    const options = {
      method: 'POST',
      url: 'https://api.edenai.run/v2/translation/automatic_translation',
      headers: {
        Authorization: 'Bearer 🔑 Your_API_Key',
      },
      data: {
        show_original_response: false,
        fallback_providers: '',
        providers: 'amazon,google,ibm,microsoft',
        text: inputText,
        source_language: 'zh',
        target_language: targetLanguage,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setTranslatedText(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Text to Translate:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
        placeholder="Type here..."
      />

      <Text style={styles.label}>Select Target Language:</Text>
      <Picker
        selectedValue={targetLanguage}
        onValueChange={(itemValue: any) => setTargetLanguage(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Spanish" value="es" />
        {/* Add more languages as needed */}
      </Picker>

      <Button onPress={handleTranslate} title="Translate" />

      {translatedText ? (
        <View>
          <Text style={styles.label}>Translated Text:</Text>
          <Text>{translatedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
});

export default TranslationScreen;
