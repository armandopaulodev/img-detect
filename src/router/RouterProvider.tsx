import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TranslationScreen from '../screens/translation/TranslationScreen';
import OthersToolsScreen from '../screens/others/OthersTools';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageGenerator from '../screens/imagerenerator/ImageGenerator';
import ChatBotScreen from '../screens/chatbot/ChatBotScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function TabStack() {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#374151',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Traducao') {
                        iconName = focused ? 'language' : 'language-outline';
                    } else if (route.name === 'outras') {
                        iconName = focused ? 'apps' : 'apps-outline';
                    }


                    return <Ionicons name={iconName} size={size} color={color} />;
                },

            })}

        >
            <Tab.Screen name="Home" options={{ title: 'Detector de objecto' }} component={HomeScreen} />
            <Tab.Screen name="Traducao" options={{ title: 'Tradutor' }} component={TranslationScreen} />
            <Tab.Screen name="outras" options={{ title: 'Outras Ferramentas' }} component={OthersToolsScreen} />
        </Tab.Navigator>


    );
}


export default function RouterProvider() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={
                {
                    headerStyle: {
                        backgroundColor: '#374151',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }
            }>
                <Stack.Screen name="casa" component={TabStack} options={{ headerShown: false }} />
                <Stack.Screen name="img" component={ImageGenerator} options={{ title: 'Remover Fundo' }} />
                <Stack.Screen name="chat" component={ChatBotScreen} options={{ title: 'Chat bot' }} />
                <Stack.Screen name="code" component={ImageGenerator} options={{ title: 'Code bot' }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}