import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSignIn = ({ navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [MobileNumber, setMobileNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Declare error message state
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToSignin = async () => {
    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      formData.append('MobileNumber', MobileNumber);
      formData.append('Password', Password);

      const response = await axios.post('https://realrate.store/AkshayUrjaSolar/Signin.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);
      if (response.data.ErrMessage) {
        setErrorMessage(response.data.ErrMessage);
        setTimeout(() => {
          setErrorMessage(''); 
        }, 2000);
      } else {
        // Assuming the response has a success status, we can proceed to store data and navigate
        Alert.alert("Message", `Welcome To Akshay Urja Solar`);
        await AsyncStorage.setItem('userToken', response.data.token); // Save token in AsyncStorage
        navigation.navigate('VisitHome');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again!');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.PageContainer}>
      <ScrollView>
        <Pressable style={styles.logoSection}>
          <View style={styles.logoSectionDiv1}>
          </View>
          <View style={styles.logoSectionDiv2}>
            <Image
              source={{ uri: 'https://realrate.store/AkshayUrjaSolar/Images/akshyurjalogo.jpeg' }}
              style={{ width: 130,  height:50,justifyContent:"center" }}
              resizeMode="contain"  // Adjust width, height, and margin as needed
            />
          </View>
        </Pressable>

        <Pressable style={styles.BannerSection}>
          <Text style={styles.bannerTitle}>Hi !</Text>
          <Text style={styles.bannerTitle}>Welcome</Text>
          <Text style={styles.bannerText}>I'm waiting for you, please enter your details</Text>
        </Pressable>

        {errorMessage !== '' && (
          <View style={{ width: "90%", height: 40, justifyContent: "center", alignItems: "center", alignSelf: "center", borderRadius: 6, backgroundColor: "#f2be25", elevation: 2 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>{errorMessage}</Text>
          </View>
        )}

        <Pressable style={styles.AuthFormGroup}>
          <TextInput
            placeholder='Phone Number'
            placeholderTextColor={"#c1c1c1"}
            style={styles.AuthFormGroupInput}
            onChangeText={(text) => setMobileNumber(text)}
            value={MobileNumber}
            maxLength={10}
            keyboardType="numeric"
          />
        </Pressable>

        <Pressable style={styles.AuthFormGroup}>
          <TextInput
            placeholder='Password'
            placeholderTextColor={"#c1c1c1"}
            secureTextEntry={!showPassword}
            style={styles.AuthFormGroupInputPassword}
            onChangeText={(text) => setPassword(text)}
            value={Password}
          />
          <TouchableOpacity
            onPress={() => togglePasswordVisibility()}
            style={{ borderBottomWidth: 1, borderBottomColor: "#f2be25", width: "20%", justifyContent: "center", alignItems: "center" }}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#c1c1c1"
            />
          </TouchableOpacity>
        </Pressable>

        <Pressable style={styles.AuthFormLinks}>
          <View style={styles.AuthFormLinksDiv1}>
            <Text style={{ fontSize: 12, color: "#c1c1c1", fontWeight: "500" }}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.AuthFormLinksDiv2}>
            <Text style={styles.AuthFormLinksDiv2Text}>Forgot Password ? </Text>
          </TouchableOpacity>
        </Pressable>

        {loading ? (
          <View style={styles.signinBtn}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <TouchableOpacity  onPress={() => navigation.navigate('UserSignUp')} style={styles.signinBtn}>
            <Text style={{ color: "#f2be25", fontSize: 15, fontWeight: "700" }}>Log In</Text>
          </TouchableOpacity>
        )}

        <Pressable style={{ width: "90%", alignSelf: "center", justifyContent: "center", height: 50, display: "flex", flexDirection: "row", alignItems: "center", marginTop: 100 }}>
          <Text style={{ fontSize: 12, color: "#c1c1c1", fontWeight: "600" }}>Don't have an account? </Text>
          {/* onPress={() => navigation.navigate('Signup')} */}
          <TouchableOpacity onPress={() => navigation.navigate('UserSignUp')}>
            <Text style={{ fontSize: 15, color: "#f2be25", fontWeight: "700" }}>Sign Up</Text>
          </TouchableOpacity>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserSignIn;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  logoSection: { width: "90%", alignSelf: "center", height: 80, display: "flex", flexDirection: "row" },
  logoSectionDiv1: { width: "70%", justifyContent: "center", alignItems: "flex-end" },
  logoSectionDiv2: { width: "20%", justifyContent: "center", alignItems: "center", height: "100%" },
  logoSectionDiv1Text: { fontSize: 14.4, color: "#f01a05", fontWeight: "700" },
  logo: { width: "100%", height: "100%", marginTop: 15 },
  BannerSection: { width: "90%", alignSelf: "center", marginBottom: 50 },
  bannerTitle: { fontSize: 55, color: "#343341", fontWeight: "700" },
  bannerText: { color: "#c1c1c1", fontSize: 12, fontWeight: "500" },
  AuthFormGroup: { width: "90%", alignSelf: "center", height: 60, display: "flex", flexDirection: "row", flexWrap: "wrap" },
  AuthFormGroupInput: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f2be25", height: "100%", width: "100%" },
  AuthFormGroupInputPassword: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f2be25", height: "100%", width: "80%" },
  AuthFormLinks: { width: "90%", alignSelf: "center", height: 50, display: "flex", flexDirection: "row" },
  AuthFormLinksDiv1: { width: "50%", height: "100%", justifyContent: "center" },
  AuthFormLinksDiv2: { width: "50%", height: "100%", justifyContent: "center", alignItems: "flex-end" },
  AuthFormLinksDiv2Text: { fontSize: 12, color: "#c1c1c1", fontWeight: "500" },
  signinBtn: { backgroundColor: "#343341", width: "90%", alignSelf: "center", height: 50, justifyContent: "center", alignItems: "center", marginTop: 20 },
});
