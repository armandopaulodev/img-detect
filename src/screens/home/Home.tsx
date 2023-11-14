import React from "react";
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen(){
    const [translated, setTranslated]=useState();
    useEffect(()=>{
   
    },[])
  
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(translated)}</Text>
        <StatusBar style="auto" />
      </View>
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
  