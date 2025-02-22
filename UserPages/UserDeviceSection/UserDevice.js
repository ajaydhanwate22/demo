import { StyleSheet, View, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import InverterHome from './InverterHome';
import LoggerHome from './LoggerHome';
import BatteryHome from './BatteryHome';

const Device = ({ navigation}) => {

  const [selectedTab, setSelectedTab] = useState('InverterHome');

  const renderContent = () => {
      switch (selectedTab) {
        case 'InverterHome':
          return <InverterHome />;
        case 'LoggerHome':
          return <LoggerHome />;
          case 'BatteryHome':
          return <BatteryHome />;
        default:
          return null;
      }
    };

  return (
    <SafeAreaView style={styles.PageContainer}>
             <View style={{padding:10,borderBottomWidth:0.3, borderColor:'lightgrey',paddingHorizontal:10, paddingTop:20}}>
                 <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                     <TouchableOpacity>
                         <Text><AntDesign name='left' size={25} color='black' /></Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
                         <Text style={{textAlign:'center', fontWeight:'bold'}}>SandeepKumar</Text>
                     </TouchableOpacity>
                     <TouchableOpacity>
                         <Text><Feather name='menu' size={25} color='black' /></Text>
                     </TouchableOpacity>
                 </View>
             </View>
      <ScrollView>
            <View style={{flexDirection:'row', gap:20,paddingHorizontal:20,}}>
                <TouchableOpacity style={[styles.TouchableOpacity, selectedTab === 'InverterHome' && styles.activeTouchableOpacity]} onPress={() => setSelectedTab('InverterHome')}>
                <Text style={[styles.Text, selectedTab === 'InverterHome' && styles.activetab]}>Inverter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.TouchableOpacity, selectedTab === 'LoggerHome' && styles.activeTouchableOpacity]} onPress={() => setSelectedTab('LoggerHome')}>
                <Text style={[styles.Text, selectedTab === 'LoggerHome' && styles.activetab]}>Logger</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.TouchableOpacity, selectedTab === 'BatteryHome' && styles.activeTouchableOpacity]} onPress={() => setSelectedTab('BatteryHome')}>
                <Text style={[styles.Text, selectedTab === 'BatteryHome' && styles.activetab]}>Battery</Text>
                </TouchableOpacity>
            </View>
        {renderContent()}  
      </ScrollView>
    </SafeAreaView>
  );
};

export default Device;

const styles = StyleSheet.create({
  PageContainer: { backgroundColor: "#fff", height: "100%" },
  Text:{textAlign:'center', alignSelf:'center'}, 
  activetab:{textAlign:"center",alignSelf:"center", color:'#f01a05'},
  TouchableOpacity:{paddingVertical:10, paddingTop:20},
  activeTouchableOpacity:{borderBottomWidth:1, borderColor:'#f01a05',paddingVertical:10,paddingTop:20},

});
