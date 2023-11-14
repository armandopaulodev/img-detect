import 'react-native-gesture-handler';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RouterProvider from './src/router/RouterProvider';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const [translated, setTranslated]=useState();
  useEffect(()=>{
 
  },[])

  return (
    <PaperProvider>
      <RouterProvider/>
    </PaperProvider>
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
