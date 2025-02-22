import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistryDay from './HistryDay';
import HistoryMonth from './HistoryMonth';
import HistoryYear from './HistoryYear';
import HistoryLifetime from './HistoryLifetime';

const Architecture = ({ navigation}) => {

        const [currentTime, setCurrentTime] = useState('');
    
    useEffect(() => {
    const date = new Date();
    const formattedTime = date.toISOString().slice(0, 19).replace('T', ' ');
    setCurrentTime(formattedTime);
    }, []);
      

  return (
    <SafeAreaView style={styles.PageContainer}>
      <ScrollView>
        <View style={{padding:15,backgroundColor:'#f5f5f5'}}>
        <View style={{paddingVertical:10}}>
            <Text>Parent-device</Text>
          </View>
          <TouchableOpacity style={{backgroundColor:'white', paddingLeft:10, paddingBottom:20, elevation:3}}>
          <View style={{paddingTop:5, paddingRight:10}}>
            <Text style={{color:"#f01a05", textAlign:'right'}}>Offline</Text>
            </View>
            <View style={{}}>
              <Text>Inverter</Text>
              <Text>SN:2974062707</Text>
            </View>
            <View style={{marginTop:10}}>
              <Text>Updated {currentTime} </Text>
            </View>
          </TouchableOpacity>


          <View style={{paddingVertical:15}}>
            <Text>Sub-device</Text>
          </View>
          <TouchableOpacity style={{backgroundColor:'white', paddingLeft:10, paddingBottom:20, elevation:3}}>
            <View style={{paddingTop:5, paddingRight:10}}>
            <Text style={{color:"#f01a05", textAlign:'right'}}>Offline</Text>
            </View>
            <View style={{}}>
              <Text>Battery</Text>
              <Text>SN:2974062707</Text>
            </View>
            <View style={{marginTop:10}}>
              <Text>Updated {currentTime} </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Architecture;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Text:{textAlign:'center', alignSelf:'center'}, 
  activetab:{textAlign:"center", fontSize:14, alignSelf:"center", color:'#f01a05'},
  TouchableOpacity:{justifyContent:'center', alignItems:'center', flex:1, borderColor:"#e0e0e0",},
  activeTouchableOpacity:{justifyContent:'center', alignItems:'center',padding:10, flex:1, borderColor:"#f01a05", borderBottomWidth:2,},
  Headline:{fontSize:16, textAlign:'center', color:'black', fontWeight:'bold'}

});
