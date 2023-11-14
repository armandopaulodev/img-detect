import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

interface TranslationScreenProps { }

const TranslationScreen: React.FC<TranslationScreenProps> = () => {
    const [inputText, setInputText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState({ 'microsoft': { 'text': '' } });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState([
        { label: 'ingles', value: 'en' },
        { label: 'Frances', value: 'zh' }
    ]);

    const handleTranslate = () => {

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
                text: inputText,
                source_language: "pt",
                target_language: value,
            },
        };

        axios
            .request(options)
            .then((response) => {
                setTranslatedText(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Escreva um texto (pt):</Text>
            <TextInput
                style={styles.textArea}
                onChangeText={setInputText}
                value={inputText}
                multiline
                numberOfLines={4}
                placeholder="Digite aqui..."
            />

            <Text style={styles.label}>Traduzir para:</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={targetLanguage}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setTargetLanguage}
                placeholder='indique a lingua Destino'
            />

            <View style={styles.buttonContainer}>
                <Button onPress={handleTranslate} title="Traduzir Agora" />
            </View>

            {translatedText !== null ? (
                <View style={{ marginTop: 10, backgroundColor: '#f8fafc', padding: 16, minHeight: 300 }}>
                    <Text style={styles.label}>Resultado (Usando EdenAi 😍)</Text>
                    <Text>{translatedText.microsoft.text}</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    textArea: {
        height: 100, // Set the desired height for the textarea
        borderColor: '#d4d4d4',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 8, // Add some padding at the top for better appearance
    },
    buttonContainer: {
        marginTop: 16,
    },
});

export default TranslationScreen;
