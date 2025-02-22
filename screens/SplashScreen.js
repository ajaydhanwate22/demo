import { StyleSheet, Text, View ,Image} from 'react-native';
import React, {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
          AsyncStorage.getItem('LoginId').then((LoginId) => {
            if (LoginId) {
              navigation.replace('Main'); // Navigate to Main if logged in
            } else {
              navigation.replace('Signin'); // Navigate to Signin if not logged in
            }
          });
        }, 2000); // Show splash for 2 seconds
    
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }, [navigation]);


  return (
    <View style={styles.container}>
         <Image
        source={{uri: 'https://realrate.store/AkshayUrjaSolar/Images/newLogo.jpg'}} // Replace with your splash image path
        style={styles.logo}
      />
      {/* <Text style={styles.text}>Akshay Urja Solar</Text> */}
    </View>
  )
}

export default SplashScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF', // You can customize your background color here
    },
    logo: {
      width: 250,
      height: 250,
      marginBottom: 20,
      textAlign:"center"
    },
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#f2be25', // Text color for the splash screen
    },
  });   