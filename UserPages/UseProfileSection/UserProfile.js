import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation}) => {

  return (
    <SafeAreaView style={styles.PageContainer}>
      <ScrollView>
                 <Pressable style={{ width: "100%", height: 120, backgroundColor: "#f9f4f4" }}>
                     <View style={{ width: "90%", height: 45, alignSelf: "center" }}>
                         <TouchableOpacity onPress={() => navigation.goBack()}  style={{ width: "15%", height: "100%", justifyContent: "center", alignItems: "center", marginTop:10 }}>
                             <Text style={{fontSize:26}}>X</Text>
                         </TouchableOpacity>
                     </View>
                 </Pressable>
                 <Pressable style={{ width: "90%", alignSelf: "center", height: 80, marginTop: -40, display: "flex", flexDirection: "row" }}>
                     <View style={{ width: 70, height: 70, backgroundColor: "#fff", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                         <Text><FontAwesome6 name='user' size={50} color='black' /></Text>
                     </View>
                     <View style={{ height: 30, justifyContent: "flex-end", paddingLeft: 20 }}>
                         <Text style={{ fontSize: 18, color: "#f01a05", fontWeight: "700" }}>Mr. Mehta</Text>
                     </View>
                 </Pressable>       
                 <View style-={{ width:'100%',}}>
                     <TouchableOpacity onPress={() => navigation.navigate('UserProfileUpdate')} style={styles.TouchableOpacity}> 
                         <Text style={styles.Text}>Profile Update</Text>
                     </TouchableOpacity >
                     <TouchableOpacity onPress={() => navigation.navigate('UserUploadDocument')}  style={styles.TouchableOpacity}> 
                         <Text style={styles.Text}>Document Upload</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('')}  style={styles.TouchableOpacity}> 
                         <Text style={styles.Text}>View Quotation</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('')}  style={styles.TouchableOpacity}> 
                         <Text style={styles.Text}>View Bill</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('AllNotifications')}  style={styles.TouchableOpacity}> 
                         <Text style={styles.Text}>All Notification</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigation.navigate('HelpandSupport')}  style={styles.TouchableOpacity}> 
                         <Text style={styles.Text}>Support</Text>
                     </TouchableOpacity>
                 </View>           
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Text:{fontSize:14,fontWeight:600},
  TouchableOpacity:{paddingHorizontal:30, borderBottomWidth:1 ,paddingVertical:15}

});
