import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Divider } from 'react-native-paper';

const ChatBotScreen = () => {
  const [inputText, setInputText] = useState('');
  const [chatResults, setChatResults] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setChatResults((prevResults) => [...prevResults, `Voce: ${inputText}`]);
      setInputText('');

    
        scrollViewRef.current?.scrollToEnd({ animated: true });

        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/text/chat",
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzI5YzUxZDItN2Q5Mi00NGJjLWJhMmUtNDE5YTQ5OWJiMTMxIiwidHlwZSI6ImFwaV90b2tlbiJ9.tUBopYrgHyPFkigL5s9_qhqmLKLj_7NOuvlDZOQt188",
            },
            data: {
                show_original_response: false,
                fallback_providers: "",
                providers: "openai",
                text: inputText,
                chatbot_global_action: "Act as an assistant",
                previous_history: [],
                temperature: 0.0,
                max_tokens: 150,
              },
        };

        axios
            .request(options)
            .then((response) => {
                console.log(JSON.stringify(response.data.openai.generated_text))
                setInputText('');
                setChatResults((prevResults) => [...prevResults, `Bot: ${response.data.openai.generated_text}`]);
            })
            .catch((error) => {
                console.error(error);
                // setLoading(false)
            });
   
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      >
        {chatResults.map((result, index) => (
          <Text key={index} style={styles.chatText}>
            {result}
            <Divider/>
          </Text>
        ))}
        
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Digite a mensagem..."
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: 16,
  },
  chatText: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatBotScreen;
