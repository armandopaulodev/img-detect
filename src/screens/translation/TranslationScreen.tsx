import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TranslationScreen = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = () => {
    // You can implement your translation logic here
    // For simplicity, I'm just reversing the input text as an example
    const reversedText = inputText.split('').reverse().join('');
    setTranslatedText(reversedText);
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
});

export default TranslationScreen;
