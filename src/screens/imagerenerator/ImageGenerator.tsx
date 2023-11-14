import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { default as React, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper';

interface TranslationScreenProps { }

const ImageGenerator: React.FC<TranslationScreenProps> = () => {
    const [inputText, setInputText] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const [chatResults, setChatResults] = useState<string[]>([]);




    const handleTranslate = () => {

        if (inputText.trim() !== '') {
            setChatResults((prevResults) => [...prevResults, `Voce: ${inputText}`]);

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
                    setInputText('');
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false)
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
                        </Text>
                    ))}
                <View style={{ marginTop: 10, backgroundColor: '#f8fafc', padding: 10, minHeight: 300 }}>
                
                    {loading ? <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} /> :
                        <Image source={{ uri: img != '' ? img : '#' }} style={{ width: 350, height: 350 }} />}
                </View>
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                    placeholder="Digite um commando..."
                    multiline
                />

                <TouchableOpacity style={styles.sendButton} onPress={handleTranslate}>
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
        backgroundColor: '#f87171',
        borderRadius: 20,
        padding: 10,
    },
});

export default ImageGenerator;
