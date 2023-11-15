import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

const toolsData = [
  { title: 'Gerador de imagem', icon: 'image', route:'img' },
  { title: 'ChatBot', icon: 'chat', route:'chat' },
  { title: 'Greador de codigo', icon: 'code-tags', route:'code' },
  { title: 'Tradutor de ficheiro', icon: 'file', route:'code2' }
  // Add more tools as needed
];

const OthersToolsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {toolsData.map((tool, index) => (
        <Card key={index} style={styles.card} onPress={()=>navigation.navigate(tool.route)}>
          <Card.Content style={styles.cardContent}>
            <IconButton icon={tool.icon} size={40} style={{shadowColor:'red'}}/>
            <Title style={{ fontSize:15 }}>{tool.title}</Title>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // 48% to allow for spacing between cards
    marginBottom: 16,
  },
  cardContent: {
    alignItems: 'center',
  },
});

export default OthersToolsScreen;
