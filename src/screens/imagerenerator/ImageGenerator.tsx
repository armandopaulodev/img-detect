import axios from 'axios';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput,ActivityIndicator, MD2Colors } from 'react-native-paper';

interface TranslationScreenProps { }

const ImageGenerator: React.FC<TranslationScreenProps> = () => {
    const [inputText, setInputText] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [loading, setLoading]= useState<Boolean>(false);


    

    const handleTranslate = () => {
        setLoading(true);
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/image/generation",
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzI5YzUxZDItN2Q5Mi00NGJjLWJhMmUtNDE5YTQ5OWJiMTMxIiwidHlwZSI6ImFwaV90b2tlbiJ9.tUBopYrgHyPFkigL5s9_qhqmLKLj_7NOuvlDZOQt188",
            },
            data: {
                show_original_response: false,
                fallback_providers: "",
                providers: "openai",
                text: inputText,
                resolution: "512x512",
              },
        };

        axios
            .request(options)
            .then((response) => {
                console.log(JSON.stringify(response.data.openai.items[0].image_resource_url))
                setImg(response.data.openai.items[0].image_resource_url);
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setLoading(false)
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Escreva o seu comando:</Text>
            <TextInput
                style={styles.textArea}
                onChangeText={setInputText}
                value={inputText}
                multiline
                numberOfLines={4}
                placeholder="Digite aqui o seu comando"
            />


            <View style={styles.buttonContainer}>

                <Button icon="image" mode="contained" onPress={handleTranslate}>
                    Gerar Imagem
                </Button>
            </View>


            <View style={{ marginTop: 10, backgroundColor: '#f8fafc', padding: 10, minHeight: 300 }}>
            {loading? <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'}/> : 
            <Image source={{ uri: img }} style={{ width: 350, height: 350 }} />}
            </View>

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

export default ImageGenerator;
