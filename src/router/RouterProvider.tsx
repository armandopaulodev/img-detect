import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TranslationScreen from '../screens/translation/TranslationScreen';
import OthersToolsScreen from '../screens/others/OthersTools';

const Tab = createBottomTabNavigator();

export default function RouterProvider() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Traducao') {
                            iconName = focused ? 'language' : 'language-outline';
                        }else if (route.name === 'outras') {
                            iconName = focused ? 'apps' : 'apps-outline';
                        }

                        
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    
                })}
               
            >
                <Tab.Screen name="Home" options={{ title: 'Detector de objecto' }} component={HomeScreen} />
                <Tab.Screen name="Traducao" options={{ title:'Tradutor' }} component={TranslationScreen} />
                <Tab.Screen name="outras" options={{ title:'Outras Ferramentas' }} component={OthersToolsScreen} />
            </Tab.Navigator>
        </NavigationContainer>

    );
}