import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RouterProvider from './src/router/RouterProvider';

export default function App() {
  const [translated, setTranslated]=useState();
  useEffect(()=>{
 
  },[])

  return (
    <RouterProvider/>
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
